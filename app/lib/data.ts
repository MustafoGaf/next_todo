import { sql } from "@vercel/postgres";
import {TodoType} from './definition'
import { unstable_noStore as noStore } from 'next/cache'
export async function fetchUser(){
    return 'null'
}
export async function fetchTodo(){
    noStore()
    const data = await sql<TodoType>`
    SELECT * FROM todos`
    return data.rows
}
