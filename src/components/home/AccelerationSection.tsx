import Link from 'next/link'
import { TrendingUp, BarChart3, Film, Check, ArrowRight, Sparkles } from 'lucide-react'

export function AccelerationSection() {
  return (
    <section id="akselerasi" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Layanan Pendukung Pertumbuhan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Dukung Website Anda dengan Pemasaran Digital &amp; Konten Kreatif
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
          Website yang baik membutuhkan calon pelanggan yang tepat. Lengkapi kehadiran online bisnis Anda dengan pengelolaan iklan digital dan video promosi yang terstruktur.
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
                  <h3 className="text-lg font-bold text-neutral-900">Pengelolaan Iklan Meta Ads (FB &amp; IG)</h3>
                  <span className="text-xs text-neutral-500">Iklan Terarah &amp; Terhubung ke WhatsApp</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-[#C23605] border border-orange-200">
                Terukur
              </span>
            </div>

            <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
              Jangkau calon pembeli potensial di Kalimantan Selatan maupun seluruh Indonesia. Kami membantu menyusun penargetan audiens berbasis data, pemasangan pelacak piksel yang benar, serta materi iklan yang mendorong kontak WhatsApp langsung.
            </p>

            <div className="mt-5 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
              <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block mb-3">
                Alur Kerja Pengelolaan Iklan
              </span>
              <div className="space-y-2 text-xs text-neutral-700">
                <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-neutral-200/60">
                  <span className="font-medium">1. Riset Audiens &amp; Kata Kunci</span>
                  <span className="text-[10px] text-neutral-500">Target Geografis</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-neutral-200/60">
                  <span className="font-medium">2. Setup Meta Pixel &amp; CAPI</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Pelacakan Akurat</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-neutral-200/60">
                  <span className="font-medium">3. Pengujian Materi &amp; Evaluasi</span>
                  <span className="text-[10px] text-neutral-500">Laporan Mingguan</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Meta Ads (FB &amp; IG)</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Google Search Ads</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Pengaturan Click-to-WA</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Laporan Transparan</div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-100">
            <Link
              href="/jasa-iklan-meta-ads"
              className="w-full py-3 px-5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <span>Pelajari Layanan Meta Ads</span>
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
                  <h3 className="text-lg font-bold text-neutral-900">Produksi &amp; Editing Video Kreatif</h3>
                  <span className="text-xs text-neutral-500">Format Vertikal Reels, TikTok &amp; Shorts</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-[#C23605] border border-orange-200">
                Format 9:16
              </span>
            </div>

            <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
              Tingkatkan daya tarik produk Anda melalui materi video yang rapi dan komunikatif. Dirancang untuk menyampaikan pesan inti dalam beberapa detik pertama agar calon pembeli tertarik berkunjung ke website atau menghubungi WhatsApp Anda.
            </p>

            <div className="mt-5 p-4 bg-neutral-900 text-white rounded-2xl border border-neutral-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-mono text-neutral-300">Format 9:16 Vertical Video</span>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-neutral-300">Full HD Export</span>
              </div>

              <div className="py-4 text-center">
                <Sparkles className="w-8 h-8 text-[#FF5C28] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-white">Materi Video Pendukung Promosi Produk &amp; Jasa</h4>
                <p className="text-[11px] text-neutral-300 mt-0.5">Penataan narasi, subtitle dinamis, pemotongan ritme rapi, dan ajakan pesan yang jelas.</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-neutral-300 pt-2 border-t border-neutral-800">
                <span>Platform: Instagram Reels • TikTok • YouTube Shorts</span>
                <span className="text-neutral-400">Siap Pasang Iklan</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Video Iklan Vertikal (9:16)</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Subtitle &amp; Motion Typography</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Video Profil Usaha Ringkas</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C23605]" /> Format Siap Pakai untuk Medsos</div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-100">
            <Link
              href="/video-editing"
              className="w-full py-3 px-5 bg-neutral-900 hover:bg-black text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-all"
            >
              <span>Pelajari Layanan Video Editing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
