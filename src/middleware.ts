import { NextRequest, NextResponse } from 'next/server';

// protected routes implementation in middleware
const protectedRoutes = [
  '/home',
  '/pockets',
  '/money101',
  '/send-requests',
  '/settings',
  '/spare-change',
  '/transactions',
  '/waterfall',
];

const unProtectedRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const isUserAuthenticated = request.cookies.get('access_token')?.value;
  // if user is not authenticated and protected route is accessed redirect user to origin
  if (
    !isUserAuthenticated &&
    protectedRoutes.some((route) =>
      request?.nextUrl?.pathname.startsWith(route)
    )
  ) {
    const absoluteUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
    // if user is authenticated and un protected route is accessed redirect user to home
  } else if (
    isUserAuthenticated &&
    unProtectedRoutes.some((route) =>
      request?.nextUrl?.pathname.startsWith(route)
    )
  ) {
    const absoluteUrl = new URL('/home', request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
