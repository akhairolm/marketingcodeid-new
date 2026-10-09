'use client'

import React, { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createCategoryAction, type CategoryFormState } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
      {pending ? 'Menyimpan...' : 'Tambah'}
    </Button>
  )
}

export function CategoryCreateForm() {
  const [, formAction] = useActionState<CategoryFormState | undefined, FormData>(
    async (prev, formData) => {
      const result = await createCategoryAction(prev, formData)
      if (!result.error) {
        toast.success('Kategori berhasil ditambahkan.')
        formRef.current?.reset()
      } else {
        toast.error(result.error)
      }
      return result
    },
    undefined,
  )
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <Input
        name="name"
        required
        placeholder="Nama kategori baru, mis. Tips SEO"
        className="flex-1"
      />
      <SubmitButton />
    </form>
  )
}
