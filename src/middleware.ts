import { NextResponse, NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const authToken = getSessionCookie(request);

  if (!authToken && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (authToken && pathname === '/home') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/home'],
}