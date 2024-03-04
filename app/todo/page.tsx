import TodoList from '@/app/ui/todo/todolist'
import AddTodo from '@/app/ui/todo/addTodo'

export default async function Page(){
    
    return (
        <div>
            <div className='my-4'>
            <AddTodo/>
            </div>
           <TodoList/>
        </div>
    )
}