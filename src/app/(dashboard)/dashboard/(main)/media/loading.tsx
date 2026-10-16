import React from 'react'

export default function MediaLoading() {
  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-40 bg-muted rounded-md" />
        <div className="h-4 w-72 bg-muted/60 rounded-md" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="h-6 w-36 bg-muted rounded mb-2" />
        <div className="h-4 w-64 bg-muted/50 rounded mb-4" />
        <div className="h-28 w-full border-2 border-dashed border-muted rounded-xl bg-muted/20" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="h-6 w-40 bg-muted rounded mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-muted/40" />
          ))}
        </div>
      </div>
    </main>
  )
}
