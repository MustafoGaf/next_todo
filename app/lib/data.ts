import { sql } from '@vercel/postgres';
import { TodoType } from './definition';
import { unstable_noStore as noStore } from 'next/cache';
import { getSessionData } from './actions';
export async function fetchTodo() {
  noStore();
  const response = await getSessionData()
  const user = JSON.parse(response? response : "")
  const data = await sql<TodoType>`
    SELECT * FROM todos WHERE user_id = ${user.id}`;
  return data.rows;
}


