import React from 'react'
import { redirect } from 'next/navigation'
import { count, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, portfolios } from '@/db/schema'
import { getSessionUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { MobileSidebar } from '@/components/dashboard/MobileSidebar'
import { Topbar } from '@/components/dashboard/Topbar'
import { Toaster } from '@/components/ui/sonner'

export default async function DashboardMainLayout({ children }: { children: React.ReactNode }) {
  const [user, draftCounts] = await Promise.all([
    getSessionUser(),
    Promise.all([
      db.select({ value: count() }).from(articles).where(eq(articles.status, 'draft')).catch(() => []),
      db.select({ value: count() }).from(portfolios).where(eq(portfolios.status, 'draft')).catch(() => []),
    ])
      .then(([a, p]) => ({
        articles: a[0]?.value ?? 0,
        portfolios: p[0]?.value ?? 0,
      }))
      .catch(() => ({ articles: 0, portfolios: 0 })),
  ])

  if (!user) redirect('/dashboard/login')

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar draftCounts={draftCounts} />
      <div className="flex-1 min-w-0 flex flex-col bg-background">
        <Topbar user={user} draftCounts={draftCounts} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      <MobileSidebar draftCounts={draftCounts} />
      <Toaster position="top-center" richColors />
    </div>
  )
}
