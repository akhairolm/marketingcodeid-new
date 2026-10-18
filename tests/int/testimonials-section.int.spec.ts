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

    // Key stats
    expect(screen.getByText('50+')).toBeTruthy()
    expect(screen.getByText('98%')).toBeTruthy()
    expect(screen.getByText('4.9/5')).toBeTruthy()
  })

  it('renders all client stories with author details, verified badge, and stats', () => {
    render(React.createElement(TestimonialsSection))

    // Check author names
    expect(screen.getByText('Hj. Noor Aida')).toBeTruthy()
    expect(screen.getByText('Ir. Bambang Triyono')).toBeTruthy()
    expect(screen.getByText('M. Rizky Ramadhan')).toBeTruthy()
    expect(screen.getByText('dr. Hendra Gunawan, Sp.A')).toBeTruthy()

    // Verified badges (all 4 should be verified)
    const verifiedBadges = screen.getAllByText(/Klien Terverifikasi/i)
    expect(verifiedBadges.length).toBe(4)

    // Stat outcomes
    expect(screen.getByText('+280%')).toBeTruthy()
    expect(screen.getByText('100%')).toBeTruthy()
    expect(screen.getByText('0.6 Detik')).toBeTruthy()
    expect(screen.getByText('24 Jam')).toBeTruthy()
  })
})
