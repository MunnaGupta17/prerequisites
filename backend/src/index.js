import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import destinationRoutes from './routes/destinations.js'
import tipRoutes from './routes/tips.js'

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

app.use(express.json())

// Rate limit: max 100 requests per 15 minutes per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, slow down.' }
}))

// ── Routes ──
app.use('/api/destinations', destinationRoutes)
app.use('/api/tips',         tipRoutes)

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Prerequisites API is running 🌍' })
})

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong on our end.' })
})

app.listen(PORT, () => {
  console.log(`✅  Prerequisites API running on http://localhost:${PORT}`)
})
