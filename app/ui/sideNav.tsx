import Image from 'next/image';
import todo from '@/public/todo.png';
import Navbar from '@/app/ui/nabar';
export default function SideNav() {
  return (
    <div className="grid grid-cols-3 items-center">
      <div className="">
        <Image src={todo} alt="todo" width={100} height={100} />
        <h1>TODO TJ</h1>
      </div>
      <div className="col-span-2">
        <Navbar />
      </div>
    </div>
  );
}
