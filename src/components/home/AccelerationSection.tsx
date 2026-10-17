import Link from 'next/link'
import { TrendingUp, BarChart3, Film, Check, ArrowRight, Sparkles } from 'lucide-react'

export function AccelerationSection() {
  return (
    <section id="akselerasi" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Growth &amp; Acceleration</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Skalakan Website Anda dengan Pemasaran &amp; Konten Kreatif
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
          Website hebat membutuhkan traffic pembeli dan materi video memikat. Padukan arsitektur digital Anda dengan strategi akuisisi teruji untuk melipatgandakan return on investment (ROI).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605]">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Digital Marketing &amp; Performance Ads</h3>
                  <span className="text-xs text-neutral-500">Kampanye Berbasis ROI &amp; Penjualan Nyata</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                +320% ROI
              </span>
            </div>

            <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
              Lupakan anggaran iklan yang terbuang sia-sia. Spesialis pemasaran digital kami merancang iklan yang presisi: setiap rupiah biaya promosi terlacak akurat, menjangkau calon pembeli siap transaksi, dan mengarahkannya langsung ke WhatsApp bisnis Anda.
            </p>

            <div className="mt-5 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[10px] text-neutral-500 font-semibold uppercase">Total Penjualan Klien</span>
                <span className="text-sm font-black text-neutral-900">Rp 842.500.000</span>
              </div>
              <div className="flex items-end justify-between h-20 px-2 gap-2 border-b border-neutral-200/70 pb-2">
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-full bg-orange-100 rounded-t h-6" />
                  <span className="text-[9px] text-neutral-500">Bln 1</span>
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-full bg-orange-200 rounded-t h-9" />
                  <span className="text-[9px] text-neutral-500">Bln 2</span>
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-full bg-orange-300 rounded-t h-12" />
                  <span className="text-[9px] text-neutral-500">Bln 3</span>
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-full bg-orange-400 rounded-t h-15" />
                  <span className="text-[9px] text-neutral-500">Bln 4</span>
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-full bg-[#D13D00] rounded-t h-18 shadow-glow" />
                  <span className="text-[9px] font-bold text-[#C23605]">Bln 5</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-neutral-500 flex justify-between">
                <span>Biaya Akuisisi (CAC): <strong>Turun 42%</strong></span>
                <span className="text-emerald-700 font-semibold">Scaling Positif</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Meta &amp; Google Ads</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Organic SEO Rank #1</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Funnel Sales Audit</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Transparent Analytics</div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-100">
            <Link
              href="/digital-marketing"
              className="w-full py-3 px-5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <span>Jelajahi Layanan Digital Marketing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605]">
                  <Film className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Creative Video Editing &amp; Motion</h3>
                  <span className="text-xs text-neutral-500">Konten Penjualan Hook &amp; Retensi Tinggi</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-[#C23605] border border-orange-200">
                Hook 3 Detik
              </span>
            </div>

            <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
              Tingkatkan retensi audiens dengan materi video berstandar tinggi. Dari video iklan ads vertikal (TikTok/Reels) yang memicu klik hingga company showreel yang membangun kredibilitas instan.
            </p>

            <div className="mt-5 p-4 bg-neutral-900 text-white rounded-2xl border border-neutral-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-mono text-neutral-300">Format 9:16 Vertical Ads</span>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-neutral-300">4K 60fps Master</span>
              </div>

              <div className="py-4 text-center">
                <Sparkles className="w-8 h-8 text-[#FF5C28] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-white">Video Iklan Vertikal Kreatif &amp; Berkonversi Tinggi</h4>
                <p className="text-[11px] text-neutral-300 mt-0.5">Teks animasi memikat, transisi rapi, dan pesan jualan tajam untuk FYP &amp; orderan langsung</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-neutral-300 pt-2 border-t border-neutral-800">
                <span>Platform: TikTok • Reels • Shorts</span>
                <span className="text-emerald-400 font-semibold">+280% Watch Retention</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> TikTok &amp; Reels Ads</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Corporate Showreel</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Kinetic Typography &amp; SFX</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Monthly Retainer Squad</div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-100">
            <Link
              href="/video-editing"
              className="w-full py-3 px-5 bg-neutral-900 hover:bg-black text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-all"
            >
              <span>Jelajahi Layanan Video Editing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
