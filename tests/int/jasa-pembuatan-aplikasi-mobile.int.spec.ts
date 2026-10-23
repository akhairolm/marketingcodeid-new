import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import JasaPembuatanAplikasiMobilePage from '@/app/(frontend)/jasa-pembuatan-aplikasi-mobile/page'

describe('Halaman /jasa-pembuatan-aplikasi-mobile', () => {
  beforeEach(() => cleanup())

  it('menampilkan H1 yang menyebut langsung di genggaman HP', () => {
    render(React.createElement(JasaPembuatanAplikasiMobilePage))
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toMatch(/Langsung di Genggaman HP/i)
  })

  it('menampilkan 3 tier harga aplikasi mobile transparan', () => {
    const { getAllByText } = render(React.createElement(JasaPembuatanAplikasiMobilePage))

    // Tier 1: Mobile Web-App (PWA)
    expect(getAllByText(/Mobile Web-App \(PWA\) & APK/i).length).toBeGreaterThan(0)
    expect(getAllByText('Rp 3.490.000').length).toBeGreaterThan(0)

    // Tier 2: Cross-Platform (Paling Diminati)
    expect(getAllByText(/Android & iOS Cross-Platform/i).length).toBeGreaterThan(0)
    expect(getAllByText('Rp 7.900.000').length).toBeGreaterThan(0)
    expect(getAllByText(/Paling Diminati/i).length).toBeGreaterThan(0)

    // Tier 3: Enterprise
    expect(getAllByText(/Custom Ecosystem & Enterprise/i).length).toBeGreaterThan(0)
    expect(getAllByText('Mulai Rp 14.900.000').length).toBeGreaterThan(0)
  })

  it('menampilkan 2 banner penangkap di bawah pricing (Konversi Web to App & KAK/RAB)', () => {
    const { getByText } = render(React.createElement(JasaPembuatanAplikasiMobilePage))

    // Banner Kiri: Konversi Web ke Aplikasi
    expect(getByText(/Sudah Punya Website\? Ubah Jadi Aplikasi Mobile Siap Install/i)).toBeTruthy()
    expect(getByText('Rp 1.990.000')).toBeTruthy()

    // Banner Kanan: KAK/RAB Instansi
    expect(getByText(/Butuh Penyusunan Spesifikasi Teknis \(KAK\/RAB\) atau Fitur Kustom\?/i)).toBeTruthy()
    expect(getByText(/Konsultasi & Pemetaan Gratis/i)).toBeTruthy()
  })

  it('menampilkan 4 studi kasus nyata (Si Akoor, AGAN TRANS, Youthpreneur, Pentas Japin)', () => {
    const { getByText } = render(React.createElement(JasaPembuatanAplikasiMobilePage))

    expect(getByText(/Si Akoor — Presensi Apel Geotagging GPS Radius 25m/i)).toBeTruthy()
    expect(getByText(/AGAN TRANS — Reservasi Tiket & Booking Rute Mobile-First/i)).toBeTruthy()
    expect(getByText(/Youthpreneur — Portal Pendataan & Pembinaan Wirausaha/i)).toBeTruthy()
    expect(getByText(/Pentas Japin — Evaluasi Kinerja Digital Pegawai ASN & Non-ASN/i)).toBeTruthy()
  })

  it('menampilkan 7 pertanyaan FAQ dalam elemen details', () => {
    const { container } = render(React.createElement(JasaPembuatanAplikasiMobilePage))
    const details = container.querySelectorAll('details')
    expect(details.length).toBe(7)
  })

  it('seluruh tautan WhatsApp memakai nomor resmi 6285128038243 dan target _blank', () => {
    const { container } = render(React.createElement(JasaPembuatanAplikasiMobilePage))
    const waLinks = Array.from(
      container.querySelectorAll('a[href^="https://wa.me/"]')
    ) as HTMLAnchorElement[]
    expect(waLinks.length).toBeGreaterThanOrEqual(5)
    for (const link of waLinks) {
      expect(link.getAttribute('href')).toContain('6285128038243')
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    }
  })

  it('mematuhi aturan mutlak tanpa emoji Unicode', () => {
    const { container } = render(React.createElement(JasaPembuatanAplikasiMobilePage))
    const text = container.textContent ?? ''
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
    expect(emojiRegex.test(text)).toBe(false)
  })
})
