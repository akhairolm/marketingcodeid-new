'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Route, ArrowRight, ExternalLink } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'
import type { PortfolioProject } from './home-data'

const FILTERS = [
  { value: 'all', label: 'Semua Proyek' },
  { value: 'web', label: 'Web Development' },
  { value: 'app', label: 'Mobile Application' },
  { value: 'marketing', label: 'Digital Marketing' },
  { value: 'video', label: 'Video Production' },
] as const

function PortfolioCard({ item }: { item: PortfolioProject }) {
  const isDemo = item.client.toLowerCase().includes('demo') || item.title.toLowerCase().includes('demo')

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all group flex flex-col justify-between">
      <div>
        <Link href={`/portfolio/${item.slug}`} className="block aspect-[16/9] w-full overflow-hidden relative bg-neutral-100">
          <Image
            src={item.image}
            alt={`Portofolio ${item.title} — ${item.categoryLabel} di Kalimantan Selatan`}
            title={`Portofolio ${item.title} — ${item.client}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
            {item.categoryLabel}
          </div>
        </Link>

        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-neutral-500">
              {isDemo ? 'Contoh Penerapan / Demo' : `Inisiatif / Klien: ${item.client}`}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {item.highlight}
            </span>
          </div>

          <Link href={`/portfolio/${item.slug}`} className="block">
            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#FF5C28] transition-colors">
              {item.title}
            </h3>
          </Link>

          <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">{item.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-[11px] font-medium text-neutral-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
        <Link
          href={`/portfolio/${item.slug}`}
          aria-label={`Lihat Studi Kasus ${item.title}`}
          className="flex-1 py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D13D00]"
        >
          <span>Lihat Studi Kasus</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={getWhatsAppUrl('case-study', item.title)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              position: 'portfolio_card_wa',
              service: item.category,
              packageTitle: item.title,
            })
          }
          aria-label={`Diskusi via WhatsApp untuk proyek ${item.title}`}
          className="py-2.5 px-4 bg-neutral-50 hover:bg-[#FFF5F0] hover:text-[#C23605] border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D13D00]"
        >
          <span>Diskusi via WA</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}

export function PortfolioSection({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['value']>('all')

  const activeFilters = FILTERS.filter(
    (f) => f.value === 'all' || projects.some((p) => p.category === f.value)
  )

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="portfolio" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <Route className="w-3.5 h-3.5" />
          <span>Studi Kasus &amp; Portofolio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Portofolio Proyek &amp; Studi Kasus Terpilih
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
          Mulai dari sistem digitalisasi instansi di Kalimantan Selatan hingga website bisnis komersial. Lihat bagaimana solusi kami mempermudah operasional dan mendongkrak hasil nyata.
        </p>
      </div>

      {activeFilters.length > 1 && (
        <div className="flex justify-center mb-10">
          <div
            role="tablist"
            aria-label="Filter kategori portofolio"
            className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200 overflow-x-auto max-w-full snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {activeFilters.map((f) => (
              <button
                key={f.value}
                id={`portfolio-filter-${f.value}`}
                type="button"
                role="tab"
                aria-selected={filter === f.value}
                aria-controls={`portfolio-tabpanel-${f.value}`}
                tabIndex={filter === f.value ? 0 : -1}
                onClick={() => setFilter(f.value)}
                className={`px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D13D00] ${
                  filter === f.value
                    ? 'font-bold bg-white text-neutral-900 shadow-xs'
                    : 'font-semibold text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div
          id={`portfolio-tabpanel-${filter}`}
          role="tabpanel"
          aria-labelledby={`portfolio-filter-${filter}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-neutral-500 py-12">Belum ada portofolio pada kategori ini.</p>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-200/80 hover:border-[#C23605] text-xs font-bold text-neutral-800 hover:text-[#C23605] shadow-card transition-all transform hover:-translate-y-0.5"
        >
          <span>Lihat Seluruh Portofolio &amp; Studi Kasus</span>
          <ArrowRight className="w-4 h-4 text-[#C23605]" />
        </Link>
      </div>
    </section>
  )
}
