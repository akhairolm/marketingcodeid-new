import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import JasaIklanAdsPage from '@/app/(frontend)/jasa-iklan-ads/page'

describe('Halaman /jasa-iklan-ads', () => {
  beforeEach(() => cleanup())

  it('menampilkan H1 yang menyebut percakapan, bukan hanya klik', () => {
    render(React.createElement(JasaIklanAdsPage))
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toMatch(/Percakapan/i)
  })

  it('menampilkan tier harga All-In dan dapat beralih ke skema Jasa Saja', () => {
    const { getByRole, getByText, getAllByText } = render(React.createElement(JasaIklanAdsPage))

    // Default: Tab All-In Terima Beres
    expect(getAllByText('Trial 14 Hari').length).toBeGreaterThan(0)
    expect(getAllByText('Growth 30 Hari').length).toBeGreaterThan(0)
    expect(getAllByText('Scale Omnichannel').length).toBeGreaterThan(0)
    expect(getAllByText('Rp 1.290.000').length).toBeGreaterThan(0)
    expect(getAllByText('Rp 2.490.000').length).toBeGreaterThan(0)
    expect(getAllByText('Rp 3.990.000').length).toBeGreaterThan(0)

    // Switch ke Tab Jasa Pengelolaan Saja
    const feeTab = getByRole('tab', { name: /Jasa Pengelolaan Saja/i })
    fireEvent.click(feeTab)

    expect(getAllByText('Starter Trial 14 Hari').length).toBeGreaterThan(0)
    expect(getAllByText('Growth 1 Platform').length).toBeGreaterThan(0)
    expect(getAllByText('Rp 790.000').length).toBeGreaterThan(0)
    expect(getAllByText('Rp 1.490.000').length).toBeGreaterThan(0)
    expect(getAllByText('Rp 2.900.000').length).toBeGreaterThan(0)

    // Memverifikasi Banner Bundling & Jasa Setup Tracking
    expect(getByText(/Landing Page Konversi \+ Kelola Iklan 1 Bulan/i)).toBeTruthy()
    expect(getByText('Mulai Rp 2.290.000')).toBeTruthy()
    expect(getByText(/Jasa Pemasangan Tracking & Pixel Saja/i)).toBeTruthy()
    expect(getByText('Rp 490.000')).toBeTruthy()
  })

  it('menjelaskan opsi skema All-In dan Jasa Pengelolaan Saja secara transparan', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    expect(container.textContent).toMatch(/sudah termasuk estimasi saldo iklan aktif|sudah termasuk alokasi saldo iklan/i)
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
