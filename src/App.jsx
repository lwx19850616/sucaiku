import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Background from './components/Background.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand to-rose-400"
      style={{ scaleX }}
    />
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <Background />
      <CustomCursor />
      <ScrollProgress />
      <Intro onDone={() => setIntroDone(true)} />
      <Navbar />

      {/* 入场遮罩存在时禁止底层交互 */}
      <div className={introDone ? '' : 'pointer-events-none'}>
        <main>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}
