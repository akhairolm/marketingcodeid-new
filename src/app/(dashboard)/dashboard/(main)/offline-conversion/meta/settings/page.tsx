import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react'
import { getMetaConfig } from '@/lib/integrations/meta-capi'
import { saveMetaConfigAction } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Card } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function MetaSettingsPage() {
  const config = await getMetaConfig()

  async function handleSubmit(formData: FormData) {
    'use server'
    await saveMetaConfigAction(formData)
  }

  return (
    <main className="w-full max-w-[1240px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3.5">
        <Link
          href="/dashboard/offline-conversion/meta"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Pengaturan Meta Conversions API (CAPI)
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Koneksi langsung antara server website MarketingCode.ID dengan Meta Events Manager.
          </p>
        </div>
      </div>

      <Card className="bg-card border-border rounded-[20px] p-6 sm:p-8 shadow-xs">
        <form action={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pixelId" className="text-xs font-bold text-foreground">
                Meta Pixel ID / Dataset ID
              </Label>
              <Input
                id="pixelId"
                name="pixelId"
                defaultValue={config?.pixelId || ''}
                placeholder="Contoh: 123456789012345"
                required
                className="bg-background border-border text-foreground font-mono text-xs rounded-xl"
              />
              <p className="text-[11px] text-muted-foreground">
                Dapat ditemukan di Meta Events Manager pada menu Pengaturan Dataset.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testEventCode" className="text-xs font-bold text-foreground">
                Test Event Code (Opsional)
              </Label>
              <Input
                id="testEventCode"
                name="testEventCode"
                defaultValue={config?.testEventCode || ''}
                placeholder="Contoh: TEST12345"
                className="bg-background border-border text-foreground font-mono text-xs rounded-xl"
              />
              <p className="text-[11px] text-muted-foreground">
                Gunakan kode ini saat ingin menguji event langsung di tab Test Events Meta.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessToken" className="text-xs font-bold text-foreground">
              System User Access Token
            </Label>
            <textarea
              id="accessToken"
              name="accessToken"
              rows={4}
              defaultValue={config?.accessToken || ''}
              placeholder="EAA..."
              required
              className="w-full rounded-xl bg-background border border-border p-3 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
            <p className="text-[11px] text-muted-foreground">
              Dibuat melalui Meta Business Suite Pengaturan Bisnis Pengguna Sistem (System User) dengan izin `event_management`.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-accent/40 p-4 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-foreground">Kepatuhan Privasi Data (Zero Plaintext PII)</div>
              <p className="text-muted-foreground leading-relaxed">
                Seluruh data identitas pengguna (nomor telepon dan email) akan secara otomatis di-hash menggunakan algoritma SHA-256 huruf kecil sebelum dikirim ke endpoint Meta Graph API.
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
