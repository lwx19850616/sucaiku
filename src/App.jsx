import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Background from './components/Background.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import AiTools from './components/AiTools.jsx'
import Showcase from './components/Showcase.jsx'
import Contact from './components/Contact.jsx'
import ToolTutorial from './components/ToolTutorial.jsx'
import PageAgentDemo from './components/PageAgentDemo.jsx'
import SlidesViewer from './components/SlidesViewer.jsx'

/* ============================================================
   Hash 路由（兼容 GitHub Pages 静态托管，无需后端 fallback）
   ============================================================ */
function getRoute() {
  const hash = window.location.hash
  if (hash.startsWith('#/')) return hash.slice(2)
  return null
}

const TUTORIAL_IDS = ['cc-switch', 'open-design', 'ai-website-cloner', 'shannon', 'daily-stock-analysis', 'open-cli']

function SubPage({ route }) {
  if (route === 'page-agent') return <PageAgentDemo />
  if (route === 'frontend-slides') return <SlidesViewer />
  if (TUTORIAL_IDS.includes(route)) return <ToolTutorial toolId={route} />
  return (
    <div className="flex min-h-screen items-center justify-center px-5 text-center">
      <div className="glass rounded-2xl px-8 py-10">
        <p className="text-lg font-semibold">页面不存在</p>
        <button
          onClick={() => (window.location.hash = '')}
          className="mt-4 rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white"
        >
          返回首页
        </button>
      </div>
    </div>
  )
}

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
  const [route, setRoute] = useState(getRoute())
  const [pendingScroll, setPendingScroll] = useState(null)

  // 监听 hash 变化 → 切换路由
  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // 从子页面返回首页后，滚动到目标板块
  useEffect(() => {
    if (route === null && pendingScroll) {
      const id = pendingScroll
      setPendingScroll(null)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [route, pendingScroll])

  // 导航点击：子页面时先回首页再滚动；首页时直接滚动
  const onNavigate = (id) => {
    if (route !== null) {
      setPendingScroll(id)
      if (window.location.hash) window.location.hash = ''
      else setRoute(null)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onHome = () => onNavigate('home')
  const isSub = route !== null

  return (
    <>
      <Background />
      <CustomCursor />
      {!isSub && <ScrollProgress />}
      <Intro onDone={() => setIntroDone(true)} />
      <Navbar route={route} onNavigate={onNavigate} onHome={onHome} />

      {/* 子页面或首页主体；入场遮罩存在时禁止底层交互 */}
      <div className={introDone || isSub ? '' : 'pointer-events-none'}>
        {isSub ? (
          <SubPage route={route} />
        ) : (
          <main>
            <Hero />
            <Skills />
            <Experience />
            <Projects />
            <AiTools />
            <Showcase />
            <Contact />
          </main>
        )}
      </div>
    </>
  )
}
