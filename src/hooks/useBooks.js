import { useState, useEffect, useCallback } from 'react'
import { PER_PAGE } from '../constants'

export default function useBooks({ subject, search, sortBy, minRating, page }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalFound, setTotalFound] = useState(0)

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const offset = (page - 1) * PER_PAGE
      let works = []
      let total = 0

      if (search.trim()) {
        const url =
          'https://openlibrary.org/search.json?q=' +
          encodeURIComponent(search) +
          '&limit=' + PER_PAGE +
          '&offset=' + offset +
          '&fields=key,title,author_name,cover_i,first_publish_year,ratings_average,subject,language'
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        works = data.docs || []
        total = data.numFound || 0
      } else {
        const url =
          'https://openlibrary.org/subjects/' + subject + '.json?limit=' + PER_PAGE + '&offset=' + offset
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        works = (data.works || []).map(function (w) {
          return {
            key: w.key,
            title: w.title,
            author_name: w.authors ? w.authors.map(function (a) { return a.name }) : [],
            cover_i: w.cover_id,
            first_publish_year: w.first_publish_year,
            ratings_average: w.ratings_average,
            subject: w.subject,
            language: [],
          }
        })
        total = data.work_count || 0
      }

      // Sorting
      if (sortBy === 'title_asc') works.sort(function (a, b) { return a.title.localeCompare(b.title) })
      if (sortBy === 'title_desc') works.sort(function (a, b) { return b.title.localeCompare(a.title) })
      if (sortBy === 'new') works.sort(function (a, b) { return (b.first_publish_year || 0) - (a.first_publish_year || 0) })
      if (sortBy === 'old') works.sort(function (a, b) { return (a.first_publish_year || 9999) - (b.first_publish_year || 9999) })

      // Rating filter
      if (minRating !== 'All') {
        var min = parseFloat(minRating)
        works = works.filter(function (b) { return b.ratings_average && b.ratings_average >= min })
      }

      setBooks(works)
      setTotalFound(total)
    } catch (e) {
      setError("Couldn't load books. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [subject, search, sortBy, minRating, page])

  useEffect(function () {
    fetchBooks()
  }, [fetchBooks])

  return { books, loading, error, totalFound, refetch: fetchBooks }
}
