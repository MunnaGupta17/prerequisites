import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const slug = query.trim().toLowerCase().replace(/\s+/g, '-')
    if (slug) navigate(`/destination/${slug}`)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 md:px-14 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-black tracking-tight text-ink">
          Prerequisites
          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
        </Link>

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {[['Destinations', '/'], ['Scam Alerts', '/?tab=scam'], ['Community', '/']].map(([label, href]) => (
            <li key={label}>
              <Link to={href} className="text-sm font-medium text-muted hover:text-ink transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Share button */}
        <Link
          to="/submit"
          className="bg-ink text-paper text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-accent transition-colors"
        >
          Share Experience
        </Link>
      </div>
    </nav>
  )
}
