import React from 'react'
import { renderMarkdown } from '@/lib/content/markdown'
import { cn } from '@/lib/utils'

/**
 * Renders Markdown content as HTML (server-side).
 * Headings receive stable ids so the table of contents can link to them.
 */
export function RichText({ data, className }: { data?: string | null; className?: string }) {
  if (!data) return null
  return (
    <div
      className={cn('prose-article', className)}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(data) }}
    />
  )
}
