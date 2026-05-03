import { useNavigate } from 'react-router-dom'

// Gradient map per destination slug
const gradients = {
  thailand:  'linear-gradient(160deg, #f4a93d 0%, #e85d26 40%, #7b2d8b 100%)',
  japan:     'linear-gradient(160deg, #ff6b8a 0%, #c0392b 50%, #2c1654 100%)',
  bali:      'linear-gradient(160deg, #56d17c 0%, #1a8040 50%, #0a3020 100%)',
  italy:     'linear-gradient(160deg, #70b8ff 0%, #2d6fa8 40%, #1a3d5c 100%)',
  vietnam:   'linear-gradient(160deg, #ffd89b 0%, #e8852a 50%, #8b1a1a 100%)',
  dubai:     'linear-gradient(160deg, #ffe066 0%, #c9973a 50%, #1a1200 100%)',
}

const emojis = {
  thailand: '🛕', japan: '🗼', bali: '🌿',
  italy: '🏛️', vietnam: '🏮', dubai: '🌆',
}

export default function DestinationCard({ destination, featured = false }) {
  const navigate = useNavigate()
  const gradient = gradients[destination.slug] || 'linear-gradient(160deg, #ccc, #888)'
  const emoji    = emojis[destination.slug] || '🌍'
  const tipCount = destination._count?.tips ?? 0

  return (
    <div
      onClick={() => navigate(`/destination/${destination.slug}`)}
      className="group relative overflow-hidden border border-border bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Image area */}
      <div
        className="w-full flex items-end justify-center pb-4 text-5xl"
        style={{
          background: gradient,
          height: featured ? '360px' : '180px',
        }}
      >
        {emoji}
      </div>

      {/* Body */}
      <div className="p-4 md:p-5">
        <h3 className={`font-serif font-bold tracking-tight mb-1 ${featured ? 'text-2xl' : 'text-lg'}`}>
          {destination.name}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            {tipCount} tips
          </span>
          <span>·</span>
          <span>{destination.region}</span>
        </div>

        {/* Tags from visaInfo snippet */}
        {destination.visaInfo && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-[10px] px-2 py-1 border border-border text-muted font-medium tracking-wide">
              {destination.visaInfo.includes('visa-free') ? 'Visa Free' : 'Visa Required'}
            </span>
            <span className="text-[10px] px-2 py-1 border border-border text-muted font-medium tracking-wide">
              {destination.region}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
