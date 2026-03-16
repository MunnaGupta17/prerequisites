// Navbar.jsx — Full implementation comes in Step 4 (Frontend build)
// For now this is a working placeholder so the app boots without errors

import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-14 py-4 border-b border-border bg-paper/90 backdrop-blur-md">
      <Link to="/" className="font-serif text-xl font-black tracking-tight flex items-center gap-2">
        Prerequisites
        <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
      </Link>
      <Link
        to="/submit"
        className="bg-ink text-paper text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-accent transition-colors"
      >
        Share Experience
      </Link>
    </nav>
  )
}
