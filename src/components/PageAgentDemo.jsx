import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* 6 个包材产品（演示数据） */
const PRODUCTS = [
  { id: 1, name: '快递纸盒', cat: '纸盒', price: 1.2, material: '瓦楞纸', emoji: '📦' },
  { id: 2, name: '重型纸箱', cat: '纸箱', price: 4.5, material: '牛皮纸', emoji: '🗳️' },
  { id: 3, name: '食品塑料袋', cat: '塑料袋', price: 0.3, material: 'PE', emoji: '🛍️' },
  { id: 4, name: '不干胶标签', cat: '标签', price: 0.15, material: '铜版纸', emoji: '🏷️' },
  { id: 5, name: '精油瓶', cat: '瓶罐', price: 2.8, material: '玻璃', emoji: '🍶' },
  { id: 6, name: '气泡缓冲膜', cat: '缓冲', price: 0.6, material: 'PE', emoji: '🫧' },
]

const CAT_MAP = {
  纸盒: '纸盒',
  纸箱: '纸箱',
  塑料袋: '塑料袋',
  塑料: '塑料袋',
  标签: '标签',
  瓶: '瓶罐',
  玻璃瓶: '瓶罐',
  缓冲: '缓冲',
  气泡: '缓冲',
}

const SUGGESTIONS = [
  '只看纸盒',
  '按价格从高到低',
  '高亮玻璃瓶',
  '价格低于 1 元',
  '重置',
]

/* 本地规则引擎：把自然语言指令解析成筛选/排序/高亮 */
function interpret(raw) {
  const cmd = raw.trim()
  const lower = cmd.toLowerCase()
  const res = { cat: null, max: null, min: null, sort: null, highlight: null, msg: '' }

  if (!cmd || /重置|全部|clear|reset/.test(lower)) {
    res.msg = '已重置：显示全部产品。'
    return res
  }

  // 分类
  for (const [k, v] of Object.entries(CAT_MAP)) {
    if (cmd.includes(k)) {
      res.cat = v
      break
    }
  }

  // 价格区间
  const numMatch = cmd.match(/(\d+(\.\d+)?)\s*元/)
  if (numMatch) {
    const n = parseFloat(numMatch[1])
    if (/低于|小于|不超过|最多|以内/.test(cmd)) res.max = n
    else if (/高于|大于|超过|至少/.test(cmd)) res.min = n
  }

  // 排序
  if (/从高|最贵|降序|贵/.test(cmd)) res.sort = 'priceDesc'
  else if (/从低|最便宜|升序|便宜/.test(cmd)) res.sort = 'priceAsc'
  else if (/名称|字母|首字母/.test(cmd)) res.sort = 'name'

  // 高亮（取品类或材质关键词）
  if (/高亮|标红|突出|强调/.test(cmd)) {
    const hit = PRODUCTS.find(
      (p) => cmd.includes(p.cat) || cmd.includes(p.material) || cmd.includes(p.name)
    )
    if (hit) res.highlight = hit.id
  }

  const parts = []
  if (res.cat) parts.push(`筛选「${res.cat}」`)
  if (res.max != null) parts.push(`价格 < ${res.max} 元`)
  if (res.min != null) parts.push(`价格 > ${res.min} 元`)
  if (res.sort) parts.push('按价格/名称排序')
  if (res.highlight) parts.push('高亮一个产品')
  res.msg = parts.length ? `已执行：${parts.join('，')}。` : '没听懂这条指令，试试下面的示例。'
  return res
}

export default function PageAgentDemo() {
  const [input, setInput] = useState('')
  const [log, setLog] = useState([
    { from: 'bot', text: '你好，我是 page-agent 演示。用一句话筛选 / 排序 / 高亮下方包材产品，例如「只看纸盒」。' },
  ])
  const [rule, setRule] = useState({ cat: null, max: null, min: null, sort: null, highlight: null })

  const visible = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (rule.cat && p.cat !== rule.cat) return false
      if (rule.max != null && p.price >= rule.max) return false
      if (rule.min != null && p.price <= rule.min) return false
      return true
    })
    if (rule.sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price)
    else if (rule.sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price)
    else if (rule.sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [rule])

  const run = (text) => {
    if (!text.trim()) return
    const r = interpret(text)
    setLog((l) => [...l, { from: 'user', text }, { from: 'bot', text: r.msg }])
    setRule({ cat: r.cat, max: r.max, min: r.min, sort: r.sort, highlight: r.highlight })
    setInput('')
  }

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
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">page-agent</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">自然语言操控演示</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            用一句话筛选、排序、高亮下方包材产品。这是<strong className="text-foreground">本地规则引擎</strong>演示，
            无需联网、无需 API Key —— 生产环境可把指令发给真实 LLM（请经后端代理，勿在前端暴露密钥）。
          </p>
        </div>

        {/* 指令输入区 */}
        <div className="glass mb-6 rounded-2xl p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && run(input)}
              placeholder="例如：只看纸盒 / 按价格从高到低 / 高亮玻璃瓶"
              className="flex-1 rounded-xl bg-[hsl(var(--card))] px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-brand"
            />
            <button
              onClick={() => run(input)}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              发送
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => run(s)}
                className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 对话日志 */}
        <div className="glass mb-6 max-h-40 overflow-y-auto rounded-2xl p-4 text-sm">
          <AnimatePresence initial={false}>
            {log.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-2 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    m.from === 'user'
                      ? 'bg-brand text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {m.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 产品演示区 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => {
              const hot = rule.highlight === p.id
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className={`glass flex flex-col items-center gap-2 rounded-2xl p-5 text-center ${
                    hot ? 'ring-2 ring-brand shadow-lg shadow-brand/30' : ''
                  }`}
                >
                  <span className="text-4xl">{p.emoji}</span>
                  <h3 className="font-bold">{p.name}</h3>
                  <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand">
                    {p.cat}
                  </span>
                  <p className="text-xs text-muted-foreground">材质：{p.material}</p>
                  <p className="text-lg font-bold text-brand">¥{p.price.toFixed(2)}</p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        {visible.length === 0 && (
          <p className="mt-6 text-center text-sm text-muted-foreground">没有匹配的产品，试试「重置」。</p>
        )}
      </div>
    </div>
  )
}
