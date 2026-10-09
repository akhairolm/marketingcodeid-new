'use client'

import React, { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { createCategoryAction, type CategoryFormState } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FF5C28] hover:bg-[#ea4510] text-white shadow-sm shadow-[#FF5C28]/25 transition-colors disabled:opacity-60"
    >
      {pending ? 'Menyimpan...' : 'Tambah'}
    </button>
  )
}

export function CategoryCreateForm() {
  const [state, formAction] = useActionState<CategoryFormState | undefined, FormData>(
    createCategoryAction,
    undefined,
  )
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData)
        formRef.current?.reset()
      }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
    >
      <input
        name="name"
        required
        placeholder="Nama kategori baru, mis. Tips SEO"
        className="flex-1 px-3.5 py-2 rounded-xl border border-zinc-200 bg-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C28]/30 focus:border-[#FF5C28]"
      />
      <SubmitButton />
      {state?.error && <p className="text-xs text-red-600 sm:hidden">{state.error}</p>}
      {state?.error && <p className="hidden sm:block text-xs text-red-600 sm:order-last sm:basis-full">{state.error}</p>}
    </form>
  )
}
