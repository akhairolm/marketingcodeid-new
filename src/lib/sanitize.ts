import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes editor/markdown HTML for safe public rendering.
 * Strips script/style/event handlers/javascript: URLs; allows semantic
 * markup produced by Tiptap and marked (headings, lists, media, tables).
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true, svg: false, svgFilters: false, mathMl: false },
    FORBID_TAGS: ['style', 'form', 'input', 'iframe'],
    FORBID_ATTR: ['style'],
    ADD_ATTR: ['loading', 'decoding', 'title', 'target', 'rel'],
  })
}
