// Projects for the Projects page ("launch manifest").
//
// - Order here = order on the page, so put your best work first.
// - featured: true → big case-study panel in the 'All' view; false → small card.
//   When a filter is active, the first matches (in this order) become the big
//   panels instead — see FILTERED_FLAGSHIP_COUNT in Projects.tsx.
// - categories drive the filter buttons; a project can be in several.
// - highlights follow the XYZ formula:
//     "Accomplished [X], as measured by [Y], by doing [Z]"
// - image is optional; featured projects without one show a placeholder.
//   Put images in src/assets/ and import them at the top of this file.

export type ProjectCategory = 'ml' | 'backend' | 'frontend'

export interface Project {
  id: string
  title: string
  tagline: string
  // short result shown on the Home page, e.g. '90% accuracy' (falls back to tags)
  headline?: string
  period: string
  featured: boolean
  categories: ProjectCategory[]
  highlights: string[]
  learned?: string
  tags: string[]
  links?: {
    github?: string
    demo?: string
    paper?: string
  }
  image?: {
    src: string
    alt: string
  }
}

export const PROJECTS: Project[] = [
  {
    id: 'ham10000',
    title: 'Deep Learning Analysis of HAM10000',
    tagline: 'Teaching neural networks to spot skin cancer in dermatology images.',
    headline: '90% accuracy · 0.83 macro F1',
    period: 'Jan – Apr 2026',
    featured: true,
    categories: ['ml'],
    highlights: [
      'Achieved 90% accuracy and 0.83 macro F1 classifying skin lesions from class-imbalanced data by fine-tuning ImageNet-pretrained transfer learning models in PyTorch',
      'Established a benchmark for the pretrained models by adapting a custom CNN baseline and tuning it with a two-stage grid search over hidden-layer size and learning rate',
      'Traced weak melanoma recall to class imbalance rather than model capacity by diagnosing overfitting through learning curves and confusion matrices, presented in a co-authored research paper',
    ],
    tags: ['PyTorch', 'TorchVision', 'Scikit-learn', 'Transfer Learning', 'CNNs'],
  },
  {
    id: 'pyxis',
    title: 'Pyxis',
    tagline: "A stargazing companion app that tells you when it's worth looking up.",
    period: 'Oct 2026 – Present',
    featured: true,
    categories: ['frontend', 'backend'],
    highlights: [
      'Led a 5-person team from concept to a working MVP demo by planning the project, splitting work into GitLab feature branches, and integrating auth, location, calendar, and navigation into main through merge requests',
      "Told users when it's worth looking up with a 0–100 visibility score by designing a model that combines cloud cover, precipitation chance, light pollution (Bortle scale), and time of day",
      'Helped users plan around upcoming sightings by building celestial event tracking that surfaces events on an in-app calendar',
      'Laid the authentication foundation by configuring Firebase for the Flutter app and writing the core Firebase Auth service',
    ],
    tags: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'GitLab'],
  },
  {
    id: 'nyc-opendata-heatmap',
    title: 'NYC OpenData Heatmap',
    tagline: 'A live geospatial heatmap of New York City data, built for civic analysts.',
    period: 'Jan – Apr 2026',
    featured: true,
    categories: ['backend', 'frontend'],
    highlights: [
      'Kept heatmap data no more than 3 hours stale by building a scheduled job that fetches NYC OpenData records and stores them with Spring Data JPA',
      'Gave civic analysts a geospatial heatmap of New York City data by developing RESTful API endpoints in Java and Spring Boot',
      'Replaced a manual QA process with automated testing and Docker deployment on every change by setting up a GitLab CI/CD pipeline',
    ],
    tags: ['Java', 'Spring Boot', 'Spring Data JPA', 'React', 'Docker', 'GitLab CI/CD'],
  },
  {
    id: 'socis-incubator',
    title: 'SOCIS Incubator Platform',
    tagline: 'The home base for a program connecting students with recruiters, researchers, and faculty.',
    period: '2026 – Present',
    featured: true,
    categories: ['frontend', 'backend'],
    highlights: [
      "Laid the groundwork for SOCIS's upcoming Incubator Program, bringing recruiters, researchers, and faculty together with students, by building a full-stack platform with Next.js, TypeScript, and Supabase (PostgreSQL)",
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    tagline: "The site you're on right now — space-themed, hand-built, and still growing.",
    period: '2026 – Present',
    featured: false,
    categories: ['frontend'],
    highlights: [
      'Built a recruiter-friendly personal site with a filterable experience timeline and an interactive canvas starfield using React, TypeScript, Tailwind CSS, and Framer Motion, with lint and build checks on every push via GitHub Actions',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions'],
    links: {
      github: 'https://github.com/Sheil-ptl/Portfolio',
    },
  },
]
