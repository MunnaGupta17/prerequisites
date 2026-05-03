import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import TipCard from '../components/TipCard'
import { useDestination, useTips } from '../hooks/useData'

const CATEGORIES = [
  { key: '',             label: 'All Tips'      },
  { key: 'SCAM',        label: '⚠ Scams'       },
  { key: 'VISA',        label: 'Visa & Entry'  },
  { key: 'MONEY',       label: 'Money'         },
  { key: 'TRANSPORT',   label: 'Transport'     },
  { key: 'FOOD',        label: 'Food'          },
  { key: 'CULTURE',     label: 'Culture'       },
  { key: 'PACKING',     label: 'Packing'       },
]

const HERO_GRADIENTS = {
  thailand: 'linear-gradient(160deg, #f4a93d 0%, #e85d26 40%, #7b2d8b 100%)',
  japan:    'linear-gradient(160deg, #ff6b8a 0%, #c0392b 50%, #2c1654 100%)',
  bali:     'linear-gradient(160deg, #56d17c 0%, #1a8040 50%, #0a3020 100%)',
  italy:    'linear-gradient(160deg, #70b8ff 0%, #2d6fa8 40%, #1a3d5c 100%)',
  vietnam:  'linear-gradient(160deg, #ffd89b 0%, #e8852a 50%, #8b1a1a 100%)',
  dubai:    'linear-gradient(160deg, #ffe066 0%, #c9973a 50%, #1a1200 100%)',
}

function QuickFact({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <div className="w-8 h-8 bg-paper flex items-center justify-center text-base shrink-0">{icon}</div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-0.5">{label}</div>
        <div className="text-[13px] font-semibold text-ink">{value}</div>
      </div>
    </div>
  )
}

export default function DestinationPage() {
  const { slug }       = useParams()
  const navigate       = useNavigate()
  const [activeTab, setActiveTab]     = useState('')
  const [sort, setSort]               = useState('top')

  const { destination, loading: destLoading, error: destError } = useDestination(slug)
  const { tips, loading: tipsLoading } = useTips(slug, {
    category: activeTab || undefined,
    sort,
  })

  // ── Not found ──
  if (!destLoading && destError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8">
        <p className="font-mono text-xs tracking-widest uppercase text-accent mb-4">404</p>
        <h1 className="font-serif text-5xl font-black tracking-tight mb-4 capitalize">{slug}</h1>
        <p className="text-muted mb-8">We don't have tips for this destination yet.</p>
        <Link
          to="/submit"
          className="bg-ink text-paper px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-accent transition-colors"
        >
          Be the first to share a tip →
        </Link>
        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-muted underline">
          ← Go back
        </button>
      </div>
    )
  }

  const heroGradient = HERO_GRADIENTS[slug] || 'linear-gradient(160deg, #888, #333)'
  const scamCount    = tips.filter(t => t.category === 'SCAM').length

  return (
    <div>
      {/* ── HERO ── */}
      <div className="relative min-h-[280px] flex items-end px-8 md:px-14 py-12 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0" style={{ background: heroGradient, opacity: 0.35 }} />
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,240,232,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-paper/60 text-xs font-bold uppercase tracking-widest mb-6 hover:text-paper transition-colors"
          >
            ← Back
          </button>

          {destLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-24 bg-paper/20 animate-pulse rounded" />
              <div className="h-16 w-80 bg-paper/20 animate-pulse rounded" />
            </div>
          ) : destination && (
            <>
              <p className="font-mono text-[11px] tracking-[3px] uppercase text-accent mb-3">
                {destination.region} · {destination.emoji}
              </p>
              <h1 className="font-serif font-black text-paper leading-none tracking-[-2px] text-[clamp(40px,6vw,72px)] mb-4">
                {destination.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="bg-paper/15 border border-paper/25 text-paper text-xs px-3 py-1.5 font-medium">
                  👥 {destination._count?.tips ?? 0} traveller tips
                </span>
                <span className="bg-paper/15 border border-paper/25 text-paper text-xs px-3 py-1.5 font-medium">
                  🕐 Best: {destination.bestSeason}
                </span>
                {scamCount > 0 && (
                  <span className="bg-red-900/40 border border-red-500/40 text-red-200 text-xs px-3 py-1.5 font-medium">
                    ⚠ {scamCount} scam alerts
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="sticky top-[61px] z-40 bg-white border-b border-border overflow-x-auto">
        <div className="flex px-8 md:px-14 min-w-max">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-4 text-[11px] font-bold uppercase tracking-widest border-b-2 whitespace-nowrap transition-colors
                ${activeTab === key
                  ? 'text-ink border-accent'
                  : 'text-muted border-transparent hover:text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 px-8 md:px-14 py-12 items-start">

        {/* Tips feed */}
        <div>
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted">
              {tipsLoading ? 'Loading…' : `${tips.length} tips`}
              {activeTab && ` in ${CATEGORIES.find(c => c.key === activeTab)?.label}`}
            </p>
            <div className="flex gap-1">
              {[['top','Top'],['new','New']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSort(val)}
                  className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 border transition-colors
                    ${sort === val ? 'bg-ink text-paper border-ink' : 'border-border text-muted hover:border-ink hover:text-ink'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Scam warning banner */}
          {(activeTab === '' || activeTab === 'SCAM') && scamCount > 0 && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 mb-5">
              <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-sm shrink-0">⚠️</div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-red-700 mb-1">Active Scam Warning</p>
                <p className="text-[13px] text-red-800 leading-relaxed">
                  {scamCount} scam alert{scamCount > 1 ? 's' : ''} reported for {destination?.name}. Read carefully before you go.
                </p>
              </div>
            </div>
          )}

          {/* Tips */}
          {tipsLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-44 bg-border/30 animate-pulse" />
              ))}
            </div>
          ) : tips.length === 0 ? (
            <div className="text-center py-16 border border-border bg-white">
              <p className="text-4xl mb-4">🗺️</p>
              <p className="font-serif text-xl font-bold mb-2">No tips yet in this category</p>
              <p className="text-muted text-sm mb-6">Be the first to share your experience!</p>
              <Link
                to={`/submit?destination=${slug}`}
                className="bg-ink text-paper text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-accent transition-colors"
              >
                Add a Tip
              </Link>
            </div>
          ) : (
            tips.map(tip => <TipCard key={tip.id} tip={tip} />)
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="lg:sticky lg:top-[130px] space-y-4">

          {/* Quick Facts */}
          {destination && (
            <div className="bg-white border border-border p-5">
              <h3 className="font-serif text-lg font-bold mb-3">Quick Facts {destination.emoji}</h3>
              <QuickFact icon="🛂" label="Visa"          value={destination.visaInfo    || '—'} />
              <QuickFact icon="💰" label="Currency"      value={destination.currency    || '—'} />
              <QuickFact icon="🌡️" label="Best Season"   value={destination.bestSeason  || '—'} />
              <QuickFact icon="💸" label="Budget/Day"    value={destination.budgetRange || '—'} />
              <QuickFact icon="🚨" label="Emergency"     value="Tourist Police: 1155"           />
            </div>
          )}

          {/* About */}
          {destination?.description && (
            <div className="bg-white border border-border p-5">
              <h3 className="font-serif text-lg font-bold mb-2">About</h3>
              <p className="text-sm text-muted leading-relaxed">{destination.description}</p>
            </div>
          )}

          {/* Share CTA */}
          <div className="bg-white border border-border p-5">
            <p className="font-mono text-[10px] tracking-[2px] uppercase text-accent mb-2">Been there?</p>
            <p className="text-sm text-muted mb-4 leading-relaxed">
              Share your experience and help future travellers.
            </p>
            <Link
              to={`/submit?destination=${slug}`}
              className="block w-full text-center bg-ink text-paper text-xs font-bold uppercase tracking-widest py-3.5 hover:bg-accent transition-colors"
            >
              + Add Your Tip
            </Link>
          </div>

        </aside>
      </div>
    </div>
  )
}
