import { useState } from 'react'
import { voteTip } from '../services/api'

const CATEGORY_STYLES = {
  SCAM:          { label: '⚠ Scam',          bg: 'bg-red-50',    badge: 'bg-red-100 text-red-700',    border: 'border-l-4 border-l-red-500'  },
  VISA:          { label: 'Visa & Entry',     bg: 'bg-blue-50',   badge: 'bg-blue-100 text-blue-700',  border: 'border-l-4 border-l-blue-500' },
  MONEY:         { label: 'Money',            bg: 'bg-amber-50',  badge: 'bg-amber-100 text-amber-700',border: '' },
  TRANSPORT:     { label: 'Transport',        bg: '',             badge: 'bg-purple-100 text-purple-700', border: '' },
  FOOD:          { label: 'Food & Drinks',    bg: '',             badge: 'bg-orange-100 text-orange-700', border: '' },
  CULTURE:       { label: 'Culture',          bg: '',             badge: 'bg-cyan-100 text-cyan-700',  border: '' },
  PACKING:       { label: 'Packing',          bg: '',             badge: 'bg-green-100 text-green-700',border: '' },
  ACCOMMODATION: { label: 'Accommodation',    bg: '',             badge: 'bg-teal-100 text-teal-700',  border: '' },
  GENERAL:       { label: '✓ Pro Tip',        bg: 'bg-green-50',  badge: 'bg-green-100 text-green-700',border: 'border-l-4 border-l-green-500'},
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 30)  return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

function initials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function TipCard({ tip }) {
  const [voteCount, setVoteCount]   = useState(tip.voteCount ?? 0)
  const [userVote,  setUserVote]    = useState(null) // null | 'up' | 'down'
  const [loading,   setLoading]     = useState(false)

  const style = CATEGORY_STYLES[tip.category] || CATEGORY_STYLES.GENERAL

  async function handleVote(direction) {
    if (loading) return
    setLoading(true)
    try {
      const val = direction === 'up' ? 1 : -1
      const res = await voteTip(tip.id, val)

      if (res.data.action === 'removed') {
        setVoteCount(c => c - val)
        setUserVote(null)
      } else {
        // If switching votes, undo the old one first
        if (userVote && userVote !== direction) {
          setVoteCount(c => c - (userVote === 'up' ? 1 : -1))
        }
        setVoteCount(c => c + val)
        setUserVote(direction)
      }
    } catch (e) {
      console.error('Vote failed', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className={`bg-white border border-border p-6 mb-4 transition-shadow hover:shadow-md ${style.border} ${style.bg}`}>
      {/* Header: badges + vote buttons */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <span className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm ${style.badge}`}>
            {style.label}
          </span>
        </div>

        {/* Vote */}
        <div className="flex flex-col items-center gap-1 ml-4 shrink-0">
          <button
            onClick={() => handleVote('up')}
            disabled={loading}
            className={`w-7 h-6 border text-xs flex items-center justify-center transition-colors
              ${userVote === 'up' ? 'bg-ink text-paper border-ink' : 'border-border text-muted hover:border-ink hover:text-ink'}`}
          >▲</button>
          <span className="font-mono text-sm font-semibold text-ink">{voteCount}</span>
          <button
            onClick={() => handleVote('down')}
            disabled={loading}
            className={`w-7 h-6 border text-xs flex items-center justify-center transition-colors
              ${userVote === 'down' ? 'bg-ink text-paper border-ink' : 'border-border text-muted hover:border-ink hover:text-ink'}`}
          >▼</button>
        </div>
      </div>

      {/* Tip text */}
      <p className="text-[15px] leading-relaxed text-ink mb-4">{tip.text}</p>

      {/* Footer: author + date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center text-[11px] font-bold text-paper shrink-0">
            {initials(tip.authorName)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-ink">{tip.authorName || 'Anonymous'}</span>
            <span className="text-[11px] text-muted">
              {tip.authorFrom ? `🇮🇳 ${tip.authorFrom}` : ''}
              {tip.travellerType ? ` · ${tip.travellerType.charAt(0) + tip.travellerType.slice(1).toLowerCase()}` : ''}
            </span>
          </div>
        </div>
        <span className="font-mono text-[11px] text-muted">{timeAgo(tip.createdAt)}</span>
      </div>
    </article>
  )
}
