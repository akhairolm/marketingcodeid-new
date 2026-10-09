import React from 'react'
import { PortfolioForm } from '../PortfolioForm'

export const dynamic = 'force-dynamic'

export default function NewPortfolioPage() {
  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-tight">Tambah Portofolio Baru</h2>
        <p className="text-sm text-muted-foreground">
          Isi detail studi kasus lalu simpan sebagai draft atau publikasikan
        </p>
      </div>
      <PortfolioForm />
    </main>
  )
}
