import { NextResponse, type NextRequest } from 'next/server'
import { and, eq, gt } from 'drizzle-orm'
import { db } from '@/db'
import { sessions, SESSION_COOKIE } from '@/db/schema'
import { hashToken } from '@/lib/auth-core'

/**
 * Validates the session cookie against the database.
 * Returns true only when the token exists and is not expired.
 * Runs in the Node.js runtime (Next 16 proxy default), so DB access is fine.
 */
async function hasValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    const rows = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(and(eq(sessions.tokenHash, hashToken(token)), gt(sessions.expiresAt, new Date())))
      .limit(1)
    return rows.length > 0
  } catch (error) {
    console.error('[proxy] session check failed', error)
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (pathname === '/dashboard/login') {
    if (await hasValidSession(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // Stale/invalid cookie: clear it so the login page renders clean
    const res = NextResponse.next()
    if (token) res.cookies.delete(SESSION_COOKIE)
    return res
  }

  if (!(await hasValidSession(token))) {
    const loginUrl = new URL('/dashboard/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    const res = NextResponse.redirect(loginUrl)
    if (token) res.cookies.delete(SESSION_COOKIE)
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
