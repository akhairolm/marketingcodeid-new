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
    </aside>
  )
}
