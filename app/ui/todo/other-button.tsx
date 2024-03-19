'use client';
import clsx from 'clsx';
import DeleteTodo from './deleteTodo';
import EditTodo from './editTodo';
import { PiDotsThreeCircleVertical } from 'react-icons/pi';
import { useState, useRef, useEffect } from 'react';

export default function OtherButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [hidden, setHidden] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  function handleClick(e: MouseEvent) {
    if (ref.current != e.target && hidden) {
      setHidden(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
  useEffect(() => {
    return () => {
      setHidden(false)
    }}, [])
  return (
    <div className="relative">
      <div className="lg:hidden">
        <PiDotsThreeCircleVertical
          size={30}
          onClick={() => setHidden((prev) => !prev)}
        />
      </div>
      <div
        className={clsx(
          'absolute top-7 right-3 block items-center justify-center gap-2 lg:static lg:flex shadowBox',
          {
            hidden: hidden == false,
          },
        )}
        ref={ref}
      >
        <DeleteTodo id={id} />
        <EditTodo id={id} title={title} />
      </div>
    </div>
  );
}
