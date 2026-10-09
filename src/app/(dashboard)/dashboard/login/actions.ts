'use server'

import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { createSession, destroySession, verifyPassword } from '@/lib/auth'

export async function loginAction(
  _prev: { error: string | null } | undefined,
  formData: FormData,
): Promise<{ error: string | null }> {
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
