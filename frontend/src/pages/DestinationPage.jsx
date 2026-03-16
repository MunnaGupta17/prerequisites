// DestinationPage.jsx — Full implementation comes in Step 5
import { useParams } from 'react-router-dom'

export default function DestinationPage() {
  const { slug } = useParams()
  return (
    <div className="p-16 text-center">
      <p className="font-mono text-xs tracking-widest uppercase text-accent mb-2">Destination Page</p>
      <h1 className="font-serif text-5xl font-black capitalize">{slug}</h1>
      <p className="text-muted mt-4">Full destination page coming in Step 5.</p>
    </div>
  )
}
