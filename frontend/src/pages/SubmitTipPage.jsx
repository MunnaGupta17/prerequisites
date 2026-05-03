import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { createTip } from '../services/api'

const CATEGORIES = [
  { value: 'SCAM',          label: '⚠ Scam Alert'        },
  { value: 'VISA',          label: '🛂 Visa & Entry'      },
  { value: 'MONEY',         label: '💰 Money & ATMs'      },
  { value: 'TRANSPORT',     label: '🚌 Transport'         },
  { value: 'FOOD',          label: '🍜 Food & Drinks'     },
  { value: 'CULTURE',       label: '🕌 Culture & Etiquette'},
  { value: 'PACKING',       label: '🎒 Packing List'      },
  { value: 'ACCOMMODATION', label: '🏨 Accommodation'     },
  { value: 'GENERAL',       label: '✅ General Pro Tip'   },
]

const TRAVELLER_TYPES = [
  { value: 'SOLO',   label: 'Solo'         },
  { value: 'COUPLE', label: 'Couple'       },
  { value: 'FAMILY', label: 'Family'       },
  { value: 'GROUP',  label: 'Group'        },
  { value: 'BUDGET', label: 'Budget'       },
  { value: 'LUXURY', label: 'Luxury'       },
]

const inputCls = "w-full bg-paper/10 border border-paper/20 text-paper px-4 py-3 font-sans text-sm outline-none focus:border-accent transition-colors placeholder-paper/30"
const selectCls = inputCls + " cursor-pointer"

export default function SubmitTipPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [form, setForm] = useState({
    destinationSlug: searchParams.get('destination') || '',
    text:            '',
    category:        '',
    travellerType:   'SOLO',
    authorName:      '',
    authorFrom:      '',
  })

  const [errors,    setErrors]    = useState({})
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }))
  }

  function validate() {
    const e = {}
    if (!form.destinationSlug.trim()) e.destinationSlug = 'Required'
    if (!form.category)               e.category        = 'Please choose a category'
    if (form.text.trim().length < 20) e.text            = 'Please write at least 20 characters'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await createTip({
        ...form,
        destinationSlug: form.destinationSlug.toLowerCase().trim(),
      })
      setSubmitted(true)
    } catch (err) {
      const serverMsg = err.response?.data?.error
      if (typeof serverMsg === 'string' && serverMsg.includes('not found')) {
        setErrors({ destinationSlug: `"${form.destinationSlug}" not found. Try: thailand, japan, bali, italy, vietnam, dubai` })
      } else {
        setErrors({ api: 'Something went wrong. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <p className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Thank you!</p>
          <h1 className="font-serif text-4xl font-black tracking-tight text-ink mb-4">
            Tip Submitted
          </h1>
          <p className="text-muted leading-relaxed mb-8">
            Your experience is now live and will help other travellers avoid the pitfalls and make the most of their trip.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to={form.destinationSlug ? `/destination/${form.destinationSlug}` : '/'}
              className="bg-ink text-paper font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-accent transition-colors"
            >
              View Destination →
            </Link>
            <button
              onClick={() => { setSubmitted(false); setForm(f => ({ ...f, text: '', category: '' })) }}
              className="border border-border text-ink font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-paper transition-colors"
            >
              Add Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ink min-h-[calc(100vh-64px)] px-8 md:px-14 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-4">Share Your Experience</p>
        <h1 className="font-serif font-black text-paper tracking-tight leading-none text-[clamp(36px,5vw,56px)] mb-3">
          Help the next<br /><em className="text-gold">traveller.</em>
        </h1>
        <p className="text-paper/50 text-sm mb-10 leading-relaxed">
          Your tip — however small — can save someone from a scam, a bad meal, or a missed experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-paper/50 mb-2">
                Destination *
              </label>
              <input
                name="destinationSlug"
                value={form.destinationSlug}
                onChange={handleChange}
                placeholder="thailand, japan, bali, italy…"
                className={inputCls}
              />
              <p className="text-paper/30 text-xs mt-1">Type the country name in lowercase, no spaces</p>
              {errors.destinationSlug && <p className="text-red-400 text-xs mt-1">{errors.destinationSlug}</p>}
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-paper/50 mb-2">
                Travelling From
              </label>
              <input
                name="authorFrom"
                value={form.authorFrom}
                onChange={handleChange}
                placeholder="e.g. India, Mumbai"
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-paper/50 mb-2">
                Category *
              </label>
              <select name="category" value={form.category} onChange={handleChange} className={selectCls}>
                <option value="">Select a category</option>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-paper/50 mb-2">
                Traveller Type
              </label>
              <select name="travellerType" value={form.travellerType} onChange={handleChange} className={selectCls}>
                {TRAVELLER_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tip text */}
          <div>
            <label className="block font-mono text-[10px] tracking-widest uppercase text-paper/50 mb-2">
              Your Tip * <span className="normal-case text-paper/30 tracking-normal">(min 20 characters)</span>
            </label>
            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              rows={5}
              placeholder="Be specific and honest. What do you wish someone had told you before your trip?"
              className={inputCls + ' resize-y min-h-[120px]'}
            />
            <div className="flex justify-between mt-1">
              {errors.text
                ? <p className="text-red-400 text-xs">{errors.text}</p>
                : <span />}
              <span className="text-paper/30 text-xs">{form.text.length} chars</span>
            </div>
          </div>

          {/* Author name */}
          <div>
            <label className="block font-mono text-[10px] tracking-widest uppercase text-paper/50 mb-2">
              Your Name <span className="normal-case text-paper/30 tracking-normal">(optional — initials fine)</span>
            </label>
            <input
              name="authorName"
              value={form.authorName}
              onChange={handleChange}
              placeholder="e.g. Rahul K."
              className={inputCls}
            />
          </div>

          {errors.api && (
            <div className="bg-red-900/40 border border-red-500/40 text-red-200 text-sm px-4 py-3">
              {errors.api}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-white font-bold uppercase tracking-widest text-sm px-10 py-4 hover:bg-[#c44010] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting…' : 'Submit Tip →'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-paper/40 text-sm underline hover:text-paper/70 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
