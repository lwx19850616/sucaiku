import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { showcase } from '../data.js'
import Starfield from './Starfield.jsx'
import { TextBitsGallery } from './TextBits.jsx'

/* ============================================================
   缩略图（卡片上的迷你预览）
   ============================================================ */
function Thumb({ type, accent }) {
  if (type === 'fonts')
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1">
        <span
          className="text-6xl font-black leading-none"
          style={{ color: accent, textShadow: `0 0 30px ${accent}55` }}
        >
          Aa
        </span>
        <span className="text-[10px] tracking-[0.3em] text-white/50">INTER · SERIF</span>
      </div>
    )
  if (type === 'components')
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.span
          className="rounded-full px-5 py-2 text-sm font-semibold text-white"
          style={{ background: accent, boxShadow: `0 0 30px ${accent}66` }}
          animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          悬停我
        </motion.span>
        <span className="absolute bottom-3 text-[10px] tracking-[0.3em] text-white/50">
          MICRO · INTERACTION
        </span>
      </div>
    )
  // backgrounds
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #1e3a8a55, transparent 60%), radial-gradient(circle at 70% 70%, #6d28d955, transparent 60%), #05060c',
        }}
      />
      <div className="absolute inset-0">
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: 1 + (i % 3),
              height: 1 + (i % 3),
              opacity: 0.4 + ((i % 4) * 0.15),
              animation: `twinkle ${(2 + (i % 3))}s ease-in-out ${(i % 5) * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white/60">
        SPACE · FX
      </span>
    </div>
  )
}

/* ============================================================
   1) 文字组件演示（React Bits 23 个 Text 组件画廊）
   ============================================================ */

/* ============================================================
   2) 组件动画演示
   ============================================================ */
function MagneticButton() {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }
  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-transform duration-200 ease-out"
    >
      把光标靠近我 ✦
    </button>
  )
}

function Counter() {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const dur = 1400
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(eased * 128))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="font-mono text-5xl font-bold text-foreground">
      {n}
      <span className="ml-1 text-2xl text-brand">+</span>
    </div>
  )
}

function Typewriter() {
  const full = '用动效讲述产品的故事。'
  const [t, setT] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setT(full.slice(0, i))
      if (i >= full.length) clearInterval(id)
    }, 90)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="text-lg text-foreground">
      {t}
      <span className="ml-0.5 animate-pulse text-brand">|</span>
    </p>
  )
}

function ComponentsDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="glass flex flex-col items-center justify-center gap-4 rounded-2xl p-8">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">磁性按钮</span>
        <MagneticButton />
      </div>

      <div className="glass flex flex-col items-center justify-center gap-2 rounded-2xl p-8">
        <span className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">数字滚动</span>
        <Counter />
        <span className="text-xs text-muted-foreground">次交互 · 平滑递增</span>
      </div>

      <div className="glass flex flex-col items-center justify-center gap-3 rounded-2xl p-8">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">打字机</span>
        <Typewriter />
      </div>

      <div className="glass group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1.5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-50" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">悬停浮起卡片</span>
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          状态：在线
        </div>
        <p className="text-center text-xs text-muted-foreground">
          玻璃拟态 + 悬停微光，细腻而不张扬。
        </p>
      </div>
    </div>
  )
}

/* ============================================================
   3) 背景特效演示（可切换）
   ============================================================ */
const bgOptions = [
  { id: 'stars', label: '星空' },
  { id: 'nebula', label: '星云' },
  { id: 'grid', label: '网格' },
  { id: 'aurora', label: '极光' },
]

function BgPreview({ id }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {id === 'stars' && <Starfield />}
      {id === 'nebula' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 30% 20%, rgba(99,102,241,0.35), transparent), radial-gradient(ellipse 60% 45% at 75% 70%, rgba(217,70,239,0.28), transparent), #05060c',
          }}
        />
      )}
      {id === 'grid' && (
        <div className="absolute inset-0 bg-grid opacity-40">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, transparent 30%, #05060c 100%)',
            }}
          />
        </div>
      )}
      {id === 'aurora' && (
        <div className="absolute inset-0 bg-[#05060c]">
          {['#22d3ee', '#818cf8', '#e879f9'].map((c, i) => (
            <motion.div
              key={c}
              className="absolute left-0 right-0 h-40 blur-3xl"
              style={{
                top: `${15 + i * 22}%`,
                background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
                opacity: 0.5,
              }}
              animate={{ x: ['-30%', '30%', '-30%'] }}
              transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  )
}

function BackgroundsDemo() {
  const [bg, setBg] = useState('stars')
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {bgOptions.map((o) => (
          <button
            key={o.id}
            onClick={() => setBg(o.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              bg === o.id
                ? 'bg-brand text-white'
                : 'border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="relative h-[22rem] overflow-hidden rounded-2xl border border-border">
        <BgPreview id={bg} />
        <div className="absolute left-4 top-4 text-sm font-medium text-white/80">
          {bgOptions.find((o) => o.id === bg)?.label} · 实时预览
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        所有背景均为前端实时绘制（Canvas / CSS），无图片资源，移动端也能流畅运行。
      </p>
    </div>
  )
}

/* ============================================================
   全屏演示视图
   ============================================================ */
const detailMap = {
  fonts: { title: '文字组件', en: 'React Bits · Text', Comp: TextBitsGallery },
  components: { title: '组件动画', en: 'Components', Comp: ComponentsDemo },
  backgrounds: { title: '背景特效', en: 'Backgrounds', Comp: BackgroundsDemo },
}

function DetailView({ id, onClose }) {
  const meta = detailMap[id]
  if (!meta) return null
  const { Comp } = meta
  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto bg-black/70 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="mx-auto my-10 max-w-5xl rounded-3xl border border-border bg-card/80 p-7 shadow-2xl sm:p-10"
        initial={{ y: 30, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.98, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-7 flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {meta.en}
            </p>
            <h3 className="mt-1 text-2xl font-extrabold sm:text-3xl">{meta.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <Comp />
      </motion.div>
    </motion.div>
  )
}

/* ============================================================
   Showcase 区块（预览卡片网格 + 全屏演示）
   ============================================================ */
export default function Showcase() {
  const [active, setActive] = useState(null)

  // 打开时锁定底层滚动
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  // ESC 关闭
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <section id="showcase" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Playground
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            互动演示
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            点击任意预览卡片，进入全屏演示。这里汇集了我在字体、动效与太空背景上的实验。
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((card) => (
            <button
              key={card.id}
              data-cursor
              onClick={() => setActive(card.id)}
              className="group text-left"
            >
              <div className="glass overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative h-44 overflow-hidden">
                  <Thumb type={card.preview} accent={card.accent} />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 60px ${card.accent}55` }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{card.title}</h3>
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ background: `${card.accent}22`, color: card.accent }}
                    >
                      {card.en}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    进入演示
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && <DetailView id={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}
