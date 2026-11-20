import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ParticleField from '../components/ParticleField'
import { PROJECTS } from '../lib/projects'
import type { Project, ProjectCategory } from '../lib/projects'

type Filter = 'all' | ProjectCategory

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ml', label: 'ML & Data' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
]

const LINK_LABELS: Record<keyof NonNullable<Project['links']>, string> = {
  github: 'GitHub',
  demo: 'Live demo',
  paper: 'Paper',
}

// How many matching projects get the big panel when a filter is active
const FILTERED_FLAGSHIP_COUNT = 2

const PILL_CLASS =
  'inline-block rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-200 no-underline transition hover:bg-white hover:text-black'

function matches(project: Project, filter: Filter): boolean {
  return filter === 'all' || project.categories.includes(filter)
}

function countFor(filter: Filter): number {
  return PROJECTS.filter((p) => matches(p, filter)).length
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const reduceMotion = useReducedMotion()
  const visible = PROJECTS.filter((p) => matches(p, filter))
  // 'All' uses the featured flag; a filtered view promotes its top matches
  // (file order) so every filter opens with flagship panels.
  const featured =
    filter === 'all'
      ? visible.filter((p) => p.featured)
      : visible.slice(0, FILTERED_FLAGSHIP_COUNT)
  const others = visible.filter((p) => !featured.includes(p))

  const itemMotion = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' as const },
  }

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
            <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">Launch manifest</p>
            <h1 className="font-space-grotesk mb-3 text-3xl font-bold text-white md:text-5xl">
              Projects
            </h1>
            <p className="max-w-md text-sm text-gray-400 md:text-base">
              Things I've built, broken, and (mostly) fixed.
            </p>
          </motion.div>

          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-3">
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

        <div className="flex flex-col gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {featured.map((project) => (
              <motion.div key={project.id} layout={!reduceMotion} {...itemMotion}>
                <FeaturedProject project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xs uppercase tracking-widest text-gray-500">More launches</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {others.map((project) => (
                  <motion.div key={project.id} layout={!reduceMotion} {...itemMotion}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {visible.length === 0 && (
          <p className="text-sm text-gray-500">Nothing in this category yet — check back soon.</p>
        )}
      </main>
    </div>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-gray-800 bg-black/70 backdrop-blur-sm md:grid-cols-5">
      <div className="md:col-span-2">
        {project.image ? (
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex aspect-video h-full w-full items-center justify-center border-b border-dashed border-gray-800 text-xs uppercase tracking-widest text-gray-600 md:aspect-auto md:border-b-0 md:border-r">
            Visual coming soon
          </div>
        )}
      </div>

      <div className="p-6 md:col-span-3 md:p-8">
        <ProjectMeta project={project} />
        <h3 className="font-space-grotesk mt-2 text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-300 md:text-base">{project.tagline}</p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-400 marker:text-gray-600">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {project.learned && (
          <p className="mt-4 text-sm text-gray-300">
            <span className="text-cyan-400">What I learned: </span>
            {project.learned}
          </p>
        )}

        <Tags tags={project.tags} />
        <Links project={project} />
      </div>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full rounded-lg border border-gray-800 bg-black/70 p-6 backdrop-blur-sm">
      <ProjectMeta project={project} />
      <h3 className="font-space-grotesk mt-2 text-xl font-bold text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-300">{project.tagline}</p>

      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-400 marker:text-gray-600">
        {project.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <Tags tags={project.tags} />
      <Links project={project} />
    </article>
  )
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest">
      <span className="text-gray-500">{project.period}</span>
      {project.categories.map((c) => (
        <span key={c} className="text-cyan-400">
          {FILTERS.find((f) => f.value === c)?.label}
        </span>
      ))}
    </div>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded border border-gray-800 px-2 py-0.5 text-xs text-gray-400">
          {tag}
        </span>
      ))}
    </div>
  )
}

function Links({ project }: { project: Project }) {
  const entries = Object.entries(project.links ?? {}).filter(
    (entry): entry is [keyof typeof LINK_LABELS, string] => Boolean(entry[1])
  )
  if (entries.length === 0) return null

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {entries.map(([key, href]) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={PILL_CLASS}>
          {LINK_LABELS[key]}
        </a>
      ))}
    </div>
  )
}
