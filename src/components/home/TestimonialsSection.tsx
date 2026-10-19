import React from 'react'
import Image from 'next/image'
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react'

export interface TestimonialStory {
  id: string
  clientName: string
  businessType: string
  location: string
  serviceTag: string
  quote: string
  authorName: string
  authorRole: string
  authorInitials: string
  rating: number
  statValue: string
  statLabel: string
  image: string
  imageAlt: string
}

const STORIES: TestimonialStory[] = [
  {
    id: 'sasirangan-banua',
    clientName: 'Sasirangan Banua Lestari',
    businessType: 'Retail & Kerajinan Khas Kalsel',
    location: 'Banjarmasin',
    serviceTag: 'Website Katalog UMKM',
    quote:
      'Dulu kami kewalahan harus kirim foto katalog satu per satu lewat chat dan sering tertimbun. Sekarang pelanggan tinggal buka katalog website, pilih motif, dan klik beli yang langsung membuka WhatsApp dengan rincian pesanan. Sangat praktis dan hemat waktu staf!',
    authorName: 'Hj. Noor Aida',
    authorRole: 'Owner Sasirangan Banua',
    authorInitials: 'NA',
    rating: 5,
    statValue: '+280%',
    statLabel: 'Efisiensi Chat Order WhatsApp',
    image:
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Produksi motif kain Sasirangan tradisional khas Kalimantan Selatan',
  },
  {
    id: 'borneo-sarana',
    clientName: 'PT Borneo Sarana Perkasa',
    businessType: 'Kontraktor & Pengadaan B2B',
    location: 'Banjarbaru',
    serviceTag: 'Company Profile Bisnis',
    quote:
      'Company profile yang rapi dan cepat dibuka di laptop dinas sangat menunjang kredibilitas kami saat presentasi lelang proyek dan tender instansi. Dokumen legalitas dan portofolio tertata resmi tanpa ada plugin lambat. Komunikasi timnya ramah dan transparan.',
    authorName: 'Ir. Bambang Triyono',
    authorRole: 'Direktur Operasional',
    authorInitials: 'BT',
    rating: 5,
    statValue: '100%',
    statLabel: 'Kesesuaian Administrasi Tender',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Gedung korporasi dan kantor representatif mitra konstruksi',
  },
  {
    id: 'kopi-senja',
    clientName: 'Kopi Senja Kandangan',
    businessType: 'F&B & Kuliner Unggulan',
    location: 'Hulu Sungai Selatan',
    serviceTag: 'Landing Page Promosi',
    quote:
      'Kami mengarahkan promosi iklan Instagram ke landing page buatan MarketingCode. Calon pengunjung tidak kabur karena waktu muat websitenya luar biasa kencang walau dari sinyal HP biasa. Banyak pelanggan dari luar kota mampir setelah lihat menu dan lokasi di web.',
    authorName: 'M. Rizky Ramadhan',
    authorRole: 'Co-Founder Kopi Senja',
    authorInitials: 'RR',
    rating: 5,
    statValue: '0.6 Detik',
    statLabel: 'Waktu Muat Cepat di Smartphone',
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Suasana kedai kopi artisan modern di Kandangan',
  },
  {
    id: 'klinik-sehat',
    clientName: 'Klinik Pratama Sehat Utama',
    businessType: 'Fasilitas Layanan Medis',
    location: 'Banjarmasin',
    serviceTag: 'Website Profil & Jadwal',
    quote:
      'Informasi jadwal praktek dokter spesialis kini bisa diakses pasien 24 jam secara teratur. Staf administrasi kami juga mudah mengupdate informasi dari smartphone berkat dashboard admin yang praktis. Sangat kami rekomendasikan untuk profesional di Kalsel.',
    authorName: 'dr. Hendra Gunawan, Sp.A',
    authorRole: 'Penanggung Jawab Medis',
    authorInitials: 'HG',
    rating: 5,
    statValue: '24 Jam',
    statLabel: 'Akses Jadwal Mandiri Pasien',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Ruang konsultasi dan layanan fasilitas medis profesional',
  },
]

export function TestimonialsSection() {
  return (
    <section id="suara-pengguna" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <MessageSquareQuote className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Suara Pengguna</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          Cerita &amp; Pengalaman Nyata Klien Kami
        </h2>
        <p className="text-neutral-500 text-sm sm:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
          Dengarkan langsung bagaimana website yang cepat, mobile-friendly, dan terhubung ke
          WhatsApp membantu para pemilik usaha di Kalimantan Selatan berkembang lebih efisien.
        </p>

        {/* Highlight Stats Strip */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-neutral-200/80 shadow-soft max-w-2xl mx-auto">
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-900">50+</span>
            <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">Proyek Selesai &amp; Online</span>
          </div>
          <div className="text-center border-x border-neutral-100">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#D13D00]">98%</span>
            <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">Tingkat Kepuasan Klien</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-900">4.9/5</span>
            <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">Rating Kualitas Layanan</span>
          </div>
        </div>
      </div>

      {/* Unified Story Cards */}
      <div className="space-y-6 sm:space-y-8">
        {STORIES.map((story, index) => {
          const isEven = index % 2 === 0

          // Visual Preview Column
          const visualColumn = (
            <div
              key={`visual-${story.id}`}
              className={`flex flex-col justify-between h-full bg-neutral-50/50 ${
                isEven
                  ? 'order-1 md:order-1 border-b md:border-b-0 md:border-r border-neutral-200/70'
                  : 'order-1 md:order-2 border-b md:border-b-0 border-neutral-200/70'
              }`}
            >
              {/* Browser Mockup Top Bar */}
              <div className="bg-neutral-100/90 px-4 py-2.5 border-b border-neutral-200/70 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-mono text-neutral-700 font-medium truncate max-w-[200px]">
                  {story.clientName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                </span>
                <span className="w-3" />
              </div>

              {/* Project Image & Badge Overlay */}
              <div className="relative min-h-[240px] sm:min-h-[280px] flex-1 overflow-hidden bg-neutral-100">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Outcome Pill Overlay */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 text-white">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#D13D00] text-white uppercase tracking-wider mb-1">
                      {story.serviceTag}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-xs">
                      {story.clientName}
                    </h3>
                  </div>
                  <div className="bg-white/95 text-neutral-900 rounded-xl px-3 py-1.5 text-right shrink-0 shadow-md">
                    <span className="block text-xs sm:text-sm font-extrabold text-[#D13D00]">
                      {story.statValue}
                    </span>
                    <span className="text-[9px] text-neutral-600 font-medium block">
                      {story.statLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-4 py-3 bg-white border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                <span className="font-medium text-neutral-800">{story.businessType}</span>
                <span className="text-[11px] text-neutral-600">{story.location}</span>
              </div>
            </div>
          )

          // Testimonial Quote Column
          const quoteColumn = (
            <div
              key={`quote-${story.id}`}
              className={`p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden bg-white ${
                isEven
                  ? 'order-2 md:order-2'
                  : 'order-2 md:order-1 md:border-r border-neutral-200/70'
              }`}
            >
              {/* Subtle background glow */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#FFF5F0] rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Header: Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div role="img" aria-label={`Rating ${story.rating} dari 5 bintang`} className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: story.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Klien Terverifikasi
                  </span>
                </div>

                {/* Quote Content */}
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed italic relative z-10">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              {/* Author Profile */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center gap-3.5 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] text-white font-extrabold text-sm flex items-center justify-center shadow-xs shrink-0">
                  {story.authorInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                    {story.authorName}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {story.authorRole} &bull; <span className="text-[#C23605] font-semibold">{story.location}</span>
                  </p>
                </div>
              </div>
            </div>
          )

          return (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card hover:border-[#D13D00]/50 transition-all group"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                {visualColumn}
                {quoteColumn}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
