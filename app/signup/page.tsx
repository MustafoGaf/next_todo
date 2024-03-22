import Link from "next/link";

export default function Page(){
    return (
        <main className=" p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>
    <form action="#" method="POST">
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-semibold mb-2">Имя пользователя</label>
        <input type="text" id="username" name="username" className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold mb-2">Электронная почта</label>
        <input type="email" id="email" name="email" className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-semibold mb-2">Пароль</label>
        <input type="password" id="password" name="password" className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" required />
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">Повторите пароль</label>
        <input type="password" id="confirmPassword" name="confirmPassword" className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" required />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <button type="submit" className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-2">Зарегистрироваться</button>
        <Link href="/login" className="text-sm text-blue-500 hover:underline self-start">Уже есть аккаунт? Авторизуйтесь</Link>
      </div>
    </form>
  </main>
    )
}