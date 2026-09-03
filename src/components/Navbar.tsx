import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 border-b">
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/experience">Experiences</Link>
      <Link to="/about">About</Link>
      <Link to="/wander">Wander</Link>
    </nav>
  )
}