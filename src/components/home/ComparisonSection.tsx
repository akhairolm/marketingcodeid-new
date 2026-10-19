import { Check, X, Circle } from 'lucide-react'

export interface ComparisonRow {
  number: string
  criteria: string
  marketingCode: {
    status: 'check' | 'cross' | 'neutral'
    text: string
  }
  marketplace: {
    status: 'check' | 'cross' | 'neutral'
    text: string
  }
  diy: {
    status: 'check' | 'cross' | 'neutral'
    text: string
  }
}

export const comparisonRows: ComparisonRow[] = [
  {
    number: '01',
    criteria: 'Biaya per transaksi',
    marketingCode: {
      status: 'check',
      text: 'Gratis (0% Potongan)',
    },
    marketplace: {
      status: 'cross',
      text: '5–12% potong per order',
    },
    diy: {
      status: 'neutral',
      text: 'Gratis (ada fee gateway)',
    },
  },
  {
    number: '02',
    criteria: 'Domain nama sendiri',
    marketingCode: {
      status: 'check',
      text: 'Termasuk (.com / .id)',
    },
    marketplace: {
      status: 'cross',
      text: 'Tidak ada (numpang platform)',
    },
    diy: {
      status: 'cross',
      text: 'Biaya tambahan terpisah',
    },
  },
  {
    number: '03',
    criteria: 'Data pembeli milik Anda',
    marketingCode: {
      status: 'check',
      text: '100% milik Anda',
    },
    marketplace: {
      status: 'cross',
      text: 'Dikunci platform / disensor',
    },
    diy: {
      status: 'neutral',
      text: 'Milik Anda (kelola mandiri)',
    },
  },
  {
    number: '04',
    criteria: 'Butuh skill teknis',
    marketingCode: {
      status: 'check',
      text: 'Tidak, kami setup tuntas',
    },
    marketplace: {
      status: 'neutral',
      text: 'Tidak, tapi sangat terbatas',
    },
    diy: {
      status: 'cross',
      text: 'Tinggi (hosting, plugin & koding)',
    },
  },
  {
    number: '05',
    criteria: 'Dukungan lokal & support',
    marketingCode: {
      status: 'check',
      text: 'Tim WhatsApp langsung',
    },
    marketplace: {
      status: 'cross',
      text: 'Tiket antrean & robot CS',
    },
    diy: {
      status: 'cross',
      text: 'Forum bahasa Inggris',
    },
  },
  {
    number: '06',
    criteria: 'Siap SEO Google',
    marketingCode: {
      status: 'check',
      text: 'Termasuk (SEO & Pixel siap)',
    },
    marketplace: {
      status: 'cross',
      text: 'Terbatas di aplikasi',
    },
    diy: {
      status: 'cross',
      text: 'Perlu setup manual teknis',
    },
  },
  {
    number: '07',
    criteria: 'Transparansi biaya',
    marketingCode: {
      status: 'check',
      text: 'Penawaran per proyek (100% hak milik)',
    },
    marketplace: {
      status: 'cross',
      text: 'Komisi admin terus naik',
    },
    diy: {
      status: 'cross',
      text: 'Langganan add-on ($ USD)',
    },
  },
]

function StatusIcon({ status }: { status: 'check' | 'cross' | 'neutral' }) {
  if (status === 'check') {
    return <Check className="w-4 h-4 shrink-0 text-[#FF5C28]" strokeWidth={2.5} />
  }
  if (status === 'cross') {
    return <X className="w-4 h-4 shrink-0 text-neutral-400" strokeWidth={2.5} />
  }
  return <Circle className="w-3.5 h-3.5 shrink-0 text-neutral-500" strokeWidth={2.5} />
}

export function ComparisonSection() {
  return (
    <section
      id="perbandingan"
      aria-label="Perbandingan Solusi Website"
      className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 sm:mt-28"
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-neutral-900">
        <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#FF5C28]">
          Perbandingan
        </span>
        <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-neutral-500">
          MarketingCode vs Solusi Lain
        </span>
      </div>

      {/* Headline & Subhead Row */}
      <div className="mt-8 sm:mt-12 mb-8 sm:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-neutral-900 leading-[1.25] sm:leading-[1.2] lg:leading-[1.18] tracking-tight">
            Kenapa website sendiri{' '}
            <span className="relative inline-block italic font-medium">
              <span className="relative z-10">menang jangka panjang.</span>
            </span>
          </h2>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <p className="font-medium text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Marketplace cocok untuk awal, DIY cocok untuk hobi. Untuk bisnis yang ingin tumbuh,
            website sendiri selalu lebih ekonomis dalam 2-3 tahun.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <span className="w-8 h-px bg-[#FF5C28]" />
            <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-neutral-500">
              Efisiensi Investasi Jangka Panjang
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Comparison Table */}
      <div className="hidden md:block bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-card">
        {/* Table Header Row */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b-2 border-neutral-900">
          <div className="p-5 lg:p-6 font-semibold text-[11px] tracking-[0.28em] uppercase text-neutral-500 flex items-center">
            Kriteria
          </div>
          <div className="p-5 lg:p-6 border-l border-neutral-200 bg-neutral-900 text-white">
            <div className="font-extrabold text-lg lg:text-xl leading-tight text-white">
              MarketingCode.ID
            </div>
            <div className="font-semibold text-[10px] tracking-[0.22em] uppercase mt-1 text-[#FF5C28]">
              Website Sendiri
            </div>
          </div>
          <div className="p-5 lg:p-6 border-l border-neutral-200">
            <div className="font-extrabold text-lg lg:text-xl leading-tight text-neutral-900">
              Marketplace
            </div>
            <div className="font-semibold text-[10px] tracking-[0.22em] uppercase mt-1 text-neutral-500">
              Shopee / Tokopedia
            </div>
          </div>
          <div className="p-5 lg:p-6 border-l border-neutral-200">
            <div className="font-extrabold text-lg lg:text-xl leading-tight text-neutral-900">
              DIY
            </div>
            <div className="font-semibold text-[10px] tracking-[0.22em] uppercase mt-1 text-neutral-500">
              Wix / WordPress
            </div>
          </div>
        </div>

        {/* Table Data Rows */}
        {comparisonRows.map((row, idx) => (
          <div
            key={row.number}
            className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] ${
              idx !== comparisonRows.length - 1 ? 'border-b border-neutral-200/80' : ''
            }`}
          >
            {/* Criteria Column */}
            <div className="p-5 lg:p-6 flex items-center gap-3">
              <span className="font-semibold text-[10px] tracking-[0.22em] uppercase text-[#FF5C28] min-w-[2rem]">
                {row.number}
              </span>
              <span className="font-semibold text-sm lg:text-base text-neutral-900">
                {row.criteria}
              </span>
            </div>

            {/* MarketingCode Column (Highlighted) */}
            <div className="p-5 lg:p-6 border-l border-neutral-200 flex items-center gap-2.5 bg-[#FF5C28]/5">
              <StatusIcon status={row.marketingCode.status} />
              <span className="text-sm leading-snug font-semibold text-neutral-900">
                {row.marketingCode.text}
              </span>
            </div>

            {/* Marketplace Column */}
            <div className="p-5 lg:p-6 border-l border-neutral-200 flex items-center gap-2.5">
              <StatusIcon status={row.marketplace.status} />
              <span className="text-sm leading-snug font-medium text-neutral-600">
                {row.marketplace.text}
              </span>
            </div>

            {/* DIY Column */}
            <div className="p-5 lg:p-6 border-l border-neutral-200 flex items-center gap-2.5">
              <StatusIcon status={row.diy.status} />
              <span className="text-sm leading-snug font-medium text-neutral-600">
                {row.diy.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="md:hidden space-y-4">
        {/* Card 1: MarketingCode.ID (Highlighted) */}
        <div className="rounded-3xl p-6 border bg-neutral-900 border-[#FF5C28] text-white shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
            <div>
              <div className="font-extrabold text-lg text-white">MarketingCode.ID</div>
              <div className="font-semibold text-[10px] tracking-[0.22em] uppercase text-[#FF5C28]">
                Website Sendiri
              </div>
            </div>
            <span className="text-[10px] tracking-wider uppercase font-bold bg-[#FF5C28] text-white px-2.5 py-1 rounded-full">
              Pilihan Bisnis
            </span>
          </div>

          <ul className="space-y-3.5">
            {comparisonRows.map((row) => (
              <li key={row.number} className="flex items-start gap-3">
                <StatusIcon status={row.marketingCode.status} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-white/60">{row.criteria}</div>
                  <div className="font-medium text-sm text-white mt-0.5">
                    {row.marketingCode.text}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Marketplace */}
        <div className="rounded-3xl p-6 border bg-white border-neutral-200 text-neutral-900 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
            <div>
              <div className="font-extrabold text-lg text-neutral-900">Marketplace</div>
              <div className="font-semibold text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                Shopee / Tokopedia
              </div>
            </div>
          </div>

          <ul className="space-y-3.5">
            {comparisonRows.map((row) => (
              <li key={row.number} className="flex items-start gap-3">
                <StatusIcon status={row.marketplace.status} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-neutral-500">{row.criteria}</div>
                  <div className="font-medium text-sm text-neutral-800 mt-0.5">
                    {row.marketplace.text}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: DIY */}
        <div className="rounded-3xl p-6 border bg-white border-neutral-200 text-neutral-900 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
            <div>
              <div className="font-extrabold text-lg text-neutral-900">DIY / Template</div>
              <div className="font-semibold text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                Wix / WordPress
              </div>
            </div>
          </div>

          <ul className="space-y-3.5">
            {comparisonRows.map((row) => (
              <li key={row.number} className="flex items-start gap-3">
                <StatusIcon status={row.diy.status} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-neutral-500">{row.criteria}</div>
                  <div className="font-medium text-sm text-neutral-800 mt-0.5">{row.diy.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
