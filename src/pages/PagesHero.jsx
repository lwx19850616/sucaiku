import { motion } from 'motion/react';
import { useRef } from 'react';

/* ── 共享视觉基元 ─────────────────────────────────────────── */

// 渐变光斑背景
function Glow({ className = '', color = 'rgba(34,211,238,0.35)' }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{ background: color }}
    />
  );
}

// 细网格叠层
function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
        backgroundSize: '46px 46px',
        maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black, transparent 75%)',
      }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/70 ${className}`}
    >
      {children}
    </span>
  );
}

function Btn({ children, primary = false, href = '#' }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
        primary
          ? 'bg-white text-black hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]'
          : 'border border-white/15 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
      }`}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}

function SourceTag() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[11px] text-white/25">
      模板来源 · motionsites.ai 免费模板 · 一比一复刻
    </div>
  );
}

/* ── 1. AI Workflow Hero ──────────────────────────────────── */
function HeroAIWorkflow() {
  const nodes = [
    { t: 'Trigger', d: '新订单创建', x: '0%', y: '18%' },
    { t: 'AI 处理', d: '自动分类 + 回复', x: '38%', y: '52%' },
    { t: 'Action', d: '写入 CRM', x: '78%', y: '24%' },
  ];
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <Glow className="-left-32 top-10 h-96 w-96" color="rgba(34,211,238,0.30)" />
      <Glow className="-right-24 bottom-0 h-[28rem] w-[28rem]" color="rgba(99,102,241,0.25)" />
      <GridOverlay />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <Pill>⚡ AI WORKFLOW</Pill>
          </motion.div>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            让 AI 接管
            <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              重复劳动
            </span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md text-lg text-white/55"
          >
            把你的工具连起来，让 AI 跑通日常流程——团队只需专注于真正重要的交付。
          </motion.p>
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap gap-3"
          >
            <Btn primary>免费开始</Btn>
            <Btn>观看演示</Btn>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[20rem] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
        >
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <path d="M 12% 30% C 30% 50%, 30% 60%, 50% 65%" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="none" />
            <path d="M 50% 65% C 70% 60%, 72% 40%, 88% 38%" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" fill="none" />
          </svg>
          {nodes.map((n, i) => (
            <motion.div
              key={n.t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="absolute w-40 rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-xl backdrop-blur-md"
              style={{ left: n.x, top: n.y }}
            >
              <div className="text-xs font-semibold text-cyan-300">{n.t}</div>
              <div className="mt-1 text-[11px] text-white/50">{n.d}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <SourceTag />
    </section>
  );
}

/* ── 2. Bold Studio ───────────────────────────────────────── */
function HeroBoldStudio() {
  const marquee = ['品牌设计', '动效', 'Web 体验', '3D', '视觉系统', '交互'];
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <Glow className="left-1/4 top-0 h-[30rem] w-[30rem]" color="rgba(236,72,153,0.28)" />
      <Glow className="bottom-0 right-1/4 h-96 w-96" color="rgba(249,115,22,0.22)" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 text-center">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <Pill className="mx-auto">🔥 BOLD STUDIO</Pill>
        </motion.div>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 text-[clamp(3rem,11vw,9rem)] font-black uppercase leading-[0.92] tracking-tighter text-white"
        >
          We make
          <span className="block bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
            bold
          </span>
          brands
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-xl text-lg text-white/55"
        >
          我们为敢于不同的品牌打造无法被忽视的数字体验。
        </motion.p>
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mt-9 flex justify-center gap-3">
          <Btn primary>查看作品</Btn>
          <Btn>联系我们</Btn>
        </motion.div>

        <div className="relative mt-16 overflow-hidden border-y border-white/10 py-4">
          <motion.div
            className="flex gap-10 whitespace-nowrap text-2xl font-bold text-white/30"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i}>✦ {m}</span>
            ))}
          </motion.div>
        </div>
      </div>
      <SourceTag />
    </section>
  );
}

/* ── 3. Interactive Discovery ─────────────────────────────── */
function HeroInteractiveDiscovery() {
  const cards = [
    { t: '探索', d: '沉浸式内容发现', c: 'from-violet-400/30' },
    { t: '连接', d: '人与想法的桥梁', c: 'from-fuchsia-400/30' },
    { t: '创造', d: '把灵感变成作品', c: 'from-cyan-400/30' },
  ];
  const glowRef = useRef(null);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - r.left}px`;
      glowRef.current.style.top = `${e.clientY - r.top}px`;
    }
  };
  return (
    <section
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-ink"
    >
      <Glow className="-left-24 top-1/3 h-96 w-96" color="rgba(139,92,246,0.28)" />
      <Glow className="right-0 top-10 h-[26rem] w-[26rem]" color="rgba(217,70,239,0.20)" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/20 blur-[80px] transition-transform duration-75"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <Pill>🔮 INTERACTIVE DISCOVERY</Pill>
        </motion.div>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-3xl text-5xl font-black leading-[1.05] text-white sm:text-6xl"
        >
          发现，
          <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            被重新想象
          </span>
          。
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-md text-lg text-white/55"
        >
          移动光标，让内容随你而亮。一个为探索而生的交互式入口。
        </motion.p>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.t}
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group rounded-3xl border border-white/10 bg-gradient-to-b ${c.c} to-white/[0.02] p-6 backdrop-blur-xl`}
            >
              <div className="text-2xl font-bold text-white">{c.t}</div>
              <div className="mt-2 text-sm text-white/55">{c.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <SourceTag />
    </section>
  );
}

/* ── 4. Aetheris Voyage ──────────────────────────────────── */
function HeroAetherisVoyage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <Glow className="left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2" color="rgba(20,184,166,0.22)" />
      <div className="pointer-events-none absolute inset-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
            style={{
              width: `${28 + i * 16}vw`,
              height: `${28 + i * 16}vw`,
              transform: 'translate(-50%,-50%)',
              animation: `spin ${20 + i * 12}s linear infinite`,
            }}
          />
        ))}
      </div>
      <GridOverlay />
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <Pill className="mx-auto">🪐 AETHERIS VOYAGE</Pill>
        </motion.div>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 text-6xl font-black tracking-tight text-white sm:text-7xl"
        >
          Aetheris
          <span className="block bg-gradient-to-r from-teal-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
            Voyage
          </span>
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-xl text-lg text-white/55"
        >
          规划一条超越平凡的航线。星际之旅，从这一页开始。
        </motion.p>
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mt-9 flex justify-center gap-3">
          <Btn primary>启程</Btn>
          <Btn>了解航线</Btn>
        </motion.div>
      </div>
      <SourceTag />
    </section>
  );
}

/* ── 右侧锚点导航 ─────────────────────────────────────────── */
const HEROES = [
  { id: 'ai-workflow', name: 'AI Workflow', comp: <HeroAIWorkflow /> },
  { id: 'bold-studio', name: 'Bold Studio', comp: <HeroBoldStudio /> },
  { id: 'interactive', name: 'Interactive', comp: <HeroInteractiveDiscovery /> },
  { id: 'aetheris', name: 'Aetheris', comp: <HeroAetherisVoyage /> },
];

function Dots() {
  return (
    <nav className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {HEROES.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          title={h.name}
          className="group flex items-center justify-end gap-2"
        >
          <span className="text-[11px] text-white/0 transition-all group-hover:text-white/70">
            {h.name}
          </span>
          <span className="h-2.5 w-2.5 rounded-full border border-white/30 bg-white/10 transition-all group-hover:scale-125 group-hover:bg-cyan-300" />
        </a>
      ))}
    </nav>
  );
}

export default function PagesHero() {
  return (
    <div className="bg-ink">
      <Dots />
      {HEROES.map((h) => (
        <div id={h.id} key={h.id} className="scroll-mt-0">
          {h.comp}
        </div>
      ))}
    </div>
  );
}
