'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { encode } from 'next-auth/jwt';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
const sign = require('jwt-encode');

const secret = process.env.AUTH_SECRET;

const FormSchema = z.object({
  title: z.string(),
});

export async function createTodo(formData: FormData) {
  const { title } = FormSchema.parse({
    title: formData.get('title'),
  });
  const date = new Date().toString().split('GMT')[0];
   const currentUser = cookies().get('currentUser')?.value;
  const userData: [a: string, b: string] = jwtDecode(String(currentUser));
  try {
    await sql`
        INSERT INTO todos(title , completed , date, user_id) 
        VALUES(${title} , FALSE , ${date} ,${userData[0]} )`;
  } catch (error) {
    console.log('error', error);
    return { message: 'Database Error: Failed to Create Invoice.' };
  }
  revalidatePath('/todo');
  redirect('/todo');
}
export async function completedTodo(id: string, status: boolean) {
  try {
    await sql`
    UPDATE todos SET completed = ${!status} WHERE id = ${id}`;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Create Invoice.' };
  }
  revalidatePath('/todo');
}

export async function deleteTodo(id: string) {
  try {
    await sql`
    DELETE FROM todos WHERE id = ${id}`;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Create Invoice.' };
  }
  revalidatePath('/todo');
}

async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users_todo WHERE email=${email}`;

    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function Authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const secret = process.env.AUTH_SECRET;
  try {
    const data = {
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    };
    const user = await getUser(data.email);
    if (!user) {
      return null;
    }
    const passwordsMatch = await bcrypt.compare(data.password, user.password);
    if (passwordsMatch) {
      cookies().set('currentUser', sign([user.id, user.name], secret));
      redirect('/');
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function Logout() {
  cookies().delete('currentUser');
  redirect('/login');
}
