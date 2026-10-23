'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MailCheck, Check, AlertCircle } from 'lucide-react'
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'

const SERVICE_OPTIONS = [
  { value: 'umkm', label: 'Website UMKM & Katalog Produk', name: 'Website UMKM & Katalog Produk' },
  { value: 'company', label: 'Website Company Profile Bisnis', name: 'Website Company Profile Bisnis' },
  { value: 'landing', label: 'Landing Page Promosi & Iklan', name: 'Landing Page Promosi' },
  { value: 'custom', label: 'Sistem Informasi Kustom / Portal Instansi', name: 'Sistem Kustom / Instansi' },
  { value: 'other', label: 'Layanan Lain (Aplikasi Mobile / Google Ads / Meta Ads)', name: 'Layanan Digital Lainnya' },
]

const inputClass =
  'w-full text-base px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#D13D00] focus:border-transparent transition-all bg-neutral-50/50'

export function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    service: 'umkm',
    notes: '',
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submittedWaUrl, setSubmittedWaUrl] = useState<string | null>(null)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedName = formData.name.trim()
    if (trimmedName.length < 2) {
      setErrorMessage('Mohon masukkan nama lengkap Anda (minimal 2 karakter).')
      return
    }

    const cleanPhoneDigits = formData.phone.replace(/[^0-9]/g, '')
    if (cleanPhoneDigits.length < 9 || cleanPhoneDigits.length > 15) {
      setErrorMessage('Mohon masukkan nomor WhatsApp aktif yang valid (antara 9 hingga 15 digit angka).')
      return
    }

    setErrorMessage(null)

    const serviceName = SERVICE_OPTIONS.find((o) => o.value === formData.service)?.name ?? 'Website'
    const business = formData.businessName.trim() ? ` dari ${formData.businessName.trim()}` : ''
    const notesText = formData.notes.trim() ? ` Detail rencana: ${formData.notes.trim()}` : ''
    const waText = `Halo MarketingCode.ID, saya ${trimmedName}${business} (No. WA: ${formData.phone.trim()}). Saya ingin konsultasi terkait ${serviceName}.${notesText}`

    const cleanTargetPhone = DEFAULT_WHATSAPP_NUMBER.replace(/[^0-9]/g, '')
    const targetUrl = `https://wa.me/${cleanTargetPhone}?text=${encodeURIComponent(waText)}`

    trackWhatsAppClick({
      position: 'consultation_form',
      service: formData.service,
    })

    setSubmittedWaUrl(targetUrl)

    // Direct synchronous navigation without timer
    window.open(targetUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="konsultasi" className="max-w-xl mx-auto px-4 sm:px-6 mt-28 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
        <MailCheck className="w-3.5 h-3.5" />
        <span>Konsultasi Proyek</span>
      </div>

      <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
        Mari Tentukan Website yang Paling Sesuai untuk Bisnis Anda
      </h2>
      <p className="text-neutral-500 text-xs sm:text-sm mt-2">
        Ceritakan jenis usaha, tujuan website, dan kebutuhan utama Anda. Kami akan membantu memetakan jenis website dan ruang lingkup awal tanpa komitmen biaya.
      </p>

      <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card text-left">
        <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {submittedWaUrl && (
            <div
              role="status"
              className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 text-emerald-900 animate-in fade-in"
            >
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lanjutkan Pengiriman Pesan di WhatsApp</span>
              </div>
              <p className="text-emerald-700 leading-relaxed">
                Pesan konsultasi Anda telah siap dikirim ke WhatsApp resmi MarketingCode.ID. Jika aplikasi belum terbuka otomatis di perangkat Anda, silakan buka melalui tombol di bawah:
              </p>
              <a
                href={submittedWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ position: 'consultation_manual_link', service: formData.service })}
                className="inline-flex items-center gap-1.5 font-bold text-emerald-800 underline hover:text-emerald-950 pt-1"
              >
                Buka WhatsApp Sekarang →
              </a>
            </div>
          )}

          <div>
            <label htmlFor="consultation-name" className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              id="consultation-name"
              type="text"
              required
              placeholder="Contoh: Budi Pratama"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errorMessage) setErrorMessage(null)
              }}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="consultation-business" className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Nama Usaha / Perusahaan
            </label>
            <input
              id="consultation-business"
              type="text"
              placeholder="Contoh: Toko Berkah / CV Maju Bersama"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="consultation-phone" className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Nomor WhatsApp (Aktif) <span className="text-red-500">*</span>
            </label>
            <input
              id="consultation-phone"
              type="tel"
              required
              placeholder="Contoh: 08123456789 atau 628xxxxxxxxxx"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                if (errorMessage) setErrorMessage(null)
              }}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="consultation-service" className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Jenis Website yang Dibutuhkan
            </label>
            <select
              id="consultation-service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={inputClass}
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="consultation-notes" className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Gambaran Kebutuhan (Opsional)
            </label>
            <textarea
              id="consultation-notes"
              rows={3}
              placeholder="Contoh: Butuh website katalog kuliner dengan tombol order WA dan foto menu..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs sm:text-sm rounded-full shadow-glow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Konsultasi Website via WhatsApp
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-neutral-200" />
            <span className="flex-shrink mx-3 text-[11px] text-neutral-400 font-medium">atau tanpa isi form</span>
            <div className="flex-grow border-t border-neutral-200" />
          </div>

          <a
            href={getWhatsAppUrl('website')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ position: 'consultation_direct_chat', service: 'website' })}
            className="w-full py-3 border border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <Image src="/icons/flaticon/chat.svg" alt="" width={16} height={16} className="w-4 h-4 shrink-0" />
            <span>Chat Langsung ke WhatsApp Admin</span>
          </a>

          <p className="text-[11px] text-center text-neutral-500 mt-2">
            Privasi Anda terjamin. Kontak Anda hanya digunakan untuk konsultasi pembuatan website bersama tim MarketingCode.ID.
          </p>
        </form>
      </div>
    </section>
  )
}
