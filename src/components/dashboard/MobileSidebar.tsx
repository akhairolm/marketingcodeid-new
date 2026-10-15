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
        <Button variant="outline" size="icon" className="md:hidden" aria-label="Buka menu">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border [&>button]:text-zinc-400">
        <SheetHeader className="h-16 px-6 flex items-center border-b border-sidebar-border">
          <SheetTitle className="text-left">
            <SidebarBrand />
          </SheetTitle>
        </SheetHeader>
        <div onClick={() => setOpen(false)}>
          <SidebarNav draftCounts={draftCounts} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
