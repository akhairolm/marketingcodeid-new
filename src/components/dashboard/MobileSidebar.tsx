'use client'

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { SidebarBrand, SidebarNav, type DraftCounts } from './sidebar-nav'

export function MobileSidebar({ draftCounts }: { draftCounts: DraftCounts }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden h-9 w-9 rounded-xl border-border bg-card hover:bg-accent text-foreground shrink-0 shadow-xs"
          aria-label="Buka navigasi sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border [&>button]:text-zinc-400 flex flex-col">
        <SheetHeader className="h-[72px] px-6 flex flex-row items-center justify-between border-b border-sidebar-border space-y-0 shrink-0">
          <SheetTitle className="text-left m-0">
            <SidebarBrand />
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto overscroll-contain pb-8" onClick={() => setOpen(false)}>
          <SidebarNav draftCounts={draftCounts} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
