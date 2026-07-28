import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ============================================================
   React Bits · Animations 组件全集（共 31 个，全部可实时预览）
   纯前端实现：Vite + React + Framer Motion，无外部依赖
   ============================================================ */

/* 1. Animated List —— 列表项依次入场 */
function AnimatedList() {
  const items = ['探索', '设计', '构建', '交付']
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <motion.li
          key={t}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          className="rounded-lg bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand"
        >
          {t}
        </motion.li>
      ))}
    </ul>
  )
}

/* 2. Animated Beam —— 光束流动 */
function AnimatedBeam() {
  return (
    <div className="relative h-16 w-full overflow-hidden rounded-xl bg-white/5">
      <motion.div
        className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-brand to-transparent blur-md"
        animate={{ left: ['-20%', '110%'] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
        Loading experience…
      </div>
    </div>
  )
}

/* 3. Aurora —— 极光流动背景 */
function Aurora() {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-2xl bg-black/40">
      {['#22d3ee', '#818cf8', '#e879f9'].map((c, i) => (
        <motion.div
          key={c}
          className="absolute left-0 right-0 h-16 blur-2xl"
          style={{
            top: `${10 + i * 25}%`,
            background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
            opacity: 0.55,
          }}
          animate={{ x: ['-40%', '40%', '-40%'] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* 4. Ballpit —— 弹跳小球 */
function Ballpit() {
  return (
    <div className="flex h-20 items-end justify-center gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="h-4 w-4 rounded-full"
          style={{ background: ['#fb7185', '#a78bfa', '#38bdf8', '#34d399', '#fbbf24'][i] }}
          animate={{ y: [0, -28, 0] }}
          transition={{ duration: 0.7, delay: i * 0.1, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/* 5. Blur Fade —— 模糊淡入 */
function BlurFade() {
  return (
    <motion.div
      className="rounded-2xl bg-gradient-to-br from-brand to-pink-500 px-6 py-4 text-white shadow-lg"
      initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.9 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
    >
      模糊淡入
    </motion.div>
  )
}

/* 6. Dock —— macOS 风格 Dock */
function Dock() {
  const [hover, setHover] = useState(null)
  const icons = ['🚀', '⚡', '🎨', '💻', '🔮']
  return (
    <div className="flex items-end justify-center gap-2 rounded-2xl bg-white/5 px-4 py-3">
      {icons.map((ic, i) => (
        <motion.span
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className="flex cursor-default items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-white/5 shadow"
          animate={{ width: hover === i ? 44 : 32, height: hover === i ? 44 : 32, fontSize: hover === i ? 22 : 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {ic}
        </motion.span>
      ))}
    </div>
  )
}

/* 7. Fade —— 透明度呼吸 */
function Fade() {
  return (
    <motion.div
      className="text-3xl font-black text-brand"
      animate={{ opacity: [0.25, 1, 0.25] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      FADE
    </motion.div>
  )
}

/* 8. Flip Text —— 文字翻转 */
function FlipText() {
  const words = ['创意', '代码', '动效', '产品']
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 1500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex h-12 items-center justify-center overflow-hidden rounded-xl bg-white/5 px-6">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="text-xl font-bold text-foreground"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* 9. Follow Cursor —— 元素跟随光标 */
function FollowCursor() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  return (
    <div
      ref={ref}
      className="relative h-24 w-full overflow-hidden rounded-xl border border-border bg-white/5"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
    >
      <motion.div
        className="pointer-events-none h-8 w-8 rounded-full bg-brand/80 blur-sm"
        animate={{ x: pos.x - 16, y: pos.y - 16 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
        移动鼠标
      </span>
    </div>
  )
}

/* 10. Glow Card —— 发光卡片 */
function GlowCard() {
  return (
    <div className="group relative rounded-2xl bg-zinc-900 p-6">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-brand to-pink-500 opacity-60 blur transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative rounded-xl bg-black px-4 py-3 text-sm font-medium text-white">Hover glow</div>
    </div>
  )
}

/* 11. Gravity —— 重力下落方块 */
function Gravity() {
  return (
    <div className="flex h-20 items-end justify-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-5 w-5 rounded-md bg-brand"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 8, delay: i * 0.12, repeat: Infinity, repeatDelay: 1.2 }}
        />
      ))}
    </div>
  )
}

/* 12. Grid Motion —— 网格波浪 */
function GridMotion() {
  return (
    <div className="grid grid-cols-5 gap-1">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-3 w-3 rounded-sm bg-muted-foreground/30"
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.6, delay: i * 0.05, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

/* 13. Hyperspeed —— 超速线条 */
function Hyperspeed() {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl bg-black">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 rounded-full bg-white"
          style={{ top: `${(i * 53) % 100}%`, left: 0, width: 20 + (i % 30) }}
          animate={{ x: ['-30%', '140%'], opacity: [0, 1, 0] }}
          transition={{ duration: 0.6 + (i % 5) * 0.15, delay: i * 0.05, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

/* 14. Interactive Grid —— 鼠标交互网格 */
function InteractiveGrid() {
  const [hover, setHover] = useState(null)
  return (
    <div className="grid grid-cols-6 gap-1">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 w-4 rounded-sm bg-muted-foreground/20"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          animate={{ scale: hover === i ? 1.6 : 1, backgroundColor: hover === i ? 'hsl(var(--brand))' : 'hsl(var(--muted-foreground) / 0.2)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        />
      ))}
    </div>
  )
}

/* 15. Magnet —— 磁性吸引 */
function Magnet() {
  const ref = useRef(null)
  const [t, setT] = useState({ x: 0, y: 0 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    setT({ x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4 })
  }
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setT({ x: 0, y: 0 })} className="flex h-20 items-center justify-center">
      <motion.div
        className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30"
        animate={{ x: t.x, y: t.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        靠近我
      </motion.div>
    </div>
  )
}

/* 16. Noise —— 噪点纹理 */
function Noise() {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl bg-zinc-900">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-xs text-white/70">Grain noise</span>
    </div>
  )
}

/* 17. Particles —— 粒子上升 */
function Particles() {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl bg-black/40">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-brand"
          style={{ left: `${(i * 37) % 100}%`, bottom: 0 }}
          animate={{ y: [0, -90], opacity: [0, 1, 0], x: [0, (i % 2 ? 12 : -12)] }}
          transition={{ duration: 2 + (i % 3) * 0.4, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

/* 18. Pulse Gradient —— 脉冲渐变 */
function PulseGradient() {
  return (
    <motion.div
      className="h-24 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      animate={{ scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* 19. Ripple —— 水波纹 */
function Ripple() {
  return (
    <div className="relative flex h-20 items-center justify-center">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand/20">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-brand" />
      </span>
    </div>
  )
}

/* 20. Scroll Reveal —— 滚动揭示（简化循环） */
function AnimScrollReveal() {
  return (
    <div className="overflow-hidden rounded-xl bg-white/5 px-4 py-3">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.6 }}
        className="text-lg font-bold text-foreground"
      >
        Scroll Reveal
      </motion.div>
    </div>
  )
}

/* 21. Shimmer Button —— 闪光按钮 */
function ShimmerButton() {
  return (
    <button className="relative overflow-hidden rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
      <span className="relative z-10">Shimmer</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />
    </button>
  )
}

/* 22. Skew Infinite —— 无限倾斜滚动 */
function SkewInfinite() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-brand/10 py-2">
      <motion.div
        className="whitespace-nowrap text-sm font-bold text-brand"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ skewX: -12 }}
      >
        <span className="inline-block px-4">SKew Infinite • Skew Infinite • Skew Infinite • </span>
        <span className="inline-block px-4">SKew Infinite • Skew Infinite • Skew Infinite • </span>
      </motion.div>
    </div>
  )
}

/* 23. Spotlight Card —— 聚光灯卡片 */
function SpotlightCard() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      className="relative overflow-hidden rounded-2xl border border-border bg-white/5 px-5 py-4"
    >
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          left: pos.x,
          top: pos.y,
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, hsl(var(--brand) / 0.45), transparent 70%)',
        }}
      />
      <p className="relative text-sm font-medium">Spotlight Card</p>
    </div>
  )
}

/* 24. Stack —— 堆叠卡片 */
function Stack() {
  const cards = ['#fb7185', '#a78bfa', '#38bdf8']
  const [order, setOrder] = useState([0, 1, 2])
  useEffect(() => {
    const id = setInterval(() => setOrder((o) => [o[1], o[2], o[0]]), 1400)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-20 w-28">
      {order.map((idx, i) => (
        <motion.div
          key={idx}
          className="absolute h-14 w-20 rounded-xl shadow"
          style={{ background: cards[idx], zIndex: order.length - i }}
          animate={{ x: i * 14, y: i * 10, scale: 1 - i * 0.05, rotate: i * 4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        />
      ))}
    </div>
  )
}

/* 25. Star Border —— 星形边框 */
function StarBorder() {
  return (
    <div className="relative inline-block rounded-xl bg-gradient-to-br from-brand to-pink-500 p-[2px]">
      <div className="rounded-xl bg-card px-6 py-3 text-sm font-semibold">Star Border</div>
    </div>
  )
}

/* 26. Text Reveal —— 文字逐字揭示 */
function AnimTextReveal() {
  const text = 'REVEAL'
  return (
    <div className="text-2xl font-black">
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4, repeat: Infinity, repeatDelay: 1.6, repeatType: 'reverse' }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  )
}

/* 27. Thread —— 连线动画 */
function Thread() {
  const path = 'M10,50 Q60,10 110,50 T210,50'
  return (
    <svg viewBox="0 0 220 80" className="w-full max-w-[12rem]">
      <path d={path} fill="none" stroke="hsl(var(--muted-foreground) / 0.25)" strokeWidth="2" />
      <circle r="5" fill="hsl(var(--brand))">
        <animateMotion dur="2.5s" repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  )
}

/* 28. Tilted Card —— 3D 倾斜卡片 */
function TiltedCard() {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  return (
    <div
      ref={ref}
      className="flex h-24 items-center justify-center"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * -20, y: ((e.clientX - r.left) / r.width - 0.5) * 20 })
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 400 }}
    >
      <motion.div
        className="flex h-16 w-28 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-sm font-bold shadow-lg"
        animate={{ rotateX: rot.x, rotateY: rot.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        3D Tilt
      </motion.div>
    </div>
  )
}

/* 29. Wave Text —— 波浪文字 */
function WaveText() {
  const text = 'WAVE'
  return (
    <div className="text-2xl font-black">
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.8, delay: i * 0.08, repeat: Infinity }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  )
}

/* 30. Count Up —— 数字递增 */
function AnimCountUp({ to = 2026 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let start
    let raf
    const dur = 1600
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to])
  return <span className="font-mono text-3xl font-bold text-brand">{n}</span>
}

/* 31. Decrypted Text —— 解密效果 */
function AnimDecrypted({ text = 'DECRYPTED' }) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
  const [out, setOut] = useState(text)
  useEffect(() => {
    const run = () => {
      let it = 0
      const id = setInterval(() => {
        setOut(text.split('').map((ch, i) => (i < it ? ch : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''))
        it += 1 / 3
        if (it >= text.length) {
          clearInterval(id)
          setOut(text)
        }
      }, 30)
    }
    run()
    const iv = setInterval(run, 3600)
    return () => clearInterval(iv)
  }, [text])
  return <span className="font-mono text-lg tracking-widest text-brand">{out}</span>
}

/* ============================================================
   画廊导出
   ============================================================ */
export const animBits = [
  { id: 'animated-list', name: 'Animated List', Comp: AnimatedList },
  { id: 'animated-beam', name: 'Animated Beam', Comp: AnimatedBeam },
  { id: 'aurora', name: 'Aurora', Comp: Aurora },
  { id: 'ballpit', name: 'Ballpit', Comp: Ballpit },
  { id: 'blur-fade', name: 'Blur Fade', Comp: BlurFade },
  { id: 'dock', name: 'Dock', Comp: Dock },
  { id: 'fade', name: 'Fade', Comp: Fade },
  { id: 'flip-text', name: 'Flip Text', Comp: FlipText },
  { id: 'follow-cursor', name: 'Follow Cursor', Comp: FollowCursor },
  { id: 'glow-card', name: 'Glow Card', Comp: GlowCard },
  { id: 'gravity', name: 'Gravity', Comp: Gravity },
  { id: 'grid-motion', name: 'Grid Motion', Comp: GridMotion },
  { id: 'hyperspeed', name: 'Hyperspeed', Comp: Hyperspeed },
  { id: 'interactive-grid', name: 'Interactive Grid', Comp: InteractiveGrid },
  { id: 'magnet', name: 'Magnet', Comp: Magnet },
  { id: 'noise', name: 'Noise', Comp: Noise },
  { id: 'particles', name: 'Particles', Comp: Particles },
  { id: 'pulse-gradient', name: 'Pulse Gradient', Comp: PulseGradient },
  { id: 'ripple', name: 'Ripple', Comp: Ripple },
  { id: 'scroll-reveal', name: 'Scroll Reveal', Comp: AnimScrollReveal },
  { id: 'shimmer-button', name: 'Shimmer Button', Comp: ShimmerButton },
  { id: 'skew-infinite', name: 'Skew Infinite', Comp: SkewInfinite },
  { id: 'spotlight-card', name: 'Spotlight Card', Comp: SpotlightCard },
  { id: 'stack', name: 'Stack', Comp: Stack },
  { id: 'star-border', name: 'Star Border', Comp: StarBorder },
  { id: 'text-reveal', name: 'Text Reveal', Comp: AnimTextReveal },
  { id: 'thread', name: 'Thread', Comp: Thread },
  { id: 'tilted-card', name: 'Tilted Card', Comp: TiltedCard },
  { id: 'wave-text', name: 'Wave Text', Comp: WaveText },
  { id: 'count-up', name: 'Count Up', Comp: AnimCountUp },
  { id: 'decrypted-text', name: 'Decrypted Text', Comp: AnimDecrypted },
]

export default function AnimBitsGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {animBits.map((a) => (
        <div
          key={a.id}
          className="glass flex flex-col items-center justify-center gap-3 rounded-2xl p-5"
        >
          <div className="flex h-28 w-full items-center justify-center overflow-hidden">
            <a.Comp />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{a.name}</span>
        </div>
      ))}
    </div>
  )
}
