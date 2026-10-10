'use client'

import React, { useEffect } from 'react'
import { EditorContent, useEditor, type Editor } from '@tiptap/react'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { Image } from '@tiptap/extension-image'
import { StarterKit } from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Link2Off,
  ImagePlus,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TiptapEditorProps {
  /** Initial HTML content */
  content?: string
  /** Called with editor.getHTML() on every change */
  onChange?: (html: string) => void
  placeholder?: string
  className?: string
  /** Upload handler for images; omit to hide image button */
  onUploadImage?: (file: File) => Promise<string>
}

function ToolbarButton({
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
        'hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none',
        active && 'bg-accent text-accent-foreground',
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

function Divider() {
  return <span className="mx-0.5 h-5 w-px bg-border" aria-hidden="true" />
}

export function TiptapEditor({
  content = '',
  onChange,
  placeholder = 'Tulis konten di sini...',
  className,
  onUploadImage,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: false }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'tiptap-content min-h-[240px] px-4 py-3 focus:outline-none prose-article',
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    immediatelyRender: false,
  })

  // Cleanup: destroy editor on unmount to avoid leftover ProseMirror state
  useEffect(() => () => editor?.destroy(), [editor])

  if (!editor) {
    return <div className={cn('h-[240px] animate-pulse rounded-lg bg-secondary/60', className)} />
  }

  const addImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg,image/png,image/webp,image/gif'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file || !onUploadImage) return
      try {
        const url = await onUploadImage(file)
        editor.chain().focus().setImage({ src: url }).run()
      } catch {
        // upload errors surface via toast in the calling form
      }
    }
    input.click()
  }

  const setLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL link (kosongkan untuk menghapus):', previous ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
  }

  const isLinkActive = editor.isActive('link')

  return (
    <div className={cn('overflow-hidden rounded-lg border border-input bg-card', className)}>
      <div
        className="flex flex-wrap items-center gap-0.5 border-b border-border bg-secondary/50 px-2 py-1.5 sticky top-0 z-10"
        role="toolbar"
        aria-label="Format teks"
      >
        <ToolbarButton icon={Undo2} label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} />
        <ToolbarButton icon={Redo2} label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} />
        <Divider />
        <ToolbarButton icon={Heading1} label="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
        <ToolbarButton icon={Heading2} label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolbarButton icon={Heading3} label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
        <Divider />
        <ToolbarButton icon={Bold} label="Tebal" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolbarButton icon={Italic} label="Miring" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolbarButton icon={Underline} label="Garis bawah" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <ToolbarButton icon={Strikethrough} label="Coret" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />
        <ToolbarButton icon={Code} label="Kode" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} />
        <Divider />
        <ToolbarButton icon={List} label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolbarButton icon={ListOrdered} label="Nomor" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <ToolbarButton icon={Quote} label="Kutipan" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <ToolbarButton icon={Minus} label="Garis pemisah" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
        <Divider />
        <ToolbarButton icon={AlignLeft} label="Rata kiri" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} />
        <ToolbarButton icon={AlignCenter} label="Rata tengah" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} />
        <ToolbarButton icon={AlignRight} label="Rata kanan" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} />
        <Divider />
        <ToolbarButton icon={isLinkActive ? Link2Off : Link2} label={isLinkActive ? 'Hapus link' : 'Tambah link'} active={isLinkActive} onClick={setLink} />
        {onUploadImage && (
          <ToolbarButton icon={ImagePlus} label="Tambah gambar" onClick={addImage} />
        )}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export type { Editor }
