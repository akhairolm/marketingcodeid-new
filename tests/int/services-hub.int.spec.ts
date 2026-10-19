import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import { ServicesHub } from '@/components/home/ServicesHub'
import { WorkflowSection } from '@/components/home/WorkflowSection'
import { ComparisonSection } from '@/components/home/ComparisonSection'
import HomePageClient from '@/components/home/home-client'

describe('ServicesHub and Homepage layout', () => {
  beforeEach(() => cleanup())

  it('renders the 3 core agency services in ServicesHub', () => {
    render(React.createElement(ServicesHub))

    // 1. Jasa Pembuatan Website
    const webHeading = screen.getByRole('heading', { level: 3, name: 'Jasa Pembuatan Website' })
    expect(webHeading).toBeTruthy()
    const webLink = screen.getByRole('link', { name: /Lihat Layanan Website/i })
    expect(webLink.getAttribute('href')).toBe('/jasa-pembuatan-website')

    // 2. Jasa Digital Marketing
    const marketingHeading = screen.getByRole('heading', { level: 3, name: 'Jasa Digital Marketing' })
    expect(marketingHeading).toBeTruthy()
    const marketingLink = screen.getByRole('link', { name: /Lihat Layanan Digital Marketing/i })
    expect(marketingLink.getAttribute('href')).toBe('/digital-marketing')

    // 3. Jasa Pembuatan Mobile App
    const mobileHeading = screen.getByRole('heading', { level: 3, name: 'Jasa Pembuatan Mobile App' })
    expect(mobileHeading).toBeTruthy()
    const mobileLink = screen.getByRole('link', { name: /Lihat Layanan Mobile App/i })
    expect(mobileLink.getAttribute('href')).toBe('/jasa-pembuatan-aplikasi-mobile')
  })

  it('renders WorkflowSection matching Section Proses', () => {
    render(React.createElement(WorkflowSection))

    expect(screen.getByText('Proses')).toBeTruthy()
    expect(screen.getByText(/Dari Konsultasi ke Website Live & Bergaransi/i)).toBeTruthy()
    expect(screen.getByRole('heading', { level: 3, name: 'Konsultasi & Pemilihan Solusi' })).toBeTruthy()
    expect(screen.getByRole('heading', { level: 3, name: 'Review Akhir & Go Live' })).toBeTruthy()
    expect(screen.getByText('01')).toBeTruthy()
    expect(screen.getByText('04')).toBeTruthy()
  })

  it('renders ComparisonSection matching Section Perbandingan', () => {
    render(React.createElement(ComparisonSection))

    expect(screen.getByText(/Perbandingan/i)).toBeTruthy()
    expect(screen.getByText(/MarketingCode vs Solusi Lain/i)).toBeTruthy()
    expect(screen.getByText(/menang jangka panjang\./i)).toBeTruthy()
    expect(screen.getAllByText('MarketingCode.ID').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Marketplace').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Biaya per transaksi').length).toBeGreaterThan(0)
  })

  it('does not render portfolio, flagship, or old Komitmen Layanan on HomePageClient', () => {
    render(React.createElement(HomePageClient, { portfolioHighlights: [] }))

    expect(screen.queryByText('Studi Kasus & Portofolio')).toBeNull()
    expect(screen.queryByText('Portofolio Proyek & Studi Kasus Terpilih')).toBeNull()
    expect(screen.queryByText('Flagship Solutions')).toBeNull()
    expect(screen.queryByText('Spesialisasi Web & Mobile App Berperforma Tinggi')).toBeNull()
    expect(screen.queryByText('Komitmen Layanan')).toBeNull()
  })
})

