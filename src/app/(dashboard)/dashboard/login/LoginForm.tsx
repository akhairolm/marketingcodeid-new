'use client'

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Lock, Mail } from 'lucide-react'
import { loginAction } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#FF5C28] hover:bg-[#ea4510] shadow-sm shadow-[#FF5C28]/25 transition-colors disabled:opacity-60"
    >
      {pending ? 'Memeriksa...' : 'Masuk Dashboard'}
    </button>
  )
}

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState(loginAction, { error: null })

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next || '/dashboard'} />

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-semibold text-zinc-700">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@marketingcode.id"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C28]/30 focus:border-[#FF5C28]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-xs font-semibold text-zinc-700">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C28]/30 focus:border-[#FF5C28]"
          />
        </div>
      </div>

      {state?.error && (
        <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
