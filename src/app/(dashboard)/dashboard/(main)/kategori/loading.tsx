import React from 'react'

export default function KategoriLoading() {
  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-muted rounded-md" />
        <div className="h-4 w-72 bg-muted/60 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 h-64 shadow-sm" />
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 space-y-3 shadow-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 w-full bg-muted/40 rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  )
}
