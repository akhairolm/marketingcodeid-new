import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import JasaPembuatanWebsitePage from '@/app/(frontend)/jasa-pembuatan-website/page'
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp'

describe('JasaPembuatanWebsitePage', () => {
  beforeEach(() => cleanup())

  it('renders the sales landing page with non-technical, high-converting hero', () => {
    render(React.createElement(JasaPembuatanWebsitePage))

    // H1 Heading
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('Miliki Website Bisnis & Toko Online Profesional')
    expect(h1.textContent).toContain('Tanpa Ribet Koding')

    // National scope (not restricted to local only)
    expect(screen.getByText(/Melayani Seluruh Indonesia/i)).toBeTruthy()
    expect(screen.getByText(/Shopee & Tokopedia/i)).toBeTruthy()
    expect(screen.getByText(/Instagram & TikTok/i)).toBeTruthy()
    expect(screen.getByText(/Order 0% potongan/i)).toBeTruthy()
  })

  it('renders all 3 website tiers matching homepage pricing exactly', () => {
    render(React.createElement(JasaPembuatanWebsitePage))

    // Tier 1
    expect(screen.getByRole('heading', { level: 3, name: 'Landing Page Konversi' })).toBeTruthy()
    expect(screen.getByText('Rp 1.190.000')).toBeTruthy()
    expect(screen.getByText('Rp 1.850.000')).toBeTruthy()

    // Tier 2
    expect(screen.getByRole('heading', { level: 3, name: 'Web Katalog, Profil & Blog' })).toBeTruthy()
    expect(screen.getByText('Rp 2.190.000')).toBeTruthy()
    expect(screen.getByText('Rp 3.200.000')).toBeTruthy()
    expect(screen.getByText('PALING DIMINATI')).toBeTruthy()

    // Tier 3
    expect(screen.getByRole('heading', { level: 3, name: 'Company Profile Pro / Toko Online' })).toBeTruthy()
    expect(screen.getByText('Rp 3.490.000')).toBeTruthy()
    expect(screen.getByText('Rp 5.500.000')).toBeTruthy()
  })

  it('contains WhatsApp CTA links targeting official WhatsApp number', () => {
    render(React.createElement(JasaPembuatanWebsitePage))

    const waLinks = screen.getAllByRole('link', { name: /WhatsApp/i })
    expect(waLinks.length).toBeGreaterThan(0)
    for (const link of waLinks) {
      const href = link.getAttribute('href') || ''
      if (href.startsWith('https://wa.me/')) {
        expect(href).toContain(DEFAULT_WHATSAPP_NUMBER)
      }
    }
  })

  it('contains competitor-inspired pain point and solution sections', () => {
    render(React.createElement(JasaPembuatanWebsitePage))

    // Pain points
    expect(screen.getByText(/Sebagian Besar Pemilik Usaha Mengalami 4 Hal Ini/i)).toBeTruthy()
    expect(screen.getByText(/Marketplace Memotong Margin Anda/i)).toBeTruthy()
    expect(screen.getByText(/Data Pembeli Dikunci & Bukan Milik Anda/i)).toBeTruthy()

    // Solutions
    expect(screen.getByText(/6 Hal yang Langsung Aktif di Website Toko Anda/i)).toBeTruthy()
    expect(screen.getByText(/Alamat Toko Resmi Milik Sendiri/i)).toBeTruthy()
    expect(screen.getByText(/Bisa Ganti Foto & Harga dari Layar HP/i)).toBeTruthy()

    // Post-live support
    expect(screen.getByText(/Setelah Website Live, Anda Tidak Ditinggal Sendirian/i)).toBeTruthy()

    // Comparison
    expect(screen.getByText(/Kenapa website toko sendiri jauh lebih menguntungkan jangka panjang/i)).toBeTruthy()
  })

  it('renders all 10 sections with headings, preserves FAQ disclosure labels and contents, and hides decorative section numbers from the accessible heading text', () => {
    const { container } = render(React.createElement(JasaPembuatanWebsitePage))

    // 10 sections: 1 Hero (h1) + 9 subsequent (h2)
    const headingTexts = [
      /Miliki Website Bisnis & Toko Online Profesional/i, // 1. Hero
      /Sebagian Besar Pemilik Usaha Mengalami 4 Hal Ini/i, // 2. Masalah
      /6 Hal yang Langsung Aktif di Website Toko Anda/i, // 3. Keuntungan
      /Investasi Transparan Sesuai Skala Usaha Anda/i, // 4. Paket
      /Alur pembuatan mudah/i, // 5. Alur Pengerjaan
      /Setelah Website Live, Anda Tidak Ditinggal Sendirian/i, // 6. Purna Jual
      /Kenapa website toko sendiri jauh lebih menguntungkan/i, // 7. Perbandingan
      /Solusi Website & Toko Online untuk Pengusaha di Seluruh Indonesia/i, // 8. Jangkauan
      /Pertanyaan yang Sering Diajukan Pemilik Usaha/i, // 9. FAQ
      /Siap Bikin Usaha Anda Naik Kelas/i, // 10. Final CTA
    ]
    for (const text of headingTexts) {
      const heading = screen.getByRole('heading', { name: text })
      expect(heading).toBeTruthy()
      // Decorative § markers must not pollute accessible heading text.
      expect(heading.textContent || '').not.toContain('§')
    }

    // FAQ: each disclosure uses <details><summary> with question + answer preserved.
    const detailsEls = container.querySelectorAll('details')
    expect(detailsEls.length).toBe(7)

    const expectedFaq: Array<[RegExp, RegExp]> = [
      [/Apakah ada sistem sewa bulanan yang mengikat/i, /Sama sekali tidak ada biaya sewa bulanan/i],
      [/Apakah biaya paket sudah termasuk nama domain/i, /pendaftaran nama domain resmi/i],
      [/Bagaimana dengan jaminan kepuasan & garansi purna jual/i, /garansi pemeliharaan resmi/i],
      [/Berapa lama waktu yang dibutuhkan hingga website siap digunakan/i, /3 - 5 hari kerja/i],
      [/Saya gaptek dan tidak paham koding/i, /panel admin yang sangat simpel/i],
      [/Bagaimana alur pemesanan produk oleh pembeli/i, /tombol pesan WhatsApp/i],
      [/Bagaimana proses pengerjaan jika lokasi saya berada di luar kota/i, /100% online secara profesional/i],
    ]
    detailsEls.forEach((details, idx) => {
      const summary = details.querySelector('summary')
      expect(summary).toBeTruthy()
      const h3 = summary?.querySelector('h3')
      expect(h3).toBeTruthy()
      expect(h3!.textContent || '').toMatch(expectedFaq[idx][0])
      // Full body still contains both question + answer verbatim.
      expect(details.textContent || '').toMatch(expectedFaq[idx][0])
      expect(details.textContent || '').toMatch(expectedFaq[idx][1])
      // Disclosure cue icon is aria-hidden so it is excluded from the accessible name.
      const cue = summary?.querySelector('[aria-hidden="true"]')
      expect(cue).toBeTruthy()
    })
  })

  it('renders the Suara Pengguna (testimonials) section with verified client stories', () => {
    render(React.createElement(JasaPembuatanWebsitePage))

    expect(screen.getByText(/Suara Pengguna/i)).toBeTruthy()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Cerita & Pengalaman Nyata Klien Kami/i,
      }),
    ).toBeTruthy()
    expect(screen.getByText('EKO HARYONO, S.E., M.M')).toBeTruthy()
    expect(screen.getByText('Muhammad Abdul Gani')).toBeTruthy()
    expect(screen.getByText('Dr. Padlian Noor, S.Sos., M.A.P.')).toBeTruthy()
    expect(screen.getByText('Rini Yusnita, S.STP, MM')).toBeTruthy()
  })
})
