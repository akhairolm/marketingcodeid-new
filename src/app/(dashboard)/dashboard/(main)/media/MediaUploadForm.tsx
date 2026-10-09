'use client'

import React, { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { uploadMediaAction, type UploadState } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
      {pending ? 'Mengunggah...' : 'Unggah'}
    </Button>
  )
}

export function MediaUploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [, formAction] = useActionState<UploadState | undefined, FormData>(
    async (prev, formData) => {
      const result = await uploadMediaAction(prev, formData)
      if (result.error) {
        toast.error(result.error)
      } else if (result.success) {
        toast.success(result.success)
        formRef.current?.reset()
      }
      return result
    },
    undefined,
  )

  return (
    <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <Input
        type="file"
        name="file"
        required
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="flex-1 file:mr-3 file:border-0 file:bg-secondary file:text-foreground file:text-xs file:font-medium"
      />
      <Input name="altText" placeholder="Alt text (deskripsi gambar)" className="flex-1" />
      <SubmitButton />
    </form>
  )
}
