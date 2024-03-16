import { sql } from '@vercel/postgres';
import { TodoType } from './definition';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function fetchUser() {
  return 'null';
}
export async function fetchTodo() {
  noStore();
  const data = await sql<TodoType>`
    SELECT * FROM todos WHERE user_id = "ffdfds"`;
  return data.rows;
}


