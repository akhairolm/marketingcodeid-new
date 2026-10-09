import React from 'react'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth'
import { LoginForm } from './LoginForm'

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const user = await getSessionUser()
  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#FF5C28] text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md shadow-[#FF5C28]/25">
            M
          </div>
          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-zinc-900">
            MarketingCode Console
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Masuk untuk mengelola konten website agensi
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-zinc-200/80 shadow-sm p-6">
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  )
}
