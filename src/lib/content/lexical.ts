import { slugify } from '@/lib/slugify'
import type { RichTextData, TocHeading } from './types'

/**
 * Small helpers to (a) author Lexical JSON for the bundled sample content and
 * (b) read Lexical JSON for table-of-contents + reading-time calculations.
 */

type Node = { type: string; version: number; [k: string]: unknown }
type Inline = string | Node

const FORMAT = { bold: 1, italic: 2 } as const

const text = (value: string, format = 0): Node => ({
  type: 'text',
  text: value,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const toChildren = (parts: Inline[]): Node[] => parts.map((p) => (typeof p === 'string' ? text(p) : p))

const element = (type: string, children: Inline[], extra: Record<string, unknown> = {}): Node => ({
  type,
  children: toChildren(children),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

export const lx = {
  b: (value: string) => text(value, FORMAT.bold),
  i: (value: string) => text(value, FORMAT.italic),
  p: (...parts: Inline[]) => element('paragraph', parts, { textFormat: 0, textStyle: '' }),
  h2: (value: string) => element('heading', [value], { tag: 'h2' }),
  h3: (value: string) => element('heading', [value], { tag: 'h3' }),
  quote: (...parts: Inline[]) => element('quote', parts),
  link: (url: string, label: string) =>
    element('link', [label], { fields: { url, newTab: true, linkType: 'custom' } }),
  ul: (...items: Inline[][]) =>
    element(
      'list',
      items.map((parts, idx) => element('listitem', parts, { value: idx + 1 })),
      { listType: 'bullet', tag: 'ul', start: 1 },
    ),
  ol: (...items: Inline[][]) =>
    element(
      'list',
      items.map((parts, idx) => element('listitem', parts, { value: idx + 1 })),
      { listType: 'number', tag: 'ol', start: 1 },
    ),
  doc: (...children: Node[]): RichTextData => ({
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }),
}

/* ------------------------------------------------------------------ */
/* Readers                                                             */
/* ------------------------------------------------------------------ */

type AnyNode = { type?: string; text?: string; tag?: string; children?: AnyNode[] }

export function nodeText(node: AnyNode): string {
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('')
  return ''
}

/** Stable anchor id for a heading, shared by the TOC and the renderer. */
export function headingId(value: string): string {
  return slugify(value) || 'bagian'
}

export function extractHeadings(data?: RichTextData | null): TocHeading[] {
  const children = (data?.root?.children ?? []) as AnyNode[]
  return children
    .filter((n) => n.type === 'heading' && (n.tag === 'h2' || n.tag === 'h3'))
    .map((n) => {
      const value = nodeText(n)
      return { id: headingId(value), text: value, level: n.tag === 'h3' ? 3 : 2 } as TocHeading
    })
    .filter((h) => h.text.trim().length > 0)
}

/** ~200 words per minute — a common estimate for Bahasa Indonesia prose. */
export function readingMinutes(data?: RichTextData | null): number {
  const root = data?.root as AnyNode | undefined
  if (!root) return 1
  const words = nodeText(root).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
