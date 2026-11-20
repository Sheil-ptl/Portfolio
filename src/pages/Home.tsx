import { motion } from 'framer-motion'
import ParticleField from '../components/ParticleField'
// import Constellation from '../components/Constellation'
import StatusPanel from '../components/StatusPanel'
import resumePDF from '../assets/Sheil_Patel_Resume.pdf'

// Mobile/tablet: hero then status panel, stacked and scrollable.
// Desktop (lg): one screen, panel top-left and hero bottom-right.
export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100dvh-73px)] w-full flex-col gap-10 bg-black px-6 py-10 lg:block lg:h-[calc(100vh-73px)] lg:overflow-hidden lg:p-0">
      <div className="fixed inset-0">
        <ParticleField />
      </div>
      {/* <Constellation /> */}
      <div
        className="absolute bottom-0 right-0 hidden w-[55rem] h-2/3 pointer-events-none lg:block"
        style={{
          background:
            'radial-gradient(circle at bottom right, black 20%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        className="relative order-2 w-full max-w-md lg:absolute lg:left-12 lg:top-10 lg:max-h-[calc(100%-5rem)] lg:w-[24rem] lg:max-w-none lg:overflow-y-auto lg:[scrollbar-color:var(--color-gray-700)_transparent] lg:[scrollbar-width:thin] xl:top-auto xl:bottom-12 xl:w-[36rem] 2xl:w-[46rem]"
      >
        <StatusPanel />
      </motion.div>

      <div className="relative order-1 max-w-xl lg:absolute lg:bottom-0 lg:right-0 lg:p-12">
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