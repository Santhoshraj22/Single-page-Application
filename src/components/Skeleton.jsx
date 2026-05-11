import React from 'react'

export default function Skeleton() {
  return (
    <div className="bg-slate-800/40 border border-slate-700/30 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-700/40" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-slate-700/40 rounded w-3/4" />
        <div className="h-3 bg-slate-700/30 rounded w-1/2" />
        <div className="h-3 bg-slate-700/20 rounded w-1/3" />
      </div>
    </div>
  )
}
