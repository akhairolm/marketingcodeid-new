import React from 'react'
import { renderMarkdown } from '@/lib/content/markdown'
import { sanitizeHtml } from '@/lib/sanitize'
import { cn } from '@/lib/utils'

/**
 * Renders editor content as HTML.
 * Tiptap output is already HTML; legacy markdown content (starting without
 * a tag) is rendered through the markdown pipeline for backward compat.
 * All output is sanitized before injection.
 */
export function RichText({ data, className }: { data?: string | null; className?: string }) {
  if (!data?.trim()) return null

  const isHtml = /^\s*</.test(data)
  const html = sanitizeHtml(isHtml ? data : renderMarkdown(data))

  return (
    <div
      className={cn('prose-article', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
