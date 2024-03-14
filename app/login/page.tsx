<<<<<<< HEAD
import Image from 'next/image';
import logo from '@/public/todo.png';
import LoginForm from '../ui/login-form';
export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-5">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Image src={logo} alt="fddb" width={20} height={30} />
          </div>
        </div>
        <LoginForm/>
      </div>
=======
import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';
import logo from '@/public/todo.png';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center md:h-screen">
      <div className="mx-auto flex w-full max-w-[400px]  space-y-2.5 p-4 md:-mt-32 justify-center">
        <Image src={logo} width={100} height={100} alt="logo Img " />
      </div>
      <LoginForm />
>>>>>>> main
    </main>
  );
}
