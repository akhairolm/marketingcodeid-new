import { marked } from 'marked'
import { slugify } from '@/lib/slugify'
import type { TocHeading } from './types'

/**
 * Content utilities: render legacy markdown to HTML (with heading anchors
 * shared by the TOC), plus TOC extraction and reading-time estimation.
 * Both HTML (Tiptap output) and markdown (legacy content) are supported.
 */

const renderer = new marked.Renderer()

renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens)
  const id = slugify(text.replace(/<[^>]+>/g, '')) || 'bagian'
  return `<h${depth} id="${id}" class="scroll-mt-28">${text}</h${depth}>\n`
}

renderer.table = function ({ header, rows }) {
  const head = `<tr>${header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join('')}</tr>`
  const body = rows
    .map((row) => `<tr>${row.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join('')}</tr>`)
    .join('')
  return `<div class="table-wrap"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>\n`
}

renderer.image = function ({ href, title, text }) {
  const cleanTitle = title || text || 'Gambar artikel'
  return `<figure class="my-6"><img src="${href}" alt="${text || cleanTitle}" title="${cleanTitle}" loading="lazy" decoding="async" class="rounded-2xl border border-neutral-200/80 w-full h-auto" />${text ? `<figcaption class="mt-2 text-center text-xs text-neutral-500">${text}</figcaption>` : ''}</figure>\n`
}

marked.use({ renderer, gfm: true, breaks: false })

/** Ensures all <img> tags in HTML articles have loading="lazy", decoding="async", and title attributes */
export function enhanceArticleImages(html: string): string {
  if (!html) return ''
  return html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    let newAttrs = attrs
    const altMatch = /alt=["']([^"']*)["']/i.exec(attrs)
    const altText = altMatch ? altMatch[1] : ''

    if (!/title=["']/i.test(newAttrs) && altText) {
      newAttrs += ` title="${altText}"`
    }
    if (!/loading=["']/i.test(newAttrs)) {
      newAttrs += ' loading="lazy"'
    }
    if (!/decoding=["']/i.test(newAttrs)) {
      newAttrs += ' decoding="async"'
    }
    return `<img${newAttrs}>`
  })
}

/** Ensures <h2> and <h3> tags have anchor id and scroll-mt-28 class for TOC tracking and navigation */
export function enhanceArticleHeadings(html: string): string {
  if (!html) return ''
  return html.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim()
    const idMatch = /id=["']([^"']*)["']/i.exec(attrs)
    const id = idMatch ? idMatch[1] : (slugify(text) || 'bagian')

    let newAttrs = attrs
    if (!idMatch) {
      newAttrs = ` id="${id}"${newAttrs}`
    }
    if (!/class=["']/i.test(newAttrs)) {
      newAttrs = ` class="scroll-mt-28"${newAttrs}`
    } else if (!/scroll-mt/i.test(newAttrs)) {
      newAttrs = newAttrs.replace(/class=["']([^"']*)["']/i, 'class="$1 scroll-mt-28"')
    }
    return `<h${level}${newAttrs}>${content}</h${level}>`
  })
}

export function renderMarkdown(markdown?: string | null): string {
  if (!markdown) return ''
  return marked.parse(markdown, { async: false })
}

export function isHtmlContent(content?: string | null): boolean {
  return Boolean(content?.trim().startsWith('<'))
}

export function extractHeadings(content?: string | null): TocHeading[] {
  if (!content) return []

  if (isHtmlContent(content)) {
    const headings: TocHeading[] = []
    const re = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi
    let match: RegExpExecArray | null
    while ((match = re.exec(content)) !== null) {
      const text = match[2].replace(/<[^>]+>/g, '').trim()
      if (!text) continue
      headings.push({
        id: slugify(text) || 'bagian',
        text,
        level: Number(match[1]) === 3 ? 3 : 2,
      })
    }
    return headings
  }

  const headings: TocHeading[] = []
  let insideFence = false

  for (const line of content.split('\n')) {
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
export function readingMinutes(content?: string | null): number {
  if (!content) return 1
  let plain: string

  if (isHtmlContent(content)) {
    plain = content
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  } else {
    plain = content
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[#>*_~`|-]/g, ' ')
  }

  const words = plain.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
