import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ParticleField from '../components/ParticleField'
import {
  EXPERIENCES,
  formatDuration,
  formatYearMonth,
  isCurrent,
  sortChronological,
} from '../lib/experience'
import type { Experience as ExperienceEntry, ExperienceCategory } from '../lib/experience'

type Filter = 'all' | ExperienceCategory

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'cs', label: 'CS' },
  { value: 'beyond', label: 'Beyond CS' },
]

const CATEGORY_STYLES: Record<ExperienceCategory, { label: string; text: string; dot: string; border: string }> = {
  cs: { label: 'CS', text: 'text-cyan-400', dot: 'bg-cyan-400', border: 'border-cyan-400/30' },
  beyond: { label: 'Beyond CS', text: 'text-amber-300', dot: 'bg-amber-300', border: 'border-amber-300/30' },
}

const SORTED_EXPERIENCES = sortChronological(EXPERIENCES)

function countFor(filter: Filter): number {
  return filter === 'all'
    ? EXPERIENCES.length
    : EXPERIENCES.filter((e) => e.category === filter).length
}

export default function Experience() {
  const [filter, setFilter] = useState<Filter>('all')
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const visible = SORTED_EXPERIENCES.filter((e) => filter === 'all' || e.category === filter)

  // Let a normal mouse wheel scroll the timeline sideways
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function handleWheel(e: WheelEvent) {
      if (!track) return
      // trackpads already scroll horizontally on their own
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      // let a tall card scroll its own content first
      const card = e.target instanceof Element ? e.target.closest('[data-card-scroll]') : null
      if (card && card.scrollHeight > card.clientHeight) return
      if (track.scrollWidth <= track.clientWidth) return
      e.preventDefault()
      track.scrollLeft += e.deltaY
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="relative flex h-[calc(100dvh-73px)] flex-col overflow-hidden bg-black">
      <ParticleField />

      <header className="relative flex shrink-0 flex-col gap-6 px-4 pt-6 md:flex-row md:items-end md:justify-between md:px-12 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">Mission log</p>
          <h1 className="font-space-grotesk mb-3 text-3xl font-bold text-white md:text-5xl">
            Experience
          </h1>
          <p className="max-w-md text-sm text-gray-400 md:text-base">
            Every role I've launched, flown, or am still flying.
          </p>
        </motion.div>

        <div role="group" aria-label="Filter experience" className="flex flex-wrap gap-3">
          {FILTERS.map((f) => {
            const active = filter === f.value
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  active
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
              >
                {f.label} <span className={active ? 'text-gray-600' : 'text-gray-500'}>{countFor(f.value)}</span>
              </button>
            )
          })}
        </div>
      </header>

      <div
        ref={trackRef}
        className="relative min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-px-4 [scrollbar-color:var(--color-gray-700)_transparent] [scrollbar-width:thin] md:snap-none"
      >
        <div className="relative h-full w-max min-w-full px-4 py-8 md:px-12">
          {/* the timeline rail, fading out into the future on the right */}
          <div className="absolute left-0 right-0 top-[5.25rem] h-px bg-linear-to-r from-gray-700 via-gray-500 to-transparent" />

          <ol className="flex h-full gap-6 md:gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((exp) => (
                <motion.li
                  key={exp.id}
                  layout={!reduceMotion}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative flex h-full w-[80vw] max-w-sm shrink-0 snap-start flex-col md:w-96"
                >
                  <MissionEntry exp={exp} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>

          {visible.length === 0 && (
            <p className="absolute left-4 top-28 text-sm text-gray-500 md:left-12">
              No missions in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MissionEntry({ exp }: { exp: ExperienceEntry }) {
  const style = CATEGORY_STYLES[exp.category]
  const current = isCurrent(exp)

  return (
    <>
      {/* dates sit above the rail */}
      <div className="h-10 text-xs uppercase tracking-wider text-gray-400">
        <p>
          {formatYearMonth(exp.start)} – {formatYearMonth(exp.end)}
        </p>
        <p className="text-gray-600">{formatDuration(exp)}</p>
      </div>

      {/* marker on the rail; current roles get a pulsing ring */}
      <div className="flex h-6 items-center">
        <span className="relative flex h-3 w-3">
          {current && (
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${style.dot}`} />
          )}
          <span className={`relative inline-flex h-3 w-3 rounded-full ${style.dot}`} />
        </span>
      </div>
      <div className="ml-1.5 h-4 w-px shrink-0 bg-gray-700" />

      <article
        data-card-scroll
        className={`min-h-0 overflow-y-auto rounded-lg border bg-black/70 p-5 backdrop-blur-sm [scrollbar-width:thin] ${style.border}`}
      >
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest">
          <span className={style.text}>{style.label}</span>
          <span className={current ? 'text-emerald-400' : 'text-gray-500'}>
            {current ? 'Active' : 'Complete'}
          </span>
        </div>

        <h2 className="font-space-grotesk text-xl font-bold text-white">{exp.role}</h2>
        <p className="text-sm text-gray-300">
          {exp.orgUrl ? (
            <a
              href={exp.orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline transition hover:text-gray-300"
            >
              {exp.org}
            </a>
          ) : (
            exp.org
          )}
          {exp.location && <span className="text-gray-500"> · {exp.location}</span>}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-400">{exp.summary}</p>

        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-400 marker:text-gray-600">
            {exp.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {exp.tags && exp.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <span key={tag} className="rounded border border-gray-800 px-2 py-0.5 text-xs text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </>
  )
}
