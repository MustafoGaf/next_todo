import { sql } from '@vercel/postgres';
import { TodoType } from './definition';
import { unstable_noStore as noStore } from 'next/cache';
import { getSessionData } from './actions';
export async function fetchTodo() {
  noStore();
  const response = await getSessionData();
  const user = response ? response : '';
  const data = await sql<TodoType>`
    SELECT * FROM todos WHERE user_id = ${user.id}`;
  return data.rows;
}

const ITEMS_PER_PAGE = 10;
export async function fetchInvoicesPages() {
  noStore();
  const response = await getSessionData();
  const user = response ? response : '';
  try {
    const count = await sql`SELECT COUNT(*)
    FROM todos WHERE user_id = ${user.id}
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database error', error);
    throw new Error('Failed to fetch total number of page');
  }
}

export async function fetchFilteredTodos(currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const response = await getSessionData();
  const user = response ? response : '';
  try {
    const data = await sql<TodoType>`
      SELECT
        *
      FROM todos
      WHERE
       user_id = ${user.id}
      ORDER BY completed, date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
