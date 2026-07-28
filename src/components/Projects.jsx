import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { projects } from '../data.js'

function Chevron({ dir }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${dir === 'left' ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

export default function Projects() {
  const viewportRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(360)
  const [maxIndex, setMaxIndex] = useState(0)

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth
      const card = w < 640 ? 280 : w < 1024 ? 340 : 384
      const s = card + 20
      const visible = Math.max(
        1,
        Math.floor((viewportRef.current?.clientWidth || w) / s)
      )
      setStep(s)
      setMaxIndex(Math.max(0, projects.length - visible))
      setIndex((idx) => Math.min(idx, Math.max(0, projects.length - visible)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Projects
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            精选作品
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="上一个"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/40 backdrop-blur transition-colors hover:bg-muted disabled:opacity-40"
            disabled={index === 0}
          >
            <Chevron dir="left" />
          </button>
          <button
            onClick={next}
            aria-label="下一个"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/40 backdrop-blur transition-colors hover:bg-muted disabled:opacity-40"
            disabled={index >= maxIndex}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </Reveal>

      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          className="flex cursor-grab gap-5 active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -maxIndex * step, right: 0 }}
          dragElastic={0.12}
          animate={{ x: -index * step }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          onDragEnd={(e, info) => {
            const moved = info.offset.x
            let ni = index - Math.round(-moved / step)
            ni = Math.max(0, Math.min(maxIndex, ni))
            setIndex(ni)
          }}
        >
          {projects.map((p) => (
            <article
              key={p.title}
              data-cursor
              className="group w-[280px] flex-shrink-0 sm:w-[340px] lg:w-[384px]"
            >
              <div className="glass relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={`打开 ${p.title}`}
                  >
                    <Chevron dir="right" />
                  </a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      {/* 进度点 */}
      <div className="mt-7 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            aria-label={`第 ${i + 1} 屏`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-brand' : 'w-2 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
