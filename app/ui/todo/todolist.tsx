import { fetchTodo } from '@/app/lib/data';
import { TodoType } from '@/app/lib/definition';
import CompleteButton from '@/app/ui/todo/completedButton';
import clsx from 'clsx';
// import CreationDate from './creationDate';
import DeleteTodo from './deleteTodo';
import EditTodo from './editTodo';
import OtherButton from './other-button';

export default async function TodoList() {
  const todos: TodoType[] = await fetchTodo();
  return (
    <div className="mx-4">
      {todos.map((todo, i) => (
        <div
          key={i + 'fdgdfg'}
          className={clsx('tableData mb-1 bg-gray-200 p-4 text-left', {
            'bg-gray-400': todo.completed,
          })}
        >
          <CompleteButton id={todo.id} completed={todo.completed} />

          <h1 className="text-lg font-semibold">{todo.title}</h1>

          {/* <CreationDate creatDate={todo.date} /> */}
          

          {/* <div className="block items-center justify-center gap-2 lg:flex">
            <DeleteTodo id={todo.id} />
            <EditTodo id={todo.id} title={todo.title} />
          </div> */}
          <OtherButton id={todo.id} title={todo.title}/>
        </div>
      ))}
    </div>
  );
}
