import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { aiTools } from '../data.js'

export default function AiTools() {
  return (
    <section id="ai-tools" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
            AI Toolbox
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            AI 工具箱
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            精选 8 个值得一试的 AI 开源项目。点击卡片进入教程或在线体验 ——
            其中 2 个可直接交互，6 个附带手把手教程。
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aiTools.map((tool, i) => (
          <Reveal key={tool.id} delay={i * 0.06}>
            <motion.button
              type="button"
              onClick={() => (window.location.hash = `#/${tool.id}`)}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group glass relative flex h-full w-full flex-col items-start gap-3 rounded-2xl p-6 text-left transition-colors hover:border-brand/50"
            >
              {tool.type === 'demo' && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  可体验
                </span>
              )}

              <span className="text-4xl">{tool.icon}</span>
              <div>
                <h3 className="text-lg font-bold">{tool.name}</h3>
                <p className="text-xs font-medium text-brand">{tool.tagline}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tool.desc}
              </p>

              <div className="mt-auto flex w-full items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  {tool.type === 'demo' ? '在线演示 →' : '查看教程 →'}
                </span>
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  GitHub ↗
                </a>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
