import { NextResponse, type NextRequest } from 'next/server'

const SESSION_COOKIE = 'mcid_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value)

  if (pathname === '/dashboard/login') {
    if (hasSession) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (!hasSession) {
    const loginUrl = new URL('/dashboard/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
