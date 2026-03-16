import axios from 'axios'

// In dev: Vite proxies /api → http://localhost:5000
// In prod: set VITE_API_URL in your .env
const BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({ baseURL: BASE })

// ── Destinations ──
export const getDestinations = ()             => api.get('/destinations')
export const getDestination  = (slug)         => api.get(`/destinations/${slug}`)

// ── Tips ──
export const getTips  = (slug, params = {})   => api.get(`/destinations/${slug}/tips`, { params })
export const createTip = (data)               => api.post('/tips', data)

// ── Votes ──
export const voteTip  = (tipId, direction)    => api.post(`/tips/${tipId}/vote`, { direction })
