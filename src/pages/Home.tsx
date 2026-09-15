import { motion } from 'framer-motion'
import ParticleField from '../components/ParticleField'
import Constellation from '../components/Constellation'
import resumePDF from '../assets/Sheil_Patel_Resume.pdf'

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

      <div className="absolute bottom-0 right-0 p-8 md:p-12 max-w-xl">
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
          <p className="text-xs md:text-sm tracking-widest uppercase text-gray-400 italic mb-3 text-left">
            I build things, break things, and sometimes fix things.
            My name's Sheil.
          </p>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 max-w-md text-left">
            I'm a 4th-year Computer Science student at the
            University of Guelph, and{' '}
            <a
              href="https://socis.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-gray-300 transition"
            >
              VP Internal of SOCIS
            </a>
            .
            <br />
            <br />
            Outside of school, I compete nationally and internationally as a{' '}
            <a
              href="https://fitofan.com/u911056872"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-gray-300 transition"
            >
              WushuCanada Athlete
            </a>
            .
          </p>

          <div className="flex flex-wrap justify-start gap-3">
            <a 
              href="https://www.linkedin.com/in/sheil-patel-a7a00b319/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition no-underline"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/Sheil-ptl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition no-underline"
            >
              GitHub
            </a>
            <a 
              href={resumePDF} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition no-underline"
            >
              Resume
            </a>
            <a 
              href="mailto:sheilap5018@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-lg hover:bg-white hover:text-black transition no-underline"
            >
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}