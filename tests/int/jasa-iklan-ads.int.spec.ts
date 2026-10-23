import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import JasaIklanAdsPage from '@/app/(frontend)/jasa-iklan-ads/page'

describe('Halaman /jasa-iklan-ads', () => {
  beforeEach(() => cleanup())

  it('menampilkan H1 yang menyebut percakapan, bukan hanya klik', () => {
    render(React.createElement(JasaIklanAdsPage))
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toMatch(/Percakapan/i)
  })

  it('menampilkan ketiga tier harga dari pricingData.ads', () => {
    render(React.createElement(JasaIklanAdsPage))
    expect(screen.getAllByText('Growth Campaign').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Scale & Performance').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Full Digital Takeover').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rp 3.5jt').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rp 7.5jt').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rp 15jt+').length).toBeGreaterThan(0)
  })

  it('menjelaskan bahwa anggaran iklan dibayar terpisah', () => {
    render(React.createElement(JasaIklanAdsPage))
    expect(screen.getByText(/anggaran iklan dibayarkan terpisah/i)).toBeTruthy()
  })

  it('menampilkan enam pertanyaan FAQ', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    const details = container.querySelectorAll('details')
    expect(details.length).toBe(6)
  })

  it('setiap tautan WhatsApp memakai nomor resmi dan target _blank', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    const waLinks = Array.from(
      container.querySelectorAll('a[href^="https://wa.me/"]')
    ) as HTMLAnchorElement[]
    expect(waLinks.length).toBeGreaterThanOrEqual(4)
    for (const link of waLinks) {
      expect(link.getAttribute('href')).toContain('6285128038243')
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    }
  })

  it('tidak menampilkan klaim angka hasil kampanye yang tidak terverifikasi', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/ROAS/i)
    expect(text).not.toMatch(/98%/)
    expect(text).not.toMatch(/50\+ Proyek/i)
    expect(text).not.toMatch(/rating 4\.9/i)
  })

  it('tidak merender section testimoni', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    expect(container.querySelector('#suara-pengguna')).toBeNull()
  })
})
