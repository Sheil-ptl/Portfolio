import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/wander', label: 'Wander' },
]

export default function Navbar() {
  return (
    <nav className="flex justify-start gap-3 px-8 py-4 bg-black border-b border-gray-800">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-semibold rounded-lg bg-black transition ${
              isActive
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}