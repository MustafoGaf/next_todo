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
    </main>
  );
}
