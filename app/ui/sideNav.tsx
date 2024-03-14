import Image from 'next/image';
import todo from '@/public/todo.png';
import Navbar from '@/app/ui/nabar';
export default function SideNav() {
  return (
    <div className="flex justify-around items-center">
      <div className="flex items-center gap-[15px] sm:block">
        <Image src={todo} alt="todo" width={100} height={100} />
        <h1>TODO TJ</h1>
      </div>
      <div className="">
        <Navbar  />
      </div>
    </div>
  );
}
