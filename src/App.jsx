import React, { useState } from 'react'
import BookCard from './components/BookCard'
import Skeleton from './components/Skeleton'
import Pagination from './components/Pagination'
import useBooks from './hooks/useBooks'
import { SUBJECTS, SORT_OPTIONS, RATINGS, PER_PAGE } from './constants'

export default function App() {
  var [subject, setSubject] = useState('fantasy')
  var [search, setSearch] = useState('')
  var [searchInput, setSearchInput] = useState('')
  var [sortBy, setSortBy] = useState('relevance')
  var [minRating, setMinRating] = useState('All')
  var [page, setPage] = useState(1)

  var result = useBooks({ subject: subject, search: search, sortBy: sortBy, minRating: minRating, page: page })
  var books = result.books
  var loading = result.loading
  var error = result.error
  var totalFound = result.totalFound
  var refetch = result.refetch

  var totalPages = Math.ceil(totalFound / PER_PAGE)

  function handleSearch(e) {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  function handleSubject(s) {
    setSubject(s)
    setSearch('')
    setSearchInput('')
    setPage(1)
  }

  function handlePageChange(p) {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Ambient glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: -160, left: -160, width: 384, height: 384, background: 'rgba(8,47,73,0.4)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '33%', right: -80, width: 320, height: 320, background: 'rgba(46,16,101,0.3)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Header ── */}
        <header className="border-b border-slate-800 sticky top-0 z-20" style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
              <div
                className="flex items-center justify-center"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#06b6d4,#7c3aed)' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-white" style={{ letterSpacing: '-0.3px' }}>BookVault</div>
                <div className="text-slate-500" style={{ fontSize: 11, fontFamily: 'monospace' }}>Open Library API</div>
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2" style={{ flex: 1, maxWidth: 460 }}>
              <div className="relative" style={{ flex: 1 }}>
                <svg
                  className="absolute text-slate-500"
                  style={{ left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16 }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchInput}
                  onChange={function (e) { setSearchInput(e.target.value) }}
                  placeholder="Search books, authors…"
                  className="w-full text-white text-sm focus:outline-none"
                  style={{
                    paddingLeft: 34, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10
                  }}
                />
              </div>
              <button
                type="submit"
                className="text-white text-sm font-semibold"
                style={{ padding: '8px 16px', background: '#0891b2', border: 'none', borderRadius: 10, cursor: 'pointer', flexShrink: 0 }}
              >
                Search
              </button>
            </form>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="max-w-7xl mx-auto px-4 py-8">

          {/* Genre pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {SUBJECTS.map(function (s) {
              var isActive = s === subject && !search
              return (
                <button
                  key={s}
                  onClick={function () { handleSubject(s) }}
                  className="text-sm font-medium transition-all"
                  style={{
                    padding: '6px 14px', borderRadius: 20, textTransform: 'capitalize', cursor: 'pointer',
                    background: isActive ? '#0891b2' : 'rgba(255,255,255,0.04)',
                    color: isActive ? 'white' : '#94a3b8',
                    border: isActive ? '1px solid #0891b2' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isActive ? '0 2px 12px rgba(8,145,178,0.4)' : 'none',
                  }}
                >
                  {s.replace('_', ' ')}
                </button>
              )
            })}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6 items-center">
            <span className="text-slate-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filters
            </span>

            <select
              value={sortBy}
              onChange={function (e) { setSortBy(e.target.value); setPage(1) }}
              className="text-slate-300 text-sm focus:outline-none cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 10px' }}
            >
              {SORT_OPTIONS.map(function (o) {
                return <option key={o.value} value={o.value}>{o.label}</option>
              })}
            </select>

            <div className="flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 3 }}>
              {RATINGS.map(function (r) {
                return (
                  <button
                    key={r}
                    onClick={function () { setMinRating(r); setPage(1) }}
                    style={{
                      padding: '4px 10px', border: 'none', borderRadius: 6, cursor: 'pointer',
                      fontFamily: 'monospace', fontSize: 11, transition: 'all .2s',
                      background: minRating === r ? '#f59e0b' : 'transparent',
                      color: minRating === r ? '#1c1004' : '#64748b',
                      fontWeight: minRating === r ? 700 : 400,
                    }}
                  >
                    {r === 'All' ? 'All Stars' : '★ ' + r + '+'}
                  </button>
                )
              })}
            </div>

            <span className="text-slate-500 text-xs ml-auto" style={{ fontFamily: 'monospace' }}>
              {totalFound > 0 ? totalFound.toLocaleString() + ' books found' : ''}
            </span>
          </div>

          {/* Search banner */}
          {search && (
            <div className="mb-6 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <svg className="text-cyan-400" style={{ width: 14, height: 14, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-slate-300 text-sm">
                Results for <span className="text-cyan-400 font-semibold">"{search}"</span>
              </span>
              <button
                onClick={function () { setSearch(''); setSearchInput(''); setPage(1) }}
                className="text-slate-500 text-xs flex items-center gap-1 ml-auto"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="text-white text-sm"
                style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, cursor: 'pointer' }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Grid */}
          {!error && (
            <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
              {loading
                ? Array.from({ length: PER_PAGE }).map(function (_, i) { return <Skeleton key={i} /> })
                : books.map(function (book, i) { return <BookCard key={book.key || i} book={book} index={i} /> })
              }
            </div>
          )}

          {/* Empty */}
          {!loading && !error && books.length === 0 && (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,255,255,0.04)' }}>
                <svg className="text-slate-600" style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-400">No books found. Try a different filter or search term.</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && (
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 py-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-slate-600 text-xs" style={{ fontFamily: 'monospace' }}>
            BookVault · Data from{' '}
            <a href="https://openlibrary.org" target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-400 transition-colors">
              Open Library API
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
