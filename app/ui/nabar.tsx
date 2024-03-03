'use client';
import Link from 'next/link';
import Image from 'next/image';
import todo from '@/public/todo.png';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FcMenu } from 'react-icons/fc';
import { useState } from 'react';

const links = [
  { name: 'Cписок задач', href: '/todo', icon: todo, alt: 'icon Todo' },

  {
    name: 'Управление финансами',
    href: '/finance',
    icon: todo,
    alt: 'icon Price',
  },
];
export default function Navbar() {
  const path = usePathname();
const [hidden, setHidden] = useState<boolean>(false);
  return (
    <div className="flex items-center sm:justify-center justify-end relative">
      <div className="sm:hidden ">
        <button onClick={() => setHidden((prev) => !prev)}>
          <FcMenu size={40} />
        </button>
      </div>
      <ul className={clsx(" items-center gap-[20px] sm:flex", {
        'flex flex-col w-48 h-14 items-start absolute top-11': hidden==true,
        'hidden' : hidden ==false
      })}>
        {links.map((el, id) => {
          return (
            <li key={id} className="flex items-center gap-[10px]">
              <Image src={el.icon} alt={el.alt} width={40} height={40} />
              <Link
              onClick={() => setHidden(false)}
                href={el.href}
                className={clsx('text-center', {
                  'text-blue-600': path == el.href,
                })}
              >
                {el.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
