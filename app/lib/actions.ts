'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';
import { User } from './definition';
const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_SECRET;
const FormSchema = z.object({
  title: z.string(),
});
const FormSchemaAuth = z.object({
  email: z.string(),
  password: z.string(),
});

export async function createTodo(formData: FormData) {
  const { title } = FormSchema.parse({
    title: formData.get('title'),
  });
  const date = new Date().toString().split('GMT')[0];
  const response = await getSessionData();
  const user = response ? response : '';

  try {
    await sql`
        INSERT INTO todos(title , completed , date, user_id) 
        VALUES(${title} , FALSE , ${date} ,${user.id} )`;
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

export async function handleLogin(sessionData: any) {
  const encryptedSessionData = jwt.sign(sessionData, secret); // Encrypt your session data
  cookies().set('session', encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  // Redirect or handle the response after setting the cookie
}
export async function getSessionData() {
  const encryptedSessionData = cookies().get('session')?.value;
  return encryptedSessionData ? jwt.verify(encryptedSessionData, secret) : null;
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users_todo WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export async function authenticate(
  prev: string | undefined,
  formData: FormData,
) {
  const { email, password } = FormSchemaAuth.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const user = await getUser(email);
  if (!!user) {
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      handleLogin({ username: user.name, id: user.id });
      redirect('/');
    } else {
      return 'Неправильный адрес электронной почты или пароль.';
    }
  } else {
    return 'Неправильный адрес электронной почты';
  }
}

export async function Logout() {
  cookies().delete('session');
  redirect('/login');
}
