'use client'
import Link from "next/link";
import Image from "next/image";
import todo from '@/public/todo.png'
import {usePathname} from "next/navigation";
import clsx from "clsx";

const links = [
    { name: 'Cписок задач', href: '/todo', icon: todo, alt:'icon Todo' },

    { name: 'Управление финансами', href: '/finance', icon:todo, alt: 'icon Price' },
];
export default function Navbar(){
    const path = usePathname()

    return (
        <div>
            <ul className='flex items-center gap-[20px]'>


            {
                links.map((el, id) => {
                    return (
                        <li key={id} className='flex gap-[10px] items-center'>
                            <Image src={el.icon} alt={el.alt} width={40} height={40}  />
                            <Link href={el.href} className={clsx('text-center', {
                                'text-blue-600' : path == el.href
                            })}>{el.name}</Link>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}