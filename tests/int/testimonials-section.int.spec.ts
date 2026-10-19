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
    expect(screen.getByText('100%')).toBeTruthy()
    expect(screen.getByText('10x Lebih Cepat')).toBeTruthy()
  })
})
