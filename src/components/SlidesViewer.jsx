import { useState } from 'react'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL // 生产为 /sucaiku/，本地为 /

const decks = [
  { id: 'portfolio', label: '个人作品集', file: 'slides/portfolio.html' },
  { id: 'catalog', label: '包材产品目录', file: 'slides/catalog.html' },
  { id: 'tech-proposal', label: '技术方案', file: 'slides/tech-proposal.html' },
]

export default function SlidesViewer() {
  const [active, setActive] = useState(0)
  const deck = decks[active]
  const src = BASE + deck.file

  return (
    <div className="min-h-screen px-5 pb-24 pt-28">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => (window.location.hash = '')}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← 返回首页
        </button>

        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">frontend-slides</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">前端幻灯片</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            用前端代码写的演示文稿，支持 ← → 方向键或底部按钮翻页。下面三套可自由切换。
          </p>
        </div>

        {/* 切换器 */}
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          {decks.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                i === active
                  ? 'bg-brand text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* 幻灯片 iframe */}
        <motion.div
          key={deck.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass overflow-hidden rounded-2xl"
        >
          <iframe
            key={src}
            src={src}
            title={deck.label}
            sandbox="allow-scripts"
            className="h-[60vh] w-full border-0 bg-[hsl(var(--card))]"
          />
        </motion.div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          提示：点击幻灯片区域后，用键盘 ← → 翻页，或点右下角按钮。
        </p>
      </div>
    </div>
  )
}
