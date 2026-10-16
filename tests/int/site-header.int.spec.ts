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
import DigitalMarketingPage from '@/app/(frontend)/digital-marketing/page'
import VideoEditingPage from '@/app/(frontend)/video-editing/page'
import HomePageClient from '@/components/home/home-client'

describe('SiteHeader route-based nav', () => {
  beforeEach(() => cleanup())

  it('renders the homepage nav with services dropdown on "/"', () => {
    pathnameRef.current = '/'
    render(React.createElement(SiteHeader))

    // Homepage nav exposes the "Layanan Utama" dropdown trigger.
    expect(screen.getByRole('button', { name: /layanan utama/i })).toBeTruthy()
    // Only one <header> element should exist on the page.
    expect(document.querySelectorAll('header').length).toBe(1)
  })

  it('labels homepage navigation and preserves anchors', () => {
    pathnameRef.current = '/'
    render(React.createElement(SiteHeader))
    expect(screen.getByRole('navigation', { name: 'Navigasi utama' })).toBeTruthy()
    for (const href of ['#akselerasi', '#harga', '#faq', '#konsultasi']) {
      expect(document.querySelector(`a[href="${href}"]`)).not.toBeNull()
    }
  })

  it('closes homepage dropdown and mobile drawer with Escape', () => {
    pathnameRef.current = '/'
    render(React.createElement(SiteHeader))
    const dropdown = screen.getByRole('button', { name: /layanan utama/i })
    const mobile = screen.getByRole('button', { name: 'Toggle Menu' })
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

  it.each([DigitalMarketingPage, VideoEditingPage])('uses only the shared footer for %s', (Page) => {
    render(React.createElement(React.Fragment, null,
      React.createElement(Page),
      React.createElement(SiteFooter),
    ))
    expect(document.querySelectorAll('footer').length).toBe(1)
  })

  it('renders the interior-page capsule nav on non-home routes', () => {
    pathnameRef.current = '/blog'
    render(React.createElement(SiteHeader))

    // Interior nav has an explicit top-level "Beranda" link, no dropdown trigger.
    expect(screen.getByRole('link', { name: 'Beranda' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /layanan utama/i })).toBeNull()
    expect(document.querySelectorAll('header').length).toBe(1)
  })
})
