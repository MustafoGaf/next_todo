import TodoList from '@/app/ui/todo/todolist';
import AddTodo from '@/app/ui/todo/addTodo';
import { fetchInvoicesPages } from '../lib/data';
import Pagination from '../ui/todo/pagination';
import { BsFilterRight } from 'react-icons/bs';
import { ChangeEvent } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    // filter?:string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages();
  //   const options = ['A-Z', 'Z-A'];
  //   const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //     localStorage.setItem('filter', e.target.value);
  //   };
  return (
    <div>
      <div className="my-4">
        <AddTodo />
      </div>
      {/* <div className="flex items-end">
        <select
          value=""
          onChange={handleOptionChange}
          className="rounded-md p-2"
        >
          <option value="">Выберите опцию</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <BsFilterRight />
      </div> */}
      <TodoList currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
