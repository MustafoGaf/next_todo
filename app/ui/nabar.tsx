'use client';
import Link from 'next/link';
import Image from 'next/image';
import todo from '@/public/todo.png';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FcMenu } from 'react-icons/fc';
import { useState } from 'react';
import { Logout } from '../lib/actions';
import { CiLogout } from "react-icons/ci";
// import { UserName } from './login/user-name';
// import { getDate } from '../lib/data';

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
    <div className="relative flex items-center justify-end sm:justify-center">
      <div
        className={clsx('sm:hidden ', {
          hidden: path == '/login',
        })}
      >
        <button onClick={() => setHidden((prev) => !prev)}>
          <FcMenu size={40} />
        </button>
      </div>
      <ul
        className={clsx(' items-center gap-[20px] sm:flex', {
          'absolute top-11 flex h-14 w-48 flex-col items-start': hidden == true,
          hidden: hidden == false,
        })}
      >
        {links.map((el, id) => {
          return (
            <li
              key={id}
              className={clsx('flex items-center gap-[10px]', {
                hidden: path == '/login',
              })}
            >
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
       
        <li className={clsx('')}>
          <form
            action={async () => {
             await Logout();
            }}
            className={clsx('flex items-center gap-[10px]', {
              'hidden': path == '/login'
            })}
          >
            <CiLogout />
            <button type='submit'>

            LogoOut
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}
