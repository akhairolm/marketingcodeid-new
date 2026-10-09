import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { SidebarBrand, SidebarNav, type DraftCounts } from './sidebar-nav'

export function DashboardSidebar({ draftCounts }: { draftCounts: DraftCounts }) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar border-r border-sidebar-border sticky top-0 h-screen select-none">
      <div className="h-[72px] px-5 flex items-center border-b border-sidebar-border">
        <SidebarBrand />
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarNav draftCounts={draftCounts} />
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          Fullstack Next.js · Drizzle ORM
        </a>
      </div>
    </aside>
  )
}
