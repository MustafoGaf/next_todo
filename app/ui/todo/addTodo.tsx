'use client';

import { createTodo } from '@/app/lib/actions';

export default function AddTodo() {
  return (
    <form action={createTodo}>
      <div className="flex flex-wrap items-center justify-center gap-[15px] rounded-md  bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}

        <div>
          <input
            type="text"
            name="title"
            placeholder=""
            className="rounded-[5px]"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button className="rounded-2xl bg-green-600 px-5 py-3" type="submit">
            Create Todo
          </button>
        </div>
      </div>
    </form>
  );
}
