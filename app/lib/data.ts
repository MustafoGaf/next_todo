import { sql } from '@vercel/postgres';
import { TodoType } from './definition';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
export async function fetchUser() {
  return 'null';
}
export async function fetchTodo() {
  noStore();
  const currentUser = cookies().get('currentUser')?.value;
  const userData: [a: string, b: string] = jwtDecode(String(currentUser));
  const data = await sql<TodoType>`
    SELECT * FROM todos WHERE user_id = ${userData[0]}`;
  return data.rows;
}


