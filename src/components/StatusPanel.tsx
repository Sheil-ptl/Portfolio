import { Link } from 'react-router-dom'
import { EXPERIENCES, isCurrent, sortByRecent } from '../lib/experience'
import { PROJECTS } from '../lib/projects'
import {
  EDUCATION,
  NOW_BUILDING_IDS,
  OPEN_TO,
  RECENT_LAUNCH_COUNT,
  TOOLKIT,
} from '../lib/profile'

const CURRENT_ROLES = sortByRecent(EXPERIENCES).filter(isCurrent)
const NOW_BUILDING = PROJECTS.filter((p) => NOW_BUILDING_IDS.includes(p.id))
const RECENT_LAUNCHES = PROJECTS.filter((p) => p.featured).slice(0, RECENT_LAUNCH_COUNT)

const PILL_CLASS =
  'inline-block rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-200 no-underline transition hover:bg-white hover:text-black'

function SectionLabel({ children }: { children: string }) {
  return <h2 className="mb-3 text-xs uppercase tracking-widest text-gray-500">{children}</h2>
}

// One column on small screens; two columns (now | done) on wide screens
export default function StatusPanel() {
  return (
    <aside
      aria-label="At a glance"
      className="grid gap-x-10 rounded-lg border border-gray-800 bg-black/60 p-6 backdrop-blur-sm xl:grid-cols-2 xl:p-8"
    >
      {/* left column: who I am right now */}
      <div>
        <section>
          <SectionLabel>Currently</SectionLabel>
          <ul className="space-y-2 text-sm">
            {CURRENT_ROLES.map((role) => (
              <li key={role.id} className="flex items-baseline gap-3">
                <span className="relative top-[-1px] inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                <span className="text-gray-200">
                  {role.role} <span className="text-gray-500">@</span> {role.orgShort ?? role.org}
                </span>
              </li>
            ))}
            {NOW_BUILDING.map((project) => (
              <li key={project.id} className="flex items-baseline gap-3">
                <span className="relative top-[-1px] inline-flex h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <span className="text-gray-200">
                  <span className="text-gray-500">Building </span>
                  {project.title}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-md border border-cyan-400/30 px-3 py-2 text-sm text-gray-200">
            <span className="text-cyan-400">Open to: </span>
            {OPEN_TO}
          </p>
        </section>

        <section className="mt-6">
          <SectionLabel>Education</SectionLabel>
          <p className="text-sm text-gray-200">{EDUCATION.degree}</p>
          <p className="text-sm text-gray-400">
            {EDUCATION.school} · {EDUCATION.graduation}
          </p>
          <p className="text-sm text-gray-500">{EDUCATION.detail}</p>
        </section>
      </div>

      {/* right column: what I've done */}
      <div>
        <section className="mt-6 xl:mt-0">
          <SectionLabel>Recent launches</SectionLabel>
          <ul className="space-y-3">
            {RECENT_LAUNCHES.map((project) => (
              <li key={project.id}>
                <p className="text-sm text-gray-200">
                  <span className="text-gray-500">▸ </span>
                  {project.title}
                </p>
                <p className="pl-4 text-xs text-gray-500">
                  {project.headline ?? project.tags.slice(0, 3).join(' · ')}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/projects" className={PILL_CLASS}>
              All projects →
            </Link>
            <Link to="/experience" className={PILL_CLASS}>
              Experience →
            </Link>
          </div>
        </section>

        <section className="mt-6">
          <SectionLabel>Toolkit</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {TOOLKIT.map((tool) => (
              <span key={tool} className="rounded border border-gray-800 px-2 py-0.5 text-xs text-gray-400">
                {tool}
              </span>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
