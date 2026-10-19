import React from 'react'
import Image from 'next/image'
import { Star, MessageSquareQuote, CheckCircle2, ExternalLink } from 'lucide-react'

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
  domain?: string
  projectUrl?: string
}

const STORIES: TestimonialStory[] = [
  {
    id: 'dispora-youthpreneur-tapin',
    clientName: 'Dispora Kabupaten Tapin',
    businessType: 'Inkubasi Wirausaha Muda Daerah 2026',
    location: 'Rantau, Kab. Tapin',
    serviceTag: 'Web App & Portal Inkubasi',
    domain: 'youthpreneur.tapinkab.go.id',
    projectUrl: 'https://youthpreneur.tapinkab.go.id/',
    quote:
      'Platform Youthpreneur menjadi wadah pemuda daerah bertumbuh jadi motor ekonomi nusantara. Seleksi wirausaha muda, mentoring digital marketing, hingga permodalan terkelola rapi dalam satu sistem terintegrasi yang sangat cepat dan mudah diakses.',
    authorName: 'EKO HARYONO, S.E., M.M',
    authorRole: 'Kepala Dinas Pemuda dan Olahraga Kabupaten Tapin',
    authorInitials: 'EH',
    rating: 5,
    statValue: '900+',
    statLabel: 'Pemuda & Wirausaha Terfasilitasi',
    image: '/images/porto-1.webp',
    imageAlt: 'Platform Inkubasi Wirausaha Muda Daerah Dispora Tapin 2026',
  },
  {
    id: 'agan-trans-travel',
    clientName: 'AGAN TRANS (Travel Bandung Bali)',
    businessType: 'Layanan Transportasi & Sewa Hiace',
    location: 'Bandung & Denpasar',
    serviceTag: 'Website Booking & SEO Travel',
    domain: 'travelbandungbali.id',
    projectUrl: 'https://travelbandungbali.id/',
    quote:
      'Website travel kami mendominasi pencarian Google untuk rute antar pulau Bandung - Bali. Alur reservasi armada Hiace door-to-door langsung terhubung ke WhatsApp admin, membuat konversi pemesanan tiket naik pesat tanpa kendala teknis.',
    authorName: 'Muhammad Abdul Gani',
    authorRole: 'Pemilik Bisnis Travel',
    authorInitials: 'MG',
    rating: 5,
    statValue: '+320%',
    statLabel: 'Kenaikan Booking Tiket via WhatsApp',
    image: '/images/porto-2.webp',
    imageAlt: 'Website Layanan Sewa Hiace dan Travel Bandung Bali AGAN TRANS',
  },
  {
    id: 'siakoor-sekretariat-dprd',
    clientName: 'Sekretariat DPRD Kabupaten Tapin',
    businessType: 'Sistem Informasi Kedisiplinan & Koordinasi',
    location: 'Kabupaten Tapin',
    serviceTag: 'Web App Geofencing & Disposisi',
    domain: 'siakoor.tapinkab.go.id',
    projectUrl: 'https://siakoor.tapinkab.go.id/',
    quote:
      'Si Akoor mentransformasi presensi apel pagi dari absensi paraf kertas manual ke sistem digital dengan radius GPS 25 meter yang ketat. Arahan pimpinan apel langsung terdisposisi ke seluruh bagian, dan rekapitulasi kedisiplinan tersinkronisasi otomatis.',
    authorName: 'Dr. Padlian Noor, S.Sos., M.A.P.',
    authorRole: 'Sekretaris DPRD (Sekwan) Kabupaten Tapin',
    authorInitials: 'PN',
    rating: 5,
    statValue: '100%',
    statLabel: 'Akurasi Presensi GPS & Disposisi Cepat',
    image: '/images/porto-3.webp',
    imageAlt: 'Sistem Informasi Apel dan Koordinasi Si Akoor Sekretariat DPRD Tapin',
  },
  {
    id: 'pentasjapin-setda-tapin',
    clientName: 'Bagian Organisasi Setda Kab. Tapin',
    businessType: 'Platform Penilaian Kinerja Pegawai',
    location: 'Rantau, Kab. Tapin',
    serviceTag: 'Sistem Kinerja ASN & Non-ASN',
    domain: 'pentasjapin.tapinkab.go.id',
    projectUrl: 'https://pentasjapin.tapinkab.go.id/',
    quote:
      'Pentas Japin menghadirkan platform penilaian kinerja pegawai ASN dan non-ASN yang objektif, transparan, dan efisien bagi Pemerintah Kabupaten Tapin. Seluruh instrumen capaian kinerja terdata rapi tanpa beban administrasi berkas manual.',
    authorName: 'Rini Yusnita, S.STP, MM',
    authorRole: 'Kepala Bagian Organisasi',
    authorInitials: 'RY',
    rating: 5,
    statValue: '10x Lebih Cepat',
    statLabel: 'Rekapitulasi Evaluasi Kinerja Pegawai',
    image: '/images/porto-4.webp',
    imageAlt: 'Aplikasi Pentas Japin Penilaian Kinerja Terintegrasi Setda Tapin',
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
          Dengarkan langsung bagaimana website dan aplikasi sistem informasi yang cepat, aman, dan
          tepat guna membantu instansi pemerintah daerah serta pelaku bisnis berkembang lebih
          efisien.
        </p>

        {/* Highlight Stats Strip */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-neutral-200/80 shadow-soft max-w-2xl mx-auto">
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-900">50+</span>
            <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">
              Proyek Selesai &amp; Online
            </span>
          </div>
          <div className="text-center border-x border-neutral-100">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#D13D00]">98%</span>
            <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">
              Tingkat Kepuasan Klien
            </span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-900">
              4.9/5
            </span>
            <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">
              Rating Kualitas Layanan
            </span>
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
                {story.projectUrl ? (
                  <a
                    href={story.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-neutral-600 hover:text-[#C23605] font-medium truncate max-w-[220px] transition-colors flex items-center gap-1 group/link"
                    title={`Kunjungi ${story.domain || story.clientName}`}
                  >
                    <span>{story.domain || story.clientName}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-neutral-700 font-medium truncate max-w-[200px]">
                    {story.domain ||
                      story.clientName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}
                  </span>
                )}
                <span className="w-3" />
              </div>

              {/* Project Image Container - Uncropped Display */}
              <div className="relative w-full aspect-[800/533] bg-neutral-100/60 overflow-hidden flex items-center justify-center group-hover:brightness-[1.02] transition-all">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

              {/* Bottom Card Meta & Outcome */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-white border-t border-neutral-200/70 flex items-center justify-between gap-3 text-xs mt-auto">
                <div className="min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF0EB] text-[#C23605] uppercase tracking-wider mb-1">
                    {story.serviceTag}
                  </span>
                  <h3 className="font-bold text-neutral-900 truncate text-xs sm:text-sm">
                    {story.clientName}
                  </h3>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {story.businessType} &bull; {story.location}
                  </p>
                </div>
                <div className="bg-[#FFF5F0] border border-orange-200/60 rounded-xl px-3 py-1.5 text-right shrink-0">
                  <span className="block text-xs sm:text-sm font-extrabold text-[#D13D00]">
                    {story.statValue}
                  </span>
                  <span className="text-[9px] text-neutral-600 font-medium block">
                    {story.statLabel}
                  </span>
                </div>
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
                  <div
                    role="img"
                    aria-label={`Rating ${story.rating} dari 5 bintang`}
                    className="flex items-center gap-1 text-amber-400"
                  >
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
                    {story.authorRole} &bull;{' '}
                    <span className="text-[#C23605] font-semibold">{story.location}</span>
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
