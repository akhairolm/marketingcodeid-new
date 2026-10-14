'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { createSession, destroySession, verifyPassword } from '@/lib/auth'
import { rateLimit, sweepRateLimits } from '@/lib/rate-limit'

/** 5 attempts per 15 minutes per IP. */
const LOGIN_LIMIT = 5
const LOGIN_WINDOW_MS = 15 * 60 * 1000

async function clientIp(): Promise<string> {
  const h = await headers()
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    'unknown'
  )
}

export async function loginAction(
  _prev: { error: string | null } | undefined,
  formData: FormData,
): Promise<{ error: string | null }> {
  if (Math.random() < 0.1) sweepRateLimits()

  const ip = await clientIp()
  const { ok, retryAfterSec } = rateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)
  if (!ok) {
    return {
      error: `Terlalu banyak percobaan login. Coba lagi dalam ${Math.ceil(retryAfterSec / 60)} menit.`,
    }
  }

  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  const next = String(formData.get('next') || '/dashboard')

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi.' }
  }

  let user: typeof users.$inferSelect | undefined
  try {
    const rows = await db.select().from(users).where(eq(users.email, email)).limit(1)
    user = rows[0]
  } catch (error) {
    console.error('[auth] login db error', error)
    return { error: 'Gagal terhubung ke database. Coba lagi.' }
  }

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: 'Email atau password salah.' }
  }

  await createSession(user.id)
  redirect(next.startsWith('/dashboard') ? next : '/dashboard')
}

export async function logoutAction() {
  await destroySession()
  redirect('/dashboard/login')
}
