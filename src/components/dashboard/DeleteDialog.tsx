'use client'

import React, { useState, useTransition } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

type DeleteAction = (formData: FormData) => Promise<void>

export function DeleteDialog({
  action,
  id,
  label,
  description,
  children,
}: {
  action: DeleteAction
  id: string
  label: string
  description?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus &ldquo;{label}&rdquo;?</AlertDialogTitle>
          <AlertDialogDescription>
            {description || 'Tindakan ini tidak bisa dibatalkan.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={(e) => {
              e.preventDefault()
              const formData = new FormData()
              formData.set('id', id)
              startTransition(async () => {
                await action(formData)
                setOpen(false)
              })
            }}
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Hapus Permanen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function DeleteMenuItem({
  action,
  id,
  label,
  description,
}: {
  action: DeleteAction
  id: string
  label: string
  description?: string
}) {
  return (
    <DeleteDialog action={action} id={id} label={label} description={description}>
      <DropdownMenuItem
        className="text-destructive focus:text-destructive"
        onSelect={(e) => e.preventDefault()}
      >
        <Trash2 className="h-4 w-4" />
        Hapus
      </DropdownMenuItem>
    </DeleteDialog>
  )
}
