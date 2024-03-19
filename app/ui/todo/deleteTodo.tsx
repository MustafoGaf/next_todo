import { deleteTodo } from '@/app/lib/actions';
import { MdDelete } from 'react-icons/md';
const DeleteTodo = ({ id }: { id: string }) => {
  const deleteById = deleteTodo.bind(null, id);
  return (
    <form action={deleteById}>
      <button type="submit" className="flex items-center gap-2 hover:text-red-700">
        <MdDelete /> <p>Удалить</p>
      </button>
    </form>
  );
};

export default DeleteTodo;
