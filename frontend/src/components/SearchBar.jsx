import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const slug = query.trim().toLowerCase().replace(/\s+/g, '-')
    if (slug) navigate(`/destination/${slug}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex max-w-lg">
      {/* From country - static for now */}
      <div className="flex flex-col bg-white border border-border px-4 py-3 w-36 border-r-0 shrink-0">
        <span className="text-[9px] font-bold tracking-widest uppercase text-muted mb-1">From</span>
        <span className="text-sm font-semibold text-ink">🇮🇳 India</span>
      </div>

      {/* Arrow divider */}
      <div className="flex items-center bg-white border-t border-b border-border px-2 text-accent text-lg shrink-0">
        →
      </div>

      {/* Destination input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Where are you going?"
          className="w-full border border-border border-l-0 bg-white px-4 py-3.5 font-sans text-sm font-medium text-ink placeholder-[#bbb] outline-none focus:border-accent pr-14"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full w-12 bg-accent flex items-center justify-center hover:bg-[#c44010] transition-colors"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
    </form>
  )
}
