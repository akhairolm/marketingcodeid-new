import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react'
import { getMetaConfig } from '@/lib/integrations/meta-capi'
import { saveMetaConfigAction } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const dynamic = 'force-dynamic'

export default async function MetaSettingsPage() {
  const config = await getMetaConfig()

  async function handleSubmit(formData: FormData) {
    'use server'
    await saveMetaConfigAction(formData)
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/offline-conversion/meta"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Pengaturan Meta Conversions API (CAPI)
          </h1>
          <p className="text-xs text-zinc-400">
            Koneksi langsung antara server website MarketingCode.ID dengan Meta Events Manager.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xs">
        <form action={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pixelId" className="text-xs font-semibold text-zinc-200">
                Meta Pixel ID / Dataset ID
              </Label>
              <Input
                id="pixelId"
                name="pixelId"
                defaultValue={config?.pixelId || ''}
                placeholder="Contoh: 123456789012345"
                required
                className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
              />
              <p className="text-[11px] text-zinc-500">
                Dapat ditemukan di Meta Events Manager pada menu Pengaturan Dataset.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="testEventCode" className="text-xs font-semibold text-zinc-200">
                Test Event Code (Opsional)
              </Label>
              <Input
                id="testEventCode"
                name="testEventCode"
                defaultValue={config?.testEventCode || ''}
                placeholder="Contoh: TEST12345"
                className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
              />
              <p className="text-[11px] text-zinc-500">
                Gunakan kode ini saat ingin menguji event langsung di tab Test Events Meta.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="accessToken" className="text-xs font-semibold text-zinc-200">
              System User Access Token
            </Label>
            <textarea
              id="accessToken"
              name="accessToken"
              rows={4}
              defaultValue={config?.accessToken || ''}
              placeholder="EAA..."
              required
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-3 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
            <p className="text-[11px] text-zinc-500">
              Dibuat melalui Meta Business Suite Pengaturan Bisnis Pengguna Sistem (System User) dengan izin `event_management`.
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-200 space-y-1">
              <div className="font-semibold text-blue-100">Kepatuhan Privasi Data (Zero Plaintext PII)</div>
              <p className="text-zinc-300">
                Seluruh data identitas pengguna (nomor telepon dan email) akan secara otomatis di-hash menggunakan algoritma SHA-256 huruf kecil sebelum dikirim ke endpoint Meta Graph API.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-zinc-950 font-bold hover:bg-primary/90 flex items-center gap-2 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              Simpan Pengaturan
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
