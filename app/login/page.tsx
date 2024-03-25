'use client';
import { authenticate } from '@/app/lib/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { BsPersonExclamation } from 'react-icons/bs';
import Button from '../ui/login/button';
export default function Page() {
  const [errorMessage, Login] = useFormState(authenticate, undefined);

  return (
    <main>
      <form action={Login} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={` mb-3 text-2xl`}>Авторизация</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Адрес электронной почты
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Пароль
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Введите свой пароль"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>
          <div
            className="my-3 flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <BsPersonExclamation size={30} color="red" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
          <LoginButton />
        </div>
      </form>
      <div className="text-center">
        <p className="mb-2 text-sm">Нет аккаунта?</p>
        <Link
          href="/signup"
          className="font-semibold text-blue-500 hover:underline"
        >
          Зарегистрироваться
        </Link>
      </div>
    </main>
  );
}
function LoginButton() {
  const { pending } = useFormStatus();

  return <Button status={pending} />;
}
