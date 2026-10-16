import React from 'react'

export default function DashboardLoading() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-muted rounded-md" />
          <div className="h-4 w-72 bg-muted/60 rounded-md" />
        </div>
        <div className="h-9 w-32 bg-muted rounded-md" />
      </div>

      <div className="rounded-xl border border-border bg-card p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="h-9 w-64 bg-muted rounded-lg" />
          <div className="h-9 w-28 bg-muted rounded-lg" />
        </div>
        <div className="space-y-3 pt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-full bg-muted/40 rounded-lg flex items-center px-4 gap-4">
              <div className="h-4 w-1/4 bg-muted/70 rounded" />
              <div className="h-4 w-1/6 bg-muted/50 rounded" />
              <div className="h-4 w-1/6 bg-muted/50 rounded" />
              <div className="h-4 w-1/12 ml-auto bg-muted/60 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
