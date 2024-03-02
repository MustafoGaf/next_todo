import { completedTodo } from '@/app/lib/actions';
import clsx from 'clsx';
import { IoMdCheckmark } from 'react-icons/io';

export default function CompleteButton({
  id,
  completed,
  className,
}: {
  id: string;
  completed: boolean;
  className?: string;
}) {
  const completedById = completedTodo.bind(null, id, completed);
  return (
    <form action={completedById} className={clsx(className)}>
      <button
        type="submit"
        className={clsx(
          'flex h-[25px] w-[25px] items-center justify-center border border-solid border-black ',
        )}
      >
        {completed && <IoMdCheckmark />}
      </button>
    </form>
  );
}
