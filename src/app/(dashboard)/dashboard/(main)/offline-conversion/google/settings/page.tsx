import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, HelpCircle } from 'lucide-react'
import { getGoogleConfig } from '@/lib/integrations/google-ads'
import { saveGoogleConfigAction } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const dynamic = 'force-dynamic'

export default async function GoogleSettingsPage() {
  const config = await getGoogleConfig()

  async function handleSubmit(formData: FormData) {
    'use server'
    await saveGoogleConfigAction(formData)
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/offline-conversion/google"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Pengaturan Google Ads Offline Conversion
          </h1>
          <p className="text-xs text-zinc-400">
            Konfigurasi Google Click Identifier (GCLID) dan Enhanced Conversions for Leads.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xs">
        <form action={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="customerId" className="text-xs font-semibold text-zinc-200">
                Google Ads Customer ID
              </Label>
              <Input
                id="customerId"
                name="customerId"
                defaultValue={config?.customerId || ''}
                placeholder="Contoh: 123-456-7890"
                required
                className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
              />
              <p className="text-[11px] text-zinc-500">
                10 digit Customer ID akun Google Ads (tanpa tanda hubung juga bisa).
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="conversionActionName" className="text-xs font-semibold text-zinc-200">
                Conversion Action Name
              </Label>
              <Input
                id="conversionActionName"
                name="conversionActionName"
                defaultValue={config?.conversionActionName || 'Closing_WhatsApp_Sales'}
                placeholder="Closing_WhatsApp_Sales"
                required
                className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
              />
              <p className="text-[11px] text-zinc-500">
                Nama tindakan konversi yang dibuat di menu Sasaran Konversi Google Ads.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="developerToken" className="text-xs font-semibold text-zinc-200">
              Developer Token Google Ads API (Opsional)
            </Label>
            <Input
              id="developerToken"
              name="developerToken"
              type="password"
              defaultValue={config?.developerToken || ''}
              placeholder="Developer token dari Google Ads Manager"
              className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
            />
            <p className="text-[11px] text-zinc-500">
              Jika belum memiliki Developer Token aktif, Anda dapat menggunakan tombol Ekspor CSV resmi di halaman utama untuk mengunggah konversi secara manual ke Google Ads Data Manager.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-200 space-y-1">
              <div className="font-semibold text-emerald-100">Dukungan Enhanced Conversions for Leads</div>
              <p className="text-zinc-300">
                Sistem secara otomatis mengikutsertakan nomor telepon WhatsApp pengirim yang telah di-hash SHA-256 (format E.164) untuk memaksimalkan rasio pencocokan (*match rate*) di Google Ads.
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
