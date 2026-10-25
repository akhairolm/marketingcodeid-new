import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, HelpCircle } from 'lucide-react'
import { getGoogleConfig } from '@/lib/integrations/google-ads'
import { saveGoogleConfigAction } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Card } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function GoogleSettingsPage() {
  const config = await getGoogleConfig()

  async function handleSubmit(formData: FormData) {
    'use server'
    await saveGoogleConfigAction(formData)
  }

  return (
    <main className="w-full max-w-[1240px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3.5">
        <Link
          href="/dashboard/offline-conversion/google"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Pengaturan Google Ads Offline Conversion
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Konfigurasi Google Click Identifier (GCLID) dan Enhanced Conversions for Leads.
          </p>
        </div>
      </div>

      <Card className="bg-card border-border rounded-[20px] p-6 sm:p-8 shadow-xs">
        <form action={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerId" className="text-xs font-bold text-foreground">
                Google Ads Customer ID
              </Label>
              <Input
                id="customerId"
                name="customerId"
                defaultValue={config?.customerId || ''}
                placeholder="Contoh: 123-456-7890"
                required
                className="bg-background border-border text-foreground font-mono text-xs rounded-xl"
              />
              <p className="text-[11px] text-muted-foreground">
                10 digit Customer ID akun Google Ads (tanpa tanda hubung juga bisa).
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conversionActionName" className="text-xs font-bold text-foreground">
                Conversion Action Name
              </Label>
              <Input
                id="conversionActionName"
                name="conversionActionName"
                defaultValue={config?.conversionActionName || 'Closing_WhatsApp_Sales'}
                placeholder="Closing_WhatsApp_Sales"
                required
                className="bg-background border-border text-foreground font-mono text-xs rounded-xl"
              />
              <p className="text-[11px] text-muted-foreground">
                Nama tindakan konversi yang dibuat di menu Sasaran Konversi Google Ads.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="developerToken" className="text-xs font-bold text-foreground">
              Developer Token Google Ads API (Opsional)
            </Label>
            <Input
              id="developerToken"
              name="developerToken"
              type="password"
              defaultValue={config?.developerToken || ''}
              placeholder="Developer token dari Google Ads Manager"
              className="bg-background border-border text-foreground font-mono text-xs rounded-xl"
            />
            <p className="text-[11px] text-muted-foreground">
              Jika belum memiliki Developer Token aktif, Anda dapat menggunakan tombol Ekspor CSV resmi di halaman utama untuk mengunggah konversi secara manual ke Google Ads Data Manager.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-accent/40 p-4 flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-foreground">Dukungan Enhanced Conversions for Leads</div>
              <p className="text-muted-foreground leading-relaxed">
                Sistem secara otomatis mengikutsertakan nomor telepon WhatsApp pengirim yang telah di-hash SHA-256 (format E.164) untuk memaksimalkan rasio pencocokan (*match rate*) di Google Ads.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className="rounded-full bg-primary text-zinc-950 font-bold hover:bg-primary/90 flex items-center gap-2 cursor-pointer min-h-10 px-6"
            >
              <Save className="h-4 w-4" />
              Simpan Pengaturan
            </Button>
          </div>
        </form>
      </Card>
    </main>
  )
}
