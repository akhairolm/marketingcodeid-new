import React from 'react'

export default function ArticlesLoading() {
  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-52 bg-muted rounded-md" />
          <div className="h-4 w-80 bg-muted/60 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-muted rounded-lg" />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="h-9 w-full sm:w-72 bg-muted rounded-lg" />
          <div className="h-9 w-full sm:w-36 bg-muted rounded-lg" />
        </div>

        <div className="p-4 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 w-full bg-muted/40 rounded-xl flex items-center px-4 gap-4">
              <div className="h-10 w-16 bg-muted/70 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-1/2 bg-muted/70 rounded" />
                <div className="h-3 w-1/4 bg-muted/50 rounded" />
              </div>
              <div className="h-6 w-24 bg-muted/60 rounded-full hidden sm:block" />
              <div className="h-6 w-16 bg-muted/60 rounded-full" />
              <div className="h-8 w-8 bg-muted/60 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
