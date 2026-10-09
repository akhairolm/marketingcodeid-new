import { marked } from 'marked'
import { slugify } from '@/lib/slugify'
import type { TocHeading } from './types'

/**
 * Markdown helpers: render to HTML (with heading anchors shared by the TOC)
 * plus TOC extraction and reading-time estimation.
 */

const renderer = new marked.Renderer()

renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens)
  const id = slugify(text.replace(/<[^>]+>/g, '')) || 'bagian'
  return `<h${depth} id="${id}" class="scroll-mt-28">${text}</h${depth}>\n`
}

marked.use({ renderer, gfm: true, breaks: false })

export function renderMarkdown(markdown?: string | null): string {
  if (!markdown) return ''
  return marked.parse(markdown, { async: false })
}

export function extractHeadings(markdown?: string | null): TocHeading[] {
  if (!markdown) return []
  const headings: TocHeading[] = []
  let insideFence = false

  for (const line of markdown.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      insideFence = !insideFence
      continue
    }
    if (insideFence) continue
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    const text = match[2].replace(/[#*`_~]/g, '').trim()
    if (!text) continue
    headings.push({
      id: slugify(text) || 'bagian',
      text,
      level: match[1].length === 3 ? 3 : 2,
    })
  }
  return headings
}

/** ~200 words per minute — a common estimate for Bahasa Indonesia prose. */
export function readingMinutes(markdown?: string | null): number {
  if (!markdown) return 1
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~`|-]/g, ' ')
  const words = plain.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
