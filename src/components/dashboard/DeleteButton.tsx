'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Trash2 } from 'lucide-react'

type DeleteAction = (formData: FormData) => Promise<void>

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      title="Hapus"
      className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-red-600 transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-3.5 h-3.5" />
      {pending ? 'Menghapus...' : 'Hapus'}
    </button>
  )
}

export function DeleteButton({
  action,
  id,
  label,
  confirmMessage,
}: {
  action: DeleteAction
  id: string
  label: string
  confirmMessage: string
}) {
  const { pending } = useFormStatus()

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`${confirmMessage}\n\n"${label}" akan dihapus permanen.`)) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton pending={pending} />
    </form>
  )
}
