import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

describe('TestimonialsSection (Suara Pengguna)', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders section title, badge, and key stat metrics', () => {
    render(React.createElement(TestimonialsSection))

    // Badge and Heading
    expect(screen.getByText(/Suara Pengguna/i)).toBeTruthy()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Cerita & Pengalaman Nyata Klien Kami/i,
      }),
    ).toBeTruthy()

    // Key value metrics
    expect(screen.getAllByText('100%').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('1 Tahun')).toBeTruthy()
    expect(screen.getByText('1-on-1')).toBeTruthy()
    expect(screen.getByText('Hak Milik Tanpa Sewa Bulanan')).toBeTruthy()
    expect(screen.getByText('Garansi Pemeliharaan Resmi')).toBeTruthy()
    expect(screen.getByText('Ditangani Lead Developer')).toBeTruthy()
  })

  it('renders all client stories with author details, verified badge, and stats', () => {
    render(React.createElement(TestimonialsSection))

    // Check author names
    expect(screen.getByText('EKO HARYONO, S.E., M.M')).toBeTruthy()
    expect(screen.getByText('Muhammad Abdul Gani')).toBeTruthy()
    expect(screen.getByText('Dr. Padlian Noor, S.Sos., M.A.P.')).toBeTruthy()
    expect(screen.getByText('Rini Yusnita, S.STP, MM')).toBeTruthy()

    // Verified badges (all 4 should be verified)
    const verifiedBadges = screen.getAllByText(/Klien Terverifikasi/i)
    expect(verifiedBadges.length).toBe(4)

    // Stat outcomes
    expect(screen.getByText('900+')).toBeTruthy()
    expect(screen.getByText('+320%')).toBeTruthy()
    expect(screen.getAllByText('100%').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('10x Lebih Cepat')).toBeTruthy()
  })

  it('renders author profile avatar images for all client stories', () => {
    render(React.createElement(TestimonialsSection))

    // Avatars with images
    const ekoAvatar = screen.getByRole('img', { name: 'EKO HARYONO, S.E., M.M' })
    expect(ekoAvatar).toBeTruthy()

    const padlianAvatar = screen.getByRole('img', { name: 'Dr. Padlian Noor, S.Sos., M.A.P.' })
    expect(padlianAvatar).toBeTruthy()

    const riniAvatar = screen.getByRole('img', { name: 'Rini Yusnita, S.STP, MM' })
    expect(riniAvatar).toBeTruthy()

    const aganAvatar = screen.getByRole('img', { name: 'Muhammad Abdul Gani' })
    expect(aganAvatar).toBeTruthy()
  })
})
