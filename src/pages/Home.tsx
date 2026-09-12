import { motion } from 'framer-motion'
import ParticleField from '../components/ParticleField'
import Constellation from '../components/Constellation'

export default function Home() {
  return (
    <div className="relative w-full h-[calc(100vh-73px)] overflow-hidden bg-black">
      <ParticleField />
      <Constellation />

      <div
        className="absolute bottom-0 right-0 w-full md:w-[55rem] h-2/3 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at bottom right, black 20%, transparent 70%)',
        }}
      />

      <div className="absolute bottom-0 right-0 p-8 md:p-12 max-w-xl text-right">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-space-grotesk text-3xl md:text-5xl font-bold text-white mb-6 text-left"
        >
          I like space, do you like space?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <p className="text-xs md:text-sm tracking-widest uppercase text-gray-400 italic mb-6 leading-relaxed text-left">
            I build things, break things, and sometimes fix things.
            <br />
            My name's Sheil.
          </p>

          <div className="flex flex-wrap justify-right gap-3">
            <button className="px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition">
              LinkedIn
            </button>
            <button className="px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition">
              GitHub
            </button>
            <button className="px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition">
              Resume
            </button>
            <button className="px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition">
              Email
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}