'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MailCheck, Check } from 'lucide-react'
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '@/lib/whatsapp'

const SERVICE_OPTIONS = [
  { value: 'umkm', label: 'Website UMKM & Katalog Produk', name: 'Website UMKM & Katalog Produk' },
  { value: 'company', label: 'Website Company Profile Bisnis', name: 'Website Company Profile Bisnis' },
  { value: 'landing', label: 'Landing Page Promosi & Iklan', name: 'Landing Page Promosi' },
  { value: 'custom', label: 'Sistem Informasi Kustom / Portal Instansi', name: 'Sistem Kustom / Instansi' },
  { value: 'other', label: 'Layanan Lain (Aplikasi Mobile / Meta Ads)', name: 'Layanan Digital Lainnya' },
]

const inputClass =
  'w-full text-base px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#D13D00] focus:border-transparent transition-all bg-neutral-50/50'

export function ConsultationSection() {
  const [toastOpen, setToastOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    service: 'umkm',
    notes: '',
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setToastOpen(true)

    const serviceName = SERVICE_OPTIONS.find((o) => o.value === formData.service)?.name ?? 'Website'
    const business = formData.businessName ? ` dari ${formData.businessName}` : ''
    const waText = `Halo MarketingCode.ID, saya ${formData.name}${business} (No. WA: ${formData.phone}). Saya ingin konsultasi terkait ${serviceName}. Detail rencana: ${formData.notes || '-'}`

    setTimeout(() => {
      const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/[^0-9]/g, '')
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, '_blank')
    }, 1000)

    setFormData({ name: '', businessName: '', phone: '', service: 'umkm', notes: '' })

    setTimeout(() => {
      setToastOpen(false)
    }, 4000)
  }

  return (
    <>
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
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="consultation-name" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Nama Lengkap
              </label>
              <input
                id="consultation-name"
                type="text"
                required
                placeholder="Contoh: Budi Pratama"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                Nomor WhatsApp (Aktif)
              </label>
              <input
                id="consultation-phone"
                type="tel"
                required
                placeholder="Contoh: 08123456789 atau 628xxxxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

      <div
        className={`fixed bottom-6 right-6 z-50 bg-white border border-emerald-200 text-neutral-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300 ${
          toastOpen ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-900">Permintaan Terkirim!</p>
          <p className="text-[11px] text-neutral-500">Membuka WhatsApp untuk terhubung dengan tim MarketingCode...</p>
        </div>
      </div>
    </>
  )
}
