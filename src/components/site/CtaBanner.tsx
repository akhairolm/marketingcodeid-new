import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'

interface CtaBannerProps {
  title: string
  description: string
  whatsappHref: string
  secondary?: { href: string; label: string }
}

/** Dark capsule CTA card — same visual language as the homepage closer. */
export function CtaBanner({ title, description, whatsappHref, secondary }: CtaBannerProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-[#121214] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-neutral-800">
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight [overflow-wrap:anywhere]">{title}</h2>
          <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Image
                src="/icons/flaticon/whatsapp.svg"
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 shrink-0 object-contain"
              />
              Diskusi via WhatsApp
            </a>
            {secondary && (
              <Link
                href={secondary.href}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/15 transition-all whitespace-nowrap"
              >
                {secondary.label}
              </Link>
            )}
          </div>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Konsultasi awal gratis
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> NDA &amp; proteksi ide
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
