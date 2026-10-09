import React from 'react'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/40">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto shadow-md shadow-primary/25">
            M
          </div>
          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-foreground">
            MarketingCode Console
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Masuk untuk mengelola konten website agensi
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Login Admin</CardTitle>
            <CardDescription>Gunakan kredensial admin yang terdaftar</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm next={next} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
