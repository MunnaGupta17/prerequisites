import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import DestinationCard from '../components/DestinationCard'
import { useDestinations } from '../hooks/useData'

// ── Marquee destinations list ──
const MARQUEE_ITEMS = [
  'Thailand','Japan','Italy','Bali','Vietnam','France',
  'Turkey','Morocco','Sri Lanka','Greece','Singapore','Dubai',
]

// ── Static floating tip cards on hero ──
const FLOATING_TIPS = [
  {
    tag: 'scam', label: '⚠ Scam Alert',
    text: 'Tuk-tuk drivers near Grand Palace will say it\'s "closed today" — it\'s never closed. Don\'t take the detour.',
    author: 'Rahul K.', location: 'Bangkok, Thailand',
    style: 'top-[10%] right-[6%]',
  },
  {
    tag: 'tip', label: '✓ Pro Tip',
    text: 'Get a Thai SIM at the airport — AIS or DTAC both work great. ~₹600 for 30 days unlimited data.',
    author: 'Priya S.', location: 'Chiang Mai, Thailand',
    style: 'top-[42%] left-[4%]',
  },
  {
    tag: 'money', label: '₿ Money',
    text: 'Always decline dynamic currency conversion at ATMs. Always pay in Thai Baht — you lose 4–6% otherwise.',
    author: 'Arjun V.', location: 'Phuket, Thailand',
    style: 'bottom-[10%] right-[14%]',
  },
]

const TAG_STYLES = {
  scam:  'bg-red-100 text-red-700',
  tip:   'bg-green-100 text-green-700',
  money: 'bg-amber-100 text-amber-700',
}

function FloatingCard({ card }) {
  return (
    <div className={`absolute max-w-[240px] bg-white border border-border shadow-xl p-4 animate-float hidden lg:block ${card.style}`}>
      <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm mb-2.5 inline-block ${TAG_STYLES[card.tag]}`}>
        {card.label}
      </span>
      <p className="text-[13px] leading-snug text-ink mb-2.5">{card.text}</p>
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center text-[9px] font-bold text-ink">
          {card.author.split(' ').map(w => w[0]).join('')}
        </div>
        {card.author} · {card.location}
      </div>
    </div>
  )
}

export default function HomePage() {
  const { destinations, loading } = useDestinations()
  const destRef = useRef(null)

  const featured = destinations[0]
  const rest     = destinations.slice(1, 5)

  return (
    <div>
      {/* ── HERO ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] overflow-hidden">

        {/* Left */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent">
              Real wisdom. Zero guesswork.
            </span>
          </div>

          <h1 className="font-serif font-black leading-none tracking-[-3px] text-[clamp(52px,7vw,88px)] mb-3">
            Know Before<br />
            You <em className="text-accent not-italic">Go.</em>
          </h1>

          <p className="text-lg text-muted font-light leading-relaxed max-w-md mb-12">
            Tips, scam alerts, and honest advice from travellers who've already been there — so you never walk into the unknown.
          </p>

          <SearchBar />

          {/* Stats */}
          <div className="flex gap-10 mt-12">
            {[['12,400+','Traveller tips'], ['186','Destinations'], ['340+','Scam alerts']].map(([num, label]) => (
              <div key={label} className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-ink">{num}</span>
                <span className="text-xs text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating cards */}
        <div className="relative hidden lg:block overflow-hidden">
          {/* Background dot grid */}
          <div className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 60% 40%, rgba(232,82,26,0.07) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(37,99,180,0.05) 0%, transparent 50%)',
            }}
          />
          <div className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #d8d0c0 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              opacity: 0.5,
            }}
          />
          {FLOATING_TIPS.map((card, i) => (
            <FloatingCard key={i} card={card} />
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-ink border-y border-border overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-8 font-mono text-[11px] tracking-[2px] uppercase text-paper/60">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── DESTINATIONS ── */}
      <section ref={destRef} className="px-8 md:px-14 py-20">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif font-black leading-none tracking-[-1.5px] text-[clamp(32px,4vw,52px)]">
            Popular<br /><span className="text-accent italic">Destinations</span>
          </h2>
          <Link to="/" className="text-xs font-bold uppercase tracking-widest text-muted border-b border-border pb-0.5 hover:text-accent hover:border-accent transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`bg-border/30 animate-pulse ${i === 0 ? 'row-span-2 h-[560px]' : 'h-[280px]'}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridTemplateRows: 'auto auto' }}>
            {featured && (
              <div className="row-span-2 col-span-2 md:col-span-1">
                <DestinationCard destination={featured} featured />
              </div>
            )}
            {rest.map(dest => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-ink mx-8 md:mx-14 mb-20 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-3">Help the community</p>
          <h3 className="font-serif font-black text-3xl md:text-4xl text-paper tracking-tight leading-tight">
            Been somewhere<br />
            <em className="text-gold">unforgettable?</em>
          </h3>
          <p className="text-paper/50 text-sm mt-3 max-w-sm leading-relaxed">
            Your tip — however small — can save someone from a scam, a bad hotel, or a missed experience.
          </p>
        </div>
        <Link
          to="/submit"
          className="shrink-0 bg-accent text-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#c44010] transition-colors"
        >
          Share Your Experience →
        </Link>
      </section>
    </div>
  )
}
