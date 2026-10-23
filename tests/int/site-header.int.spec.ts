import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'

// Mock next/navigation's usePathname per test.
const pathnameRef = { current: '/' }
vi.mock('next/navigation', () => ({
  usePathname: () => pathnameRef.current,
}))

// Import after mock registration.
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import JasaIklanAdsPage from '@/app/(frontend)/jasa-iklan-ads/page'
import VideoEditingPage from '@/app/(frontend)/video-editing/page'
import HomePageClient from '@/components/home/home-client'

describe('SiteHeader unified public nav', () => {
  beforeEach(() => cleanup())

  it('renders the unified nav with services dropdown on "/" without anchor smooth scrolls', () => {
    pathnameRef.current = '/'
    render(React.createElement(SiteHeader))

    // Exposes the "Layanan" dropdown trigger.
    expect(screen.getByRole('button', { name: /layanan/i })).toBeTruthy()
    // Exposes "Beranda", "Portofolio", "Blog", and "Pertanyaan" links.
    expect(screen.getByRole('link', { name: 'Beranda' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Portofolio' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Pertanyaan' })).toBeTruthy()
    // Only one <header> element should exist on the page.
    expect(document.querySelectorAll('header').length).toBe(1)
    // No internal smooth scroll anchors in the header
    for (const href of ['#akselerasi', '#harga', '#faq', '#konsultasi', '#alur-kerja']) {
      expect(document.querySelector(`header a[href="${href}"]`)).toBeNull()
    }
  })

  it('renders identical unified nav structure on interior routes like "/blog"', () => {
    pathnameRef.current = '/blog'
    render(React.createElement(SiteHeader))

    // On interior routes, the same "Layanan" dropdown and top-level links exist.
    expect(screen.getByRole('button', { name: /layanan/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Beranda' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Portofolio' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Pertanyaan' })).toBeTruthy()
    expect(document.querySelectorAll('header').length).toBe(1)
  })

  it('closes services dropdown and mobile drawer with Escape key', () => {
    pathnameRef.current = '/'
    render(React.createElement(SiteHeader))
    const dropdown = screen.getByRole('button', { name: /layanan/i })
    const mobile = screen.getByRole('button', { name: /buka menu/i })
    fireEvent.click(dropdown)
    fireEvent.click(mobile)
    expect(dropdown.getAttribute('aria-expanded')).toBe('true')
    expect(mobile.getAttribute('aria-expanded')).toBe('true')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(dropdown.getAttribute('aria-expanded')).toBe('false')
    expect(mobile.getAttribute('aria-expanded')).toBe('false')
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('renders one header when composed with homepage content', () => {
    pathnameRef.current = '/'
    render(React.createElement(React.Fragment, null,
      React.createElement(SiteHeader),
      React.createElement(HomePageClient, { faqs: [], portfolioHighlights: [] }),
    ))
    expect(document.querySelectorAll('header').length).toBe(1)
  })

  it.each([JasaIklanAdsPage, VideoEditingPage])('uses only the shared footer for %s', (Page) => {
    render(React.createElement(React.Fragment, null,
      React.createElement(Page),
      React.createElement(SiteFooter),
    ))
    expect(document.querySelectorAll('footer').length).toBe(1)
  })
})
