import React from 'react'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  var pages = []
  if (totalPages <= 5) {
    for (var i = 1; i <= totalPages; i++) pages.push(i)
  } else if (page <= 3) {
    pages = [1, 2, 3, 4, 5]
  } else if (page >= totalPages - 2) {
    pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  } else {
    pages = [page - 2, page - 1, page, page + 1, page + 2]
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={function () { onPageChange(page - 1) }}
        disabled={page === 1}
        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 disabled:opacity-40 hover:border-cyan-600 hover:text-white transition-all"
      >
        ← Prev
      </button>

      <div className="flex gap-1">
        {pages.map(function (p) {
          return (
            <button
              key={p}
              onClick={function () { onPageChange(p) }}
              className={
                'w-9 h-9 rounded-lg text-sm font-mono transition-all ' +
                (p === page
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-cyan-600 hover:text-white')
              }
            >
              {p}
            </button>
          )
        })}
      </div>

      <button
        onClick={function () { onPageChange(page + 1) }}
        disabled={page === totalPages}
        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 disabled:opacity-40 hover:border-cyan-600 hover:text-white transition-all"
      >
        Next →
      </button>
    </div>
  )
}
