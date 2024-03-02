import { deleteTodo } from '@/app/lib/actions';
import { MdDelete } from 'react-icons/md';
const DeleteTodo = ({ id }: { id: string }) => {
  const deleteById = deleteTodo.bind(null, id);
  return (
    <form action={deleteById}>
      <button type="submit">
        <MdDelete />
      </button>
    </form>
  );
};

export default DeleteTodo;
