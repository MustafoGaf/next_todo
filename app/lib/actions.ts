'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
