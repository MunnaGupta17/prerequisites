import { useState, useEffect } from 'react'
import { getDestinations, getDestination, getTips } from '../services/api'

// ── All destinations (for homepage grid) ──
export function useDestinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)

  useEffect(() => {
    getDestinations()
      .then(res => setDestinations(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { destinations, loading, error }
}

// ── Single destination by slug ──
export function useDestination(slug) {
  const [destination, setDestination] = useState(null)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getDestination(slug)
      .then(res => setDestination(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  return { destination, loading, error }
}

// ── Tips for a destination, with filter support ──
export function useTips(slug, filters = {}) {
  const [tips, setTips]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getTips(slug, filters)
      .then(res => setTips(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, filters.category, filters.travellerType, filters.sort])

  return { tips, loading, error }
}
