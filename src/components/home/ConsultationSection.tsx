'use client'

import { useState } from 'react'
import { MailCheck, Check } from 'lucide-react'

const SERVICE_OPTIONS = [
  { value: 'web', label: 'Pembuatan Website Baru / Redesign (Next.js & Custom Dashboard)', name: 'Website Development' },
  { value: 'app', label: 'Pengembangan Mobile App (iOS / Android)', name: 'Mobile App Development' },
  { value: 'marketing', label: 'Digital Marketing (Meta Ads, Google, SEO)', name: 'Digital Marketing (Ads & SEO)' },
  { value: 'all', label: 'Solusi Komprehensif (Web + App + Marketing)', name: 'Solusi Komprehensif (Web + App + Marketing)' },
]

const inputClass =
  'w-full text-xs px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-transparent transition-all bg-neutral-50/50'

export function ConsultationSection() {
  const [toastOpen, setToastOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', service: 'web', notes: '' })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setToastOpen(true)

    const serviceName = SERVICE_OPTIONS.find((o) => o.value === formData.service)?.name ?? 'Konsultasi'
    const waText = `Halo MarketingCode.ID, saya ${formData.name} (${formData.email}) ingin konsultasi terkait ${serviceName}. Detail rencana: ${formData.notes || '-'}`

    setTimeout(() => {
      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(waText)}`, '_blank')
    }, 1000)

    setFormData({ name: '', email: '', service: 'web', notes: '' })

    setTimeout(() => {
      setToastOpen(false)
    }, 4000)
  }

  return (
    <>
      <section id="konsultasi" className="max-w-xl mx-auto px-4 sm:px-6 mt-28 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
          <MailCheck className="w-3.5 h-3.5" />
          <span>Konsultasi Proyek</span>
        </div>

        <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Klaim Diskusi &amp; Audit Website Gratis
        </h2>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2">
          Isi formulir singkat ini, tim konsultan senior kami akan menganalisis kebutuhan Anda dan mengirimkan proposal dalam 24 jam.
        </p>

        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card text-left">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Pratama"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Alamat Email Bisnis</label>
              <input
                type="email"
                required
                placeholder="budi@perusahaan.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Layanan yang Dibutuhkan</label>
              <select
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
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Ceritakan Singkat Rencana Anda</label>
              <textarea
                rows={3}
                placeholder="Jelaskan kebutuhan fitur atau target yang ingin dicapai..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Kirim Permintaan Konsultasi
            </button>

            <p className="text-[11px] text-center text-neutral-400 mt-2">
              Privasi Anda terjamin. Kami tidak pernah membagikan email atau mengirim spam.
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
          <h5 className="text-xs font-bold text-neutral-900">Permintaan Terkirim!</h5>
          <p className="text-[11px] text-neutral-500">Membuka WhatsApp untuk terhubung dengan konsultan senior...</p>
        </div>
      </div>
    </>
  )
}
