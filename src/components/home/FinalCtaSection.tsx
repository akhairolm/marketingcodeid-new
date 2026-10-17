import { Check, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function FinalCtaSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-28">
      <div className="bg-[#121214] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-neutral-800">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Siap Memiliki Website Profesional untuk Usaha Anda?
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Diskusikan kebutuhan Anda bersama tim kami. Dapatkan pemetaan jenis website, rekomendasi fitur, dan estimasi biaya tanpa komitmen awal.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#konsultasi"
              className="w-full sm:w-auto px-8 py-3 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow transition-all"
            >
              Konsultasi Website Sekarang
            </a>
            <a
              href={getWhatsAppUrl('website')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/15 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Chat via WhatsApp
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-[11px] text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> 100% Hak Milik Tanpa Sewa
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Garansi Pemeliharaan Resmi
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
