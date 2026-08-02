import { useState } from 'react'
import { motion } from 'framer-motion'

/* ============================================================
   极简 Markdown 渲染器（仅覆盖本教程用到的语法）
   支持：## 标题、```代码块```、> 引用、- 列表、**粗体**、`行内代码`、[链接](url)
   ============================================================ */
function renderInline(text) {
  const nodes = []
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let m
  let key = 0
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[2] !== undefined) nodes.push(<strong key={key++}>{m[2]}</strong>)
    else if (m[3] !== undefined)
      nodes.push(
        <code key={key++} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
          {m[3]}
        </code>
      )
    else if (m[4] !== undefined)
      nodes.push(
        <a key={key++} href={m[5]} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-2">
          {m[4]}
        </a>
      )
    last = regex.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function renderMarkdown(md) {
  const blocks = md.split(/\n{2,}/)
  return blocks.map((block, bi) => {
    const trimmed = block.trim()
    if (trimmed.startsWith('```')) {
      const inner = trimmed.replace(/^```[a-z]*\n?/i, '').replace(/```$/, '')
      return (
        <pre key={bi} className="my-4 overflow-x-auto rounded-xl bg-[hsl(var(--card))] p-4 font-mono text-sm ring-1 ring-border">
          <code>{inner}</code>
        </pre>
      )
    }
    if (trimmed.startsWith('> ')) {
      return (
        <blockquote key={bi} className="my-4 border-l-2 border-brand/60 pl-4 text-muted-foreground">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      )
    }
    if (/^[-*] /.test(trimmed)) {
      const items = trimmed.split('\n').map((l) => l.replace(/^[-*] /, ''))
      return (
        <ul key={bi} className="my-3 list-disc space-y-1 pl-5 text-muted-foreground">
          {items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ul>
      )
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h4 key={bi} className="mb-2 mt-6 text-base font-bold text-foreground">
          {renderInline(trimmed.slice(3))}
        </h4>
      )
    }
    return (
      <p key={bi} className="my-3 leading-relaxed text-muted-foreground">
        {renderInline(trimmed)}
      </p>
    )
  })
}

/* ============================================================
   教程内容（示意性教学示例，可自行替换为官方文档）
   ============================================================ */
const tutorials = {
  'cc-switch': {
    icon: '🎛️',
    name: 'cc-switch',
    tagline: '开源 AI 供应商切换器',
    github: 'https://github.com/search?q=cc-switch+ai+provider&type=repositories',
    tags: ['CLI', 'Multi-Provider', 'MCP'],
    sections: [
      {
        title: '这是什么',
        body: `cc-switch 让你在**一个命令行里**统一管理多家 AI 供应商（OpenAI / Anthropic / 本地模型等），并集中管理 Skills 与 MCP 服务。\n> 适合同时接多个模型、又不想每次改配置的同学。`,
      },
      {
        title: '1. 安装',
        body: '通过 npm 全局安装（示例命令，请以官方仓库为准）：\n```bash\nnpm install -g cc-switch\ncc-switch --version\n```',
      },
      {
        title: '2. 配置 AI 供应商',
        body: '在配置文件中声明多个供应商，运行时一键切换：\n```json\n{\n  "providers": {\n    "openai": { "baseURL": "https://api.openai.com/v1", "apiKey": "<你的Key>" },\n    "local":  { "baseURL": "http://localhost:11434/v1", "apiKey": "ollama" }\n  },\n  "active": "openai"\n}\n```\n切换命令：\n```bash\ncc-switch use local\n```',
      },
      {
        title: '3. 管理 Skills 与 MCP',
        body: 'Skills 是复用提示词/脚本；MCP 是给模型接外部工具的能力。\n- 列出已安装技能：`cc-switch skills ls`\n- 添加 MCP 服务：`cc-switch mcp add <name> -- <command>`',
      },
      {
        title: '4. 团队共享',
        body: '把配置文件提交到仓库（**注意：密钥用环境变量，勿入库**），队友 `cc-switch sync` 即可拉取同一套环境与供应商。',
      },
    ],
  },
  'open-design': {
    icon: '🎨',
    name: 'open-design',
    tagline: 'AI 设计稿生成',
    github: 'https://github.com/search?q=open-design+ai&type=repositories',
    tags: ['Design', 'BYOK', 'Prompt'],
    sections: [
      {
        title: '这是什么',
        body: 'open-design 用自然语言生成**可编辑的设计稿**，输出常见设计工具能认的格式，适合把一句话需求快速变成视觉原型。',
      },
      {
        title: '1. 安装',
        body: '```bash\nnpm install -g open-design\nopen-design init\n```',
      },
      {
        title: '2. BYOK 配置',
        body: 'BYOK = Bring Your Own Key，用自己的模型密钥，费用自己承担、数据更可控。\n```bash\nopen-design config set model claude-3-5-sonnet\nopen-design config set apiKey $OPENDESIGN_KEY\n```\n> 密钥请放在环境变量或本地未跟踪文件，不要写进前端代码。',
      },
      {
        title: '3. 生成设计稿',
        body: '用一句描述生成：\n```bash\nopen-design generate "一个深色系的 SaaS 落地页，含导航、Hero 和价格表"\n```',
      },
      {
        title: '4. 五分钟实战',
        body: '- 先生成一版低保真布局确认结构\n- 再用 "更克制的高级感配色" 之类描述迭代视觉\n- 导出为 `.fig` / `.svg` 交给设计同学微调',
      },
    ],
  },
  'ai-website-cloner': {
    icon: '📋',
    name: 'ai-website-cloner',
    tagline: 'AI 克隆网站',
    github: 'https://github.com/search?q=ai-website-cloner&type=repositories',
    tags: ['Scrape', 'Generate', 'Deploy'],
    sections: [
      {
        title: '这是什么',
        body: '输入一个网址，自动抓取页面结构、文案与样式，生成一份**可本地运行、可部署**的前端项目，适合做竞品研究或快速起步。',
      },
      {
        title: '1. 环境准备',
        body: '需要 Node.js 18+：\n```bash\nnode -v\nnpm install -g ai-website-cloner\n```',
      },
      {
        title: '2. 克隆命令',
        body: '```bash\nai-website-cloner clone https://example.com --out ./my-clone\n```\n工具会抓取 HTML/CSS/图片并整理成组件。',
      },
      {
        title: '3. 项目结构',
        body: '生成结果通常如下：\n```\nmy-clone/\n├─ index.html\n├─ src/\n│  ├─ components/\n│  └─ styles/\n└─ package.json\n```',
      },
      {
        title: '4. 部署上线',
        body: '- 本地预览：`npm run dev`\n- 构建：`npm run build`\n- 部署：把 `dist/` 推到 GitHub Pages / Vercel 即可\n> 克隆他人网站仅用于学习，商用请确认授权。',
      },
    ],
  },
  shannon: {
    icon: '🔒',
    name: 'shannon',
    tagline: '安全渗透扫描',
    github: 'https://github.com/search?q=shannon+security+scanner&type=repositories',
    tags: ['Security', 'Docker', 'CI'],
    sections: [
      {
        title: '这是什么',
        body: 'shannon 是一个**一键部署**的渗透测试与漏洞扫描工具，输出人类可读的报告，并能接入 CI 在每次提交时自动扫描。',
      },
      {
        title: '1. Docker 安装',
        body: '```bash\ndocker pull shannon/scanner:latest\ndocker run -d -p 8080:8080 shannon/scanner\n```',
      },
      {
        title: '2. 运行渗透扫描',
        body: '对目标地址发起扫描：\n```bash\nshannon scan --target https://your-site.com --depth 2\n```',
      },
      {
        title: '3. 解读报告',
        body: '报告按风险分级：\n- 🔴 高危：尽快修复（如暴露的密钥、未授权接口）\n- 🟠 中危：本迭代内处理\n- 🟡 低危：纳入技术债\n> 仅对你**拥有或已授权**的目标扫描，遵守法律。',
      },
      {
        title: '4. CI 集成',
        body: '在 GitHub Actions 中加一步：\n```yaml\n- name: Security scan\n  run: shannon scan --target ${{ secrets.SITE_URL }} --fail-on high\n```',
      },
    ],
  },
}

export default function ToolTutorial({ toolId }) {
  const tool = tutorials[toolId]
  const [copied, setCopied] = useState(false)

  if (!tool) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 text-center">
        <div className="glass rounded-2xl px-8 py-10">
          <p className="text-lg font-semibold">教程不存在</p>
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

  return (
    <div className="min-h-screen px-5 pb-24 pt-28">
      <div className="mx-auto max-w-3xl">
        {/* 返回 */}
        <button
          onClick={() => (window.location.hash = '')}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← 返回首页
        </button>

        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-2xl p-7"
        >
          <div className="flex items-start gap-4">
            <span className="text-5xl">{tool.icon}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold">{tool.name}</h1>
              <p className="text-sm text-brand">{tool.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tool.tags.map((t) => (
                  <span key={t} className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand ring-1 ring-brand/20">
                    {t}
                  </span>
                ))}
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-brand/5 px-4 py-2 text-xs text-muted-foreground ring-1 ring-brand/10">
            ⓘ 本教程为示意性教学示例，命令与配置以各项目官方文档为准。
          </p>
        </motion.div>

        {/* 分节教程 */}
        <div className="mt-8 space-y-8">
          {tool.sections.map((sec, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-6 sm:p-7"
            >
              <h3 className="mb-3 text-lg font-bold">
                <span className="mr-2 text-brand">{i + 1}.</span>
                {sec.title}
              </h3>
              <div className="text-sm">{renderMarkdown(sec.body)}</div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  )
}
