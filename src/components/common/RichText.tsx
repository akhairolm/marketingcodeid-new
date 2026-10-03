import React from 'react'
import { RichText as LexicalRichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { headingId, nodeText } from '@/lib/content/lexical'
import type { RichTextData } from '@/lib/content/types'
import { cn } from '@/lib/utils'

/**
 * Renders Payload Lexical JSON as semantic HTML (TASKS 4.5).
 * Headings receive stable ids so the table of contents can link to them.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag
    const id = headingId(nodeText(node as never))
    return (
      <Tag id={id} className="scroll-mt-28">
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },
})

export function RichText({ data, className }: { data?: RichTextData | null; className?: string }) {
  if (!data?.root) return null
  return (
    <LexicalRichText
      data={data as React.ComponentProps<typeof LexicalRichText>['data']}
      converters={converters}
      className={cn('prose-article', className)}
    />
  )
}
