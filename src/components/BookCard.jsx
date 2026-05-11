import React from 'react'
import StarRating from './StarRating'

export default function BookCard({ book, index }) {
  var cover = book.cover_i
    ? 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'
    : null
  var year = book.first_publish_year
  var author = (book.author_name && book.author_name[0]) || 'Unknown Author'
  var rating = book.ratings_average ? parseFloat(book.ratings_average.toFixed(1)) : null

  return (
    <div
      className="group relative bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:bg-slate-800/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/30"
      style={{ animationDelay: index * 40 + 'ms' }}
    >
      {/* Cover */}
      <div className="relative h-52 bg-slate-900 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={function (e) { e.target.style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-800 to-slate-900">
            <svg className="w-10 h-10 text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-slate-500 text-xs text-center font-mono leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
              {book.title}
            </p>
          </div>
        )}
        {year && (
          <span className="absolute top-2 right-2 bg-slate-900/80 text-cyan-400 text-xs font-mono px-2 py-0.5 rounded-full border border-cyan-800/40">
            {year}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3
          className="text-white font-semibold text-sm leading-snug group-hover:text-cyan-300 transition-colors overflow-hidden"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {book.title}
        </h3>
        <p className="text-slate-400 text-xs font-mono truncate">{author}</p>

        <div className="flex items-center justify-between mt-1">
          {rating ? (
            <div className="flex items-center gap-1.5">
              <StarRating rating={rating} />
              <span className="text-amber-400 text-xs font-mono">{rating}</span>
            </div>
          ) : (
            <span className="text-slate-600 text-xs italic">No rating</span>
          )}
        </div>

        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {book.subject.slice(0, 3).map(function (s, i) {
              return (
                <span key={i} className="text-xs bg-slate-700/60 text-slate-400 px-2 py-0.5 rounded-full truncate" style={{ maxWidth: '90px' }}>
                  {s}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
