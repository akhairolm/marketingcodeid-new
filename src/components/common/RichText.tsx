import { renderMarkdown, enhanceArticleImages } from '@/lib/content/markdown'
import { sanitizeHtml } from '@/lib/sanitize'
import { cn } from '@/lib/utils'

/**
 * Renders editor content as HTML.
 * Tiptap output is already HTML; legacy markdown content (starting without
 * a tag) is rendered through the markdown pipeline for backward compat.
 * All output is sanitized and image attributes enhanced for SEO before injection.
 */
export function RichText({ data, className }: { data?: string | null; className?: string }) {
  if (!data?.trim()) return null

  const isHtml = /^\s*</.test(data)
  const rendered = isHtml ? data : renderMarkdown(data)
  const html = sanitizeHtml(enhanceArticleImages(rendered))

  return (
    <div
      className={cn('prose-article', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
