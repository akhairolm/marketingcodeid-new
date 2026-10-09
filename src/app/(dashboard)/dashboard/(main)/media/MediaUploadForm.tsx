'use client'

import React, { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { UploadCloud } from 'lucide-react'
import { uploadMediaAction, type UploadState } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#FF5C28] hover:bg-[#ea4510] text-white shadow-sm shadow-[#FF5C28]/25 transition-colors disabled:opacity-60"
    >
      <UploadCloud className="w-4 h-4" />
      {pending ? 'Mengunggah...' : 'Unggah'}
    </button>
  )
}

export function MediaUploadForm() {
  const [state, formAction] = useActionState<UploadState | undefined, FormData>(uploadMediaAction, undefined)
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
        type="file"
        name="file"
        required
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="flex-1 text-xs text-zinc-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
      />
      <input
        name="altText"
        placeholder="Alt text (deskripsi gambar)"
        className="flex-1 px-3.5 py-2 rounded-xl border border-zinc-200 bg-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C28]/30 focus:border-[#FF5C28]"
      />
      <SubmitButton />
      {(state?.error || state?.success) && (
        <p className={`sm:basis-full text-xs ${state.error ? 'text-red-600' : 'text-emerald-600'}`}>
          {state.error || state.success}
        </p>
      )}
    </form>
  )
}
