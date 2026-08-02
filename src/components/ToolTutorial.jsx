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
  'daily-stock-analysis': {
    icon: '📈',
    name: 'daily_stock_analysis',
    tagline: 'LLM 驱动的多市场股票智能分析',
    github: 'https://github.com/ZhuLinsen/daily_stock_analysis',
    tags: ['Python', 'LLM', '股票分析', 'Actions'],
    sections: [
      {
        title: '这是什么',
        body: '基于 **AI 大模型**的 A股/港股/美股/日股/韩股/台股自选股分析系统（Python 3.10+，MIT 协议，GitHub ⭐59.7k）。每日自动生成「决策仪表盘」，推送到企业微信/飞书/Telegram/Discord/Slack/邮箱，**可通过 GitHub Actions 零成本定时运行**。\n> 核心输出：评分、买卖点位、风险警报、催化因素与操作检查清单。',
      },
      {
        title: '1. 零成本部署（推荐 Actions）',
        body: '- 打开仓库点击 **Fork** 到自己的账号\n- 在 `Settings → Secrets and variables → Actions` 配置 Secrets：\n- **AI 模型 Key**（至少一个）：`ANSPIRE_API_KEYS` / `GEMINI_API_KEY` / `DEEPSEEK_API_KEY` 等\n- **通知渠道**（至少一个）：`WECHAT_WEBHOOK_URL` / `FEISHU_WEBHOOK_URL` / `TELEGRAM_BOT_TOKEN` 等\n- **自选股列表**：`STOCK_LIST`，如 `600519,hk00700,AAPL,2330.TW`\n- 进入 **Actions** 标签手动 `Run workflow` 试跑\n> 默认每个**工作日 18:00（北京时间）**自动执行，非交易日（含 A/H/US 节假日）自动跳过。',
      },
      {
        title: '2. 本地运行 / Docker',
        body: '```bash\ngit clone https://github.com/ZhuLinsen/daily_stock_analysis.git\ncd daily_stock_analysis\npip install -r requirements.txt\ncp .env.example .env\npython main.py\n```\n常用命令：\n- `python main.py --dry-run` 只分析不推送\n- `python main.py --stocks 600519,hk00700,AAPL` 指定股票\n- `python main.py --market-review` 只跑大盘复盘\n- `python main.py --webui` 启动 Web 工作台（http://127.0.0.1:8000）',
      },
      {
        title: '3. 核心设计：规则打分 + LLM',
        body: '流水线：行情数据 → 技术面规则打分 → 新闻/舆情聚合 → LLM 综合分析 → 多渠道推送。\n技术面打分（满分 100）：**趋势 30 + 乖离率 20 + 量能 15 + 支撑 10 + MACD 15 + RSI 10**，全部用 pandas 自研实现，无 ta-lib 依赖，部署到 GitHub Actions 无编译问题。\n关键设计：\n- **分数与信号分离**：先算综合分再映射买卖信号；空头排列下即使分数够也不给买入（硬约束）\n- **强势趋势补偿**：强势多头时乖离率阈值放宽 1.5 倍，避免主升浪完全踏空\n- **多源 fallback**：AkShare/Baostock/YFinance 免费源默认可用，挂了自动降级切换',
      },
      {
        title: '4. 推送效果示例',
        body: '决策仪表盘长这样：\n```\n🎯 2026-02-08 决策仪表盘\n共分析3只股票 | 🟢买入:0 🟡观望:2 🔴卖出:1\n⚪ 中钨高新 (000657)\n💭 舆情情绪: 市场关注其AI属性与业绩高增长\n🚨 风险警报: 主力资金大幅净卖出，警惕短期抛压\n✨ 利好催化: AI服务器HDI核心供应商，扣非净利润同比+407%\n```\n大盘复盘则推送主要指数涨跌、涨跌家数与领涨板块。',
      },
    ],
  },
  'open-cli': {
    icon: '⌨️',
    name: 'OpenCLI',
    tagline: '把任意网站变成 CLI',
    github: 'https://github.com/jackwener/OpenCLI',
    tags: ['Node.js', 'CLI', 'AI Agent', 'Browser'],
    sections: [
      {
        title: '这是什么',
        body: '**OpenCLI**（Node.js ≥ 20，Apache-2.0，GitHub ⭐27.5k）把网站、浏览器会话、Electron 应用和本地工具，统一变成适合人类与 **AI Agent** 使用的确定性 CLI 接口，内置 **100+ 站点适配器**（B站、知乎、小红书、Twitter/X、Reddit、HackerNews 等）。\n> 不用无头浏览器、不存账号密码——需要登录态的操作通过 Chrome 扩展复用你本人的浏览器会话，天然过登录墙。',
      },
      {
        title: '1. 安装与快速开始',
        body: '```bash\nnpm install -g @jackwener/opencli\n```\n再安装 Chrome 扩展（Chrome Web Store 搜 OpenCLI，或从 GitHub Releases 手动加载）。\n验证与上手：\n```bash\nopencli doctor                    # 检查环境\nopencli list                      # 查看全部命令\nopencli hackernews top --limit 5  # HN 热榜\nopencli bilibili hot --limit 5    # B站热门\n```',
      },
      {
        title: '2. 三种用法',
        body: '- **直接用适配器**：`opencli zhihu search "关键词"`、`opencli bilibili hot`\n- **给 AI Agent 装 skill**：\n```bash\nnpx skills add jackwener/opencli --skill opencli-browser\n```\n  之后在 Claude Code / Cursor 里直接说「帮我填一下这个表单」，Agent 会自动调用浏览器命令完成\n- **写新站点适配器**：用 `opencli-adapter-author` skill 一条龙完成侦察 → API 发现 → 字段解码 → 验证，产出可复用适配器',
      },
      {
        title: '3. 架构原理',
        body: '```\n用户 / AI Agent → opencli CLI 内核 → Browser Bridge(本地 daemon :19825) → Chrome 扩展\n```\n- **结构化 DOM 快照而非截图**：Agent 读取结构化页面快照，Token 消耗低、确定性高\n- **统一退出码**：`0` 成功 / `66` 无数据 / `69` 扩展未连接 / `75` 超时 / `77` 需认证，CI 可按失败模式分支\n- **三层覆盖**：内置适配器 < 用户 `~/.opencli/clis/` < 插件，靠注册时序后写覆盖',
      },
      {
        title: '4. 输出与集成',
        body: '```bash\nopencli bilibili hot -f table   # 给人看的表格\nopencli bilibili hot -f json    # JSON，喂 jq / AI Agent\nopencli xiaohongshu download "https://..." --output ./xhs  # 小红书图片/视频\nopencli external register longbridge  # 把本地 CLI 注册进统一入口\n```\n常见问题：\n- 报 `Extension not connected` → 检查 Chrome 扩展是否已启用\n- 返回空 / `Unauthorized` → 浏览器登录态过期，重新登录该站点\n- 启动即崩 → Node.js 版本需 ≥ 20',
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
