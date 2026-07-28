import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ============================================================
   React Bits · Text 组件全集（共 23 个，全部可实时预览）
   纯前端实现：Vite + React + Framer Motion，无外部依赖
   ============================================================ */

/* 1. Ascii Text —— 终端风格 ASCII 文字 */
function AsciiText({ text = 'REACT' }) {
  return (
    <div className="rounded-md border border-emerald-500/30 bg-black/50 px-3 py-2 font-mono text-[11px] leading-[1.15] text-emerald-300">
      <div className="mb-1 text-emerald-500/70">$ echo {text}</div>
      <pre className="whitespace-pre">{text}</pre>
      <span className="inline-block h-3 w-2 animate-pulse bg-emerald-400 align-middle" />
    </div>
  )
}

/* 2. Blur Text —— 逐词由模糊转清晰（循环） */
function BlurText({ text = 'Hello World' }) {
  const words = text.split(' ')
  return (
    <h3 className="text-xl font-bold">
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="mr-2 inline-block"
          animate={{ filter: ['blur(10px)', 'blur(0px)'], opacity: [0, 1] }}
          transition={{ duration: 1.1, delay: i * 0.15, repeat: Infinity, repeatDelay: 1.8 }}
        >
          {w}
        </motion.span>
      ))}
    </h3>
  )
}

/* 3. Circular Text —— 绕圆旋转的环形文字 */
function CircularText({ text = 'REACT BITS • TEXT • ' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 200 200" className="h-28 w-28 animate-[spin_14s_linear_infinite]">
      <defs>
        <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <text className="fill-foreground text-[15px] font-semibold" style={{ fontFamily: 'monospace' }}>
        <textPath href={`#${id}`} startOffset="0">
          {text.repeat(2)}
        </textPath>
      </text>
    </svg>
  )
}

/* 4. Count Up —— 数字缓动递增 */
function CountUp({ to = 2026, suffix = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    let start
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
  return (
    <span className="font-mono text-3xl font-bold tabular-nums text-brand">
      {n}
      {suffix}
    </span>
  )
}

/* 5. Curved Loop —— 沿弧线滚动的文字 */
function CurvedLoop({ text = 'CURVED • LOOP • ' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 300 120" className="w-full max-w-[15rem]">
      <defs>
        <path id={id} d="M10,95 Q150,5 290,95" fill="none" />
      </defs>
      <text className="fill-foreground text-[15px] font-semibold">
        <textPath href={`#${id}`} startOffset="0%">
          <animate attributeName="startOffset" from="0%" to="100%" dur="7s" repeatCount="indefinite" />
          {text.repeat(3)}
        </textPath>
      </text>
    </svg>
  )
}

/* 6. Decrypted Text —— 乱码解密为真实文字 */
function DecryptedText({ text = 'DECRYPTED' }) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
  const [out, setOut] = useState(text)
  useEffect(() => {
    const run = () => {
      let iteration = 0
      const id = setInterval(() => {
        setOut(
          text
            .split('')
            .map((ch, i) => (i < iteration ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
            .join('')
        )
        iteration += 1 / 3
        if (iteration >= text.length) {
          clearInterval(id)
          setOut(text)
        }
      }, 30)
    }
    run()
    const iv = setInterval(run, 3600)
    return () => clearInterval(iv)
  }, [text])
  return <span className="font-mono text-xl tracking-widest text-brand">{out}</span>
}

/* 7. Falling Text —— 字母带弹性落下 */
function FallingText({ text = 'FALLING' }) {
  return (
    <h3 className="text-2xl font-black">
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: -42, opacity: 0, rotate: -12 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 12,
            delay: i * 0.08,
            repeat: Infinity,
            repeatDelay: 2.6,
            repeatType: 'reverse',
          }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </h3>
  )
}

/* 8. Fuzzy Text —— 模糊文字，悬停变清晰 */
function FuzzyText({ text = 'FUZZY' }) {
  const ref = useRef(null)
  const [blur, setBlur] = useState(3)
  return (
    <span
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        const d = Math.abs(e.clientX - (r.left + r.width / 2))
        setBlur(Math.max(0, d / 45))
      }}
      onMouseLeave={() => setBlur(3)}
      className="cursor-default text-3xl font-black"
      style={{ filter: `blur(${blur}px)` }}
    >
      {text}
    </span>
  )
}

/* 9. Glitch Text —— RGB 错位故障感 */
function GlitchText({ text = 'GLITCH' }) {
  return (
    <span className="relative inline-block text-3xl font-black tracking-wider">
      <span className="absolute inset-0 text-cyan-400 animate-[glitch-x_2s_infinite] mix-blend-screen">
        {text}
      </span>
      <span className="absolute inset-0 text-pink-500 animate-[glitch-y_2.4s_infinite] mix-blend-screen">
        {text}
      </span>
      <span className="relative">{text}</span>
    </span>
  )
}

/* 10. Gradient Text —— 流动渐变文字 */
function GradientText({ text = 'GRADIENT' }) {
  return <span className="text-3xl font-black text-gradient-brand">{text}</span>
}

/* 11. Rotating Text —— 单槽循环轮换词语 */
function RotatingText({ words = ['DESIGN', 'MOTION', 'CODE', 'LOVE'] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 1500)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="inline-flex h-9 items-center overflow-hidden text-2xl font-bold text-brand">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="px-1"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* 12. Scrambled Text —— 持续打乱重排 */
function ScrambledText({ text = 'SCRAMBLE' }) {
  const CHARS = '!<>-_\\/[]{}—=+*^?#'
  const [out, setOut] = useState(text)
  useEffect(() => {
    const scramble = () => {
      let iteration = 0
      const id = setInterval(() => {
        setOut(
          text
            .split('')
            .map((ch, i) => (i < iteration ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
            .join('')
        )
        iteration += 0.5
        if (iteration >= text.length) {
          clearInterval(id)
          setOut(text)
        }
      }, 40)
      setTimeout(() => clearInterval(id), text.length * 40 + 60)
    }
    scramble()
    const iv = setInterval(scramble, 2800)
    return () => clearInterval(iv)
  }, [text])
  return <span className="font-mono text-xl text-foreground/80">{out}</span>
}

/* 13. Scroll Float —— 上下漂浮 */
function ScrollFloat({ text = 'FLOATING' }) {
  return (
    <motion.h3
      className="text-2xl font-bold"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {text}
    </motion.h3>
  )
}

/* 14. Scroll Reveal —— 字母逐个上浮揭示 */
function ScrollReveal({ text = 'REVEAL' }) {
  return (
    <h3 className="text-2xl font-black">
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * 0.09,
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            repeatType: 'reverse',
          }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </h3>
  )
}

/* 15. Scroll Velocity —— 横向滚动字幕，速度脉动 */
function ScrollVelocity({ text = 'VELOCITY • ' }) {
  const [speed, setSpeed] = useState(14)
  useEffect(() => {
    const iv = setInterval(() => setSpeed((s) => (s > 10 ? 5 : 18)), 1300)
    return () => clearInterval(iv)
  }, [])
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="inline-flex whitespace-nowrap text-xl font-bold"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <span className="px-3">{text.repeat(8)}</span>
        <span className="px-3">{text.repeat(8)}</span>
      </div>
    </div>
  )
}

/* 16. Shiny Text —— 高光扫过 */
function ShinyText({ text = 'SHINY' }) {
  return (
    <span
      className="text-3xl font-black"
      style={{
        backgroundImage: 'linear-gradient(110deg,#9ca3af 40%,#fff 50%,#9ca3af 60%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: 'shiny-sweep 3s linear infinite',
      }}
    >
      {text}
    </span>
  )
}

/* 17. Shuffle —— 字母乱序后归位 */
function Shuffle({ text = 'SHUFFLE' }) {
  const base = text.split('')
  const [order, setOrder] = useState(base.map((_, i) => i))
  useEffect(() => {
    const iv = setInterval(() => {
      setOrder([...base.map((_, i) => i)].sort(() => Math.random() - 0.5))
    }, 1800)
    return () => clearInterval(iv)
  }, [])
  return (
    <h3 className="flex text-2xl font-bold">
      {order.map((idx, i) => (
        <motion.span
          key={i}
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="inline-block"
        >
          {base[idx] === ' ' ? ' ' : base[idx]}
        </motion.span>
      ))}
    </h3>
  )
}

/* 18. Split Text —— 字母四散再回弹 */
function SplitText({ text = 'SPLIT' }) {
  return (
    <h3 className="text-2xl font-black">
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ x: [0, i % 2 ? 9 : -9, 0], y: [0, i % 2 ? -7 : 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </h3>
  )
}

/* 19. Text Cursor —— 跟随光标的自定义光标 */
function TextCursor() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [on, setOn] = useState(false)
  return (
    <div
      ref={ref}
      className="relative flex h-16 items-center justify-center"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
        setOn(true)
      }}
      onMouseLeave={() => setOn(false)}
    >
      <span className="text-2xl font-bold">HOVER ME</span>
      <motion.span
        className="pointer-events-none absolute rounded-full border-2 border-brand mix-blend-difference"
        style={{ width: 26, height: 26 }}
        animate={{ x: pos.x - 13, y: pos.y - 13, scale: on ? 1 : 0.4, opacity: on ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </div>
  )
}

/* 20. Text Pressure —— 鼠标附近字母被“压”大 */
function PressureLetter({ c, mx }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const d = Math.abs(mx - cx)
    setScale(Math.max(0.75, 1.45 - d / 130))
  }, [mx])
  return (
    <motion.span
      ref={ref}
      className="inline-block"
      animate={{ scale, letterSpacing: `${(scale - 1) * 6}px` }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {c === ' ' ? ' ' : c}
    </motion.span>
  )
}
function TextPressure({ text = 'PRESSURE' }) {
  const ref = useRef(null)
  const [mx, setMx] = useState(-999)
  return (
    <div
      ref={ref}
      className="flex cursor-default text-2xl font-black"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        setMx(e.clientX - r.left)
      }}
      onMouseLeave={() => setMx(-999)}
    >
      {text.split('').map((c, i) => (
        <PressureLetter key={i} c={c} mx={mx} />
      ))}
    </div>
  )
}

/* 21. Text Type —— 打字机循环多句 */
function TextType({ phrases = ['你好', '世界', 'REACT', 'BITS'] }) {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const cur = phrases[pi]
    const id = setTimeout(() => {
      if (!deleting) {
        setText(cur.slice(0, text.length + 1))
        if (text === cur) setDeleting(true)
      } else {
        setText(cur.slice(0, text.length - 1))
        if (text === '') {
          setDeleting(false)
          setPi((p) => (p + 1) % phrases.length)
        }
      }
    }, deleting ? 60 : 110)
    return () => clearTimeout(id)
  }, [text, deleting, pi, phrases])
  return (
    <span className="font-mono text-xl">
      {text}
      <span className="animate-pulse text-brand">|</span>
    </span>
  )
}

/* 22. True Focus —— 除悬停项外其余模糊 */
function TrueFocus({ words = ['FOCUS', 'BLUR', 'SHARP', 'CLEAR'] }) {
  const [h, setH] = useState(-1)
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {words.map((w, i) => (
        <span
          key={i}
          onMouseEnter={() => setH(i)}
          onMouseLeave={() => setH(-1)}
          className="cursor-default text-lg font-semibold transition-all duration-300"
          style={{ filter: h === i ? 'blur(0px)' : 'blur(3px)', opacity: h === i ? 1 : 0.5 }}
        >
          {w}
        </span>
      ))}
    </div>
  )
}

/* 23. Variable Proximity —— 字母随鼠标远近缩放/疏密 */
function VPLetter({ c, mx }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const d = Math.abs(mx - cx)
    setScale(Math.max(0.8, 1.5 - d / 140))
  }, [mx])
  return (
    <motion.span
      ref={ref}
      className="inline-block"
      animate={{ scale, letterSpacing: `${(scale - 1) * 8}px` }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {c === ' ' ? ' ' : c}
    </motion.span>
  )
}
function VariableProximity({ text = 'PROXIMITY' }) {
  const ref = useRef(null)
  const [mx, setMx] = useState(-999)
  return (
    <div
      ref={ref}
      className="flex cursor-default text-2xl font-bold"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        setMx(e.clientX - r.left)
      }}
      onMouseLeave={() => setMx(-999)}
    >
      {text.split('').map((c, i) => (
        <VPLetter key={i} c={c} mx={mx} />
      ))}
    </div>
  )
}

/* ============================================================
   画廊导出
   ============================================================ */
export const textBits = [
  { id: 'ascii-text', name: 'Ascii Text', Comp: AsciiText },
  { id: 'blur-text', name: 'Blur Text', Comp: BlurText },
  { id: 'circular-text', name: 'Circular Text', Comp: CircularText },
  { id: 'count-up', name: 'Count Up', Comp: CountUp },
  { id: 'curved-loop', name: 'Curved Loop', Comp: CurvedLoop },
  { id: 'decrypted-text', name: 'Decrypted Text', Comp: DecryptedText },
  { id: 'falling-text', name: 'Falling Text', Comp: FallingText },
  { id: 'fuzzy-text', name: 'Fuzzy Text', Comp: FuzzyText },
  { id: 'glitch-text', name: 'Glitch Text', Comp: GlitchText },
  { id: 'gradient-text', name: 'Gradient Text', Comp: GradientText },
  { id: 'rotating-text', name: 'Rotating Text', Comp: RotatingText },
  { id: 'scrambled-text', name: 'Scrambled Text', Comp: ScrambledText },
  { id: 'scroll-float', name: 'Scroll Float', Comp: ScrollFloat },
  { id: 'scroll-reveal', name: 'Scroll Reveal', Comp: ScrollReveal },
  { id: 'scroll-velocity', name: 'Scroll Velocity', Comp: ScrollVelocity },
  { id: 'shiny-text', name: 'Shiny Text', Comp: ShinyText },
  { id: 'shuffle', name: 'Shuffle', Comp: Shuffle },
  { id: 'split-text', name: 'Split Text', Comp: SplitText },
  { id: 'text-cursor', name: 'Text Cursor', Comp: TextCursor },
  { id: 'text-pressure', name: 'Text Pressure', Comp: TextPressure },
  { id: 'text-type', name: 'Text Type', Comp: TextType },
  { id: 'true-focus', name: 'True Focus', Comp: TrueFocus },
  { id: 'variable-proximity', name: 'Variable Proximity', Comp: VariableProximity },
]

export function TextBitsGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {textBits.map((t) => (
        <div
          key={t.id}
          className="glass flex flex-col items-center justify-center gap-3 rounded-2xl p-6"
        >
          <div className="flex h-24 w-full items-center justify-center overflow-hidden">
            <t.Comp />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
        </div>
      ))}
    </div>
  )
}
