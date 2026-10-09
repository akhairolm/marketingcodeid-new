import React from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { PortfolioForm } from '../PortfolioForm'

export const dynamic = 'force-dynamic'

export default function NewPortfolioPage() {
  return (
    <>
      <DashboardHeader title="Tambah Portofolio Baru" subtitle="Isi detail studi kasus lalu simpan sebagai draft atau publikasikan" />
      <main className="p-8 max-w-7xl w-full mx-auto">
        <PortfolioForm />
      </main>
    </>
  )
}
