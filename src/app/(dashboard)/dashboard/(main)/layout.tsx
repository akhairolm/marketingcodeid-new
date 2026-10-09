import React from 'react'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { LogoutButton } from '@/components/dashboard/LogoutButton'

export default async function DashboardMainLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()
  if (!user) redirect('/dashboard/login')

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 min-w-0 flex flex-col bg-zinc-50/50">
        <LogoutButton user={user} />
        {children}
      </div>
    </div>
  )
}
