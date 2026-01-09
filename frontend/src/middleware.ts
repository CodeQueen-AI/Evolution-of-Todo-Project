import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt-token'); // Assuming JWT is stored in a cookie
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ['/signin', '/signup'];

  // Redirect authenticated users from public paths to /tasks
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/tasks', request.url));
  }

  // Redirect unauthenticated users from private paths to /signin
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Match all paths except API routes, static files, and favicon
};
