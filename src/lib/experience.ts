// Experience entries for the Experience page ("mission log").
//
// To add a role, copy an entry below and fill it in:
//   start: 'YYYY-MM'              e.g. '2024-05'
//   end:   'YYYY-MM' | 'current'  use 'current' if you still hold the role
//   category: 'cs'     → shows under the CS filter
//             'beyond' → non-CS roles (sport, retail, volunteering, ...)
// Order doesn't matter — the timeline sorts entries oldest → newest
// (left → right).

export type ExperienceCategory = 'cs' | 'beyond'

export const CURRENT = 'current'

export interface Experience {
  id: string
  role: string
  org: string
  orgUrl?: string
  location?: string
  start: string
  end: string
  category: ExperienceCategory
  summary: string
  highlights?: string[]
  tags?: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'socis-vp-internal',
    role: 'VP of Internal Affairs',
    org: 'Society of Computing and Information Science (SOCIS)',
    orgUrl: 'https://socis.ca',
    location: 'Guelph, ON',
    start: '2026-05',
    end: CURRENT,
    category: 'cs',
    summary:
      'I keep the society running behind the scenes: overseeing 5 computing subclubs and helping put on events for students and faculty.',
    highlights: [
      'Oversee administrative operations for 5 computing subclubs, co-organizing machine learning workshops, coding competitions, and research mixers with faculty',
      "Built a full-stack platform with Next.js, TypeScript, and Supabase (PostgreSQL) for the society's upcoming Incubator Program, an initiative that brings recruiters, researchers, and faculty together with students",
      'Partnered with Guelph Rocketry, the Canadian Space Agency (CSA), and NASA to host an in-person NASA Space Apps Challenge 2026 event at the University of Guelph',
    ],
    tags: ['Leadership', 'Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
  },
  {
    id: 'uog-research-assistant',
    role: 'Undergraduate Research Assistant',
    org: 'University of Guelph — Biomimetic Research Project',
    location: 'Guelph, ON',
    start: '2026-05',
    end: '2026-08',
    category: 'cs',
    summary:
      'I helped replace a lab’s manual Excel workflows with a proper database-backed research platform.',
    highlights: [
      'Collaborated on a PostgreSQL-backed research platform with automated ingestion, classification, and versioned storage of biomimetic research literature',
      'Evaluated PostgreSQL, MySQL, and MongoDB on query speed, efficiency, and storage, selecting PostgreSQL and designing the relational schemas',
      'Developed a generalizable data storage framework for other research labs, presented at the University of Guelph Undergraduate Research Poster Session',
    ],
    tags: ['Research','PostgreSQL', 'MySQL', 'MongoDB', 'Database Design'],
  },
  {
    id: 'uog-teaching-assistant',
    role: 'Teaching Assistant — Intro to Programming',
    org: 'University of Guelph',
    location: 'Guelph, ON',
    start: '2025-09',
    end: '2025-12',
    category: 'cs',
    summary: 'I helped 350+ students write their first lines of Python.',
    highlights: [
      'Supported a 350+ student introductory Python course as part of the teaching team',
      'Led two 40-student lab sections and held office hours, guiding students through algorithm design, problem-solving, and optimization fundamentals',
      'Refined exam content with the teaching team and resolved student concerns through a Redmine ticketing system',
    ],
    tags: ['Python', 'Teaching', 'Redmine'],
  },
  {
    id: 'wushu-canada',
    role: 'National Team Athlete',
    org: 'WushuCanada',
    orgUrl: 'https://fitofan.com/u911056872',
    start: '2015-02',
    end: CURRENT,
    category: 'beyond',
    summary: 'Placeholder: competing nationally and internationally.',
  },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function isCurrent(exp: Experience): boolean {
  return exp.end === CURRENT
}

function parseYearMonth(value: string): { year: number; month: number } {
  if (value === CURRENT) {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() + 1 }
  }
  const [year = 0, month = 1] = value.split('-').map(Number)
  return { year, month }
}

export function formatYearMonth(value: string): string {
  if (value === CURRENT) return 'Present'
  const { year, month } = parseYearMonth(value)
  return `${MONTHS[month - 1] ?? ''} ${year}`
}

// Inclusive month count, e.g. May–Aug 2024 = 4 mo
export function formatDuration(exp: Experience): string {
  const start = parseYearMonth(exp.start)
  const end = parseYearMonth(exp.end)
  const months = Math.max(1, (end.year - start.year) * 12 + (end.month - start.month) + 1)
  const years = Math.floor(months / 12)
  const rest = months % 12
  return [years && `${years} yr`, rest && `${rest} mo`].filter(Boolean).join(' ')
}

// Oldest first (by start date, then end date). 'YYYY-MM' strings sort
// correctly as plain strings, and 'current' sorts after any year.
export function sortChronological(list: Experience[]): Experience[] {
  return [...list].sort(
    (a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end)
  )
}
