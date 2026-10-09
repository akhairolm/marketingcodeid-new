import { describe, it, expect } from 'vitest'
import { renderMarkdown, extractHeadings, readingMinutes } from '@/lib/content/markdown'

describe('markdown', () => {
  it('renders headings with stable anchor ids', () => {
    const html = renderMarkdown('## Tentang Kami\n\nKonten.')
    expect(html).toContain('<h2 id="tentang-kami"')
    expect(html).toContain('Tentang Kami')
  })

  it('renders bold, italic, lists, and blockquotes', () => {
    const html = renderMarkdown('**tebal** dan *miring*\n\n- satu\n- dua\n\n> kutipan')
    expect(html).toContain('<strong>tebal</strong>')
    expect(html).toContain('<em>miring</em>')
    expect(html).toContain('<li>satu</li>')
    expect(html).toContain('<blockquote>')
  })

  it('returns empty string for null/undefined', () => {
    expect(renderMarkdown(null)).toBe('')
    expect(renderMarkdown(undefined)).toBe('')
  })

  it('extracts h2 and h3 headings for TOC', () => {
    const md = '# Judul\n\n## Bagian Satu\n\nisi\n\n### Sub Bagian\n\nisi\n\n## Bagian Dua'
    expect(extractHeadings(md)).toEqual([
      { id: 'bagian-satu', text: 'Bagian Satu', level: 2 },
      { id: 'sub-bagian', text: 'Sub Bagian', level: 3 },
      { id: 'bagian-dua', text: 'Bagian Dua', level: 2 },
    ])
  })

  it('ignores headings inside code fences', () => {
    const md = '```\n## bukan heading\n```\n\n## Heading Nyata'
    expect(extractHeadings(md)).toEqual([{ id: 'heading-nyata', text: 'Heading Nyata', level: 2 }])
  })

  it('estimates reading minutes at ~200 wpm', () => {
    const words = Array.from({ length: 400 }, (_, i) => `kata${i}`).join(' ')
    expect(readingMinutes(words)).toBe(2)
    expect(readingMinutes('')).toBe(1)
  })
})
