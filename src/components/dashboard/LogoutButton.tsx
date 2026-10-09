'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/app/(dashboard)/dashboard/(main)/actions'

export function LogoutButton({ user }: { user: { name: string; email: string } }) {
  const initials =
    user.name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || 'AD'

  return (
    <div className="h-14 px-8 bg-white border-b border-zinc-200 flex items-center justify-end gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white font-bold text-[10px] flex items-center justify-center">
          {initials}
        </div>
        <div className="text-xs leading-tight">
          <div className="font-bold text-zinc-800">{user.name}</div>
          <div className="text-zinc-400">{user.email}</div>
        </div>
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          title="Keluar"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-red-600 bg-zinc-100 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar</span>
        </button>
      </form>
    </div>
  )
}
