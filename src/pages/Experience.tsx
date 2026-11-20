import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ParticleField from '../components/ParticleField'
import {
  EXPERIENCES,
  formatDuration,
  formatYearMonth,
  isCurrent,
  sortByRecent,
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

const SORTED_EXPERIENCES = sortByRecent(EXPERIENCES)

function countFor(filter: Filter): number {
  return filter === 'all'
    ? EXPERIENCES.length
    : EXPERIENCES.filter((e) => e.category === filter).length
}

export default function Experience() {
  const [filter, setFilter] = useState<Filter>('all')
  const reduceMotion = useReducedMotion()
  const visible = SORTED_EXPERIENCES.filter((e) => filter === 'all' || e.category === filter)

  return (
    <div className="relative min-h-screen bg-black">
      {/* fixed wrapper keeps the starfield behind the page while it scrolls */}
      <div className="fixed inset-0">
        <ParticleField />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 py-12 md:px-12 md:py-16">
        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
                    active ? 'bg-white text-black' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  }`}
                >
                  {f.label}{' '}
                  <span className={active ? 'text-gray-600' : 'text-gray-500'}>{countFor(f.value)}</span>
                </button>
              )
            })}
          </div>
        </header>

        <div className="relative">
          {/* the timeline rail: left edge on mobile, centre on desktop */}
          <div className="absolute bottom-0 left-0 top-2 w-px bg-linear-to-b from-gray-500 via-gray-800 to-transparent md:left-1/2" />

          <ol>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((exp, i) => (
                <motion.li
                  key={exp.id}
                  layout={!reduceMotion}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative pb-10 pl-8 last:pb-0 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0"
                >
                  <MissionEntry exp={exp} cardSide={i % 2 === 0 ? 'left' : 'right'} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </div>

        {visible.length === 0 && (
          <p className="text-sm text-gray-500">No missions in this category yet.</p>
        )}
      </main>
    </div>
  )
}

// On desktop, cards alternate sides of the centre rail and the dates sit
// on the opposite side. On mobile everything stacks right of a left rail.
function MissionEntry({ exp, cardSide }: { exp: ExperienceEntry; cardSide: 'left' | 'right' }) {
  const style = CATEGORY_STYLES[exp.category]
  const current = isCurrent(exp)
  const cardLeft = cardSide === 'left'

  return (
    <>
      {/* marker on the rail; current roles get a pulsing ring */}
      <span className="absolute left-0 top-1.5 flex h-3 w-3 -translate-x-1/2 md:left-1/2">
        {current && (
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${style.dot}`} />
        )}
        <span className={`relative inline-flex h-3 w-3 rounded-full ${style.dot}`} />
      </span>

      <div
        className={`mb-2 text-xs uppercase tracking-wider text-gray-400 md:row-start-1 md:mb-0 md:pt-0.5 md:text-sm ${
          cardLeft ? 'md:col-start-2 md:text-left' : 'md:col-start-1 md:text-right'
        }`}
      >
        <p>
          {formatYearMonth(exp.start)} – {formatYearMonth(exp.end)}
        </p>
        <p className="text-gray-600">{formatDuration(exp)}</p>
      </div>

      <article
        className={`rounded-lg border bg-black/70 p-5 backdrop-blur-sm md:row-start-1 md:p-6 ${style.border} ${
          cardLeft ? 'md:col-start-1' : 'md:col-start-2'
        }`}
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
