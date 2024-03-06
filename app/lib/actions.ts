'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
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

const FormSchema = z.object({
  title: z.string(),
});

export async function createTodo(formData: FormData) {
  const { title } = FormSchema.parse({
    title: formData.get('title'),
  });
  const date = new Date().toString().split('GMT')[0];
  try {
    await sql`
        INSERT INTO todos(title , completed , date, user_id) 
        VALUES(${title} , FALSE , ${date} ,'410544b2-4001-4271-9855-fec4b6a6442a' )`;
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
