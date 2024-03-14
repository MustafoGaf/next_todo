<<<<<<< HEAD
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith('/')) {
    return Response.redirect(new URL('/', request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url));
  }
  if (currentUser && request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/', request.url));
  }
}

export const config = {
=======
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
>>>>>>> main
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
