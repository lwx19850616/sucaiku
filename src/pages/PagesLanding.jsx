import { motion } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Glow({ className = '', color = 'rgba(168,139,250,0.30)' }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{ background: color }}
    />
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

const FEATURES = [
  { t: '品牌策略', d: '从定位到调性，构建一致的视觉语言。', icon: '🎯' },
  { t: '动效设计', d: '用 motion 讲一个会呼吸的故事。', icon: '✨' },
  { t: 'Web 体验', d: '高性能、可访问、令人愉悦的界面。', icon: '🌐' },
  { t: '3D & 空间', d: '把产品放进可交互的三维场景。', icon: '🧊' },
  { t: '内容系统', d: '可扩展的组件与模板体系。', icon: '🧩' },
  { t: '数据驱动', d: '用真实指标迭代每一次发布。', icon: '📈' },
];

const WORKS = [
  { t: 'Lumen', tag: '金融科技', c: 'from-cyan-400/30' },
  { t: 'Nova', tag: '消费品牌', c: 'from-fuchsia-400/30' },
  { t: 'Orbit', tag: 'SaaS', c: 'from-violet-400/30' },
  { t: 'Vela', tag: '电商', c: 'from-amber-400/30' },
];

export default function PagesLanding() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <Glow className="-left-24 top-10 h-96 w-96" color="rgba(168,139,250,0.30)" />
        <Glow className="-right-24 bottom-0 h-[28rem] w-[28rem]" color="rgba(232,121,249,0.22)" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
            maskImage: 'radial-gradient(circle at 50% 35%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 35%, black, transparent 75%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/70">
              🌈 PRISMA CREATIVE STUDIO
            </span>
          </motion.div>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-7 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            为大胆的品牌
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              打造 prismatic 体验
            </span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-xl text-lg text-white/55"
          >
            我们是一家创意工作室，把策略、动效与工程揉成让人记住的数字产品。
          </motion.p>
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-9 flex justify-center gap-3"
          >
            <Btn primary>开始项目</Btn>
            <Btn>查看案例</Btn>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-black text-white sm:text-4xl"
        >
          我们做什么
        </motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <div className="text-3xl">{f.icon}</div>
              <div className="mt-4 text-lg font-bold text-white">{f.t}</div>
              <div className="mt-2 text-sm text-white/55">{f.d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Showcase ── */}
      <section className="relative overflow-hidden py-24">
        <Glow className="left-1/2 top-0 h-[24rem] w-[24rem] -translate-x-1/2" color="rgba(99,102,241,0.20)" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-3xl font-black text-white sm:text-4xl"
          >
            精选案例
          </motion.h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WORKS.map((w, i) => (
              <motion.div
                key={w.t}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className={`group relative flex h-56 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b ${w.c} to-white/[0.02] p-5`}
              >
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/0" />
                <div className="relative">
                  <div className="text-xl font-black text-white">{w.t}</div>
                  <div className="mt-1 text-xs text-white/60">{w.tag}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
        >
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            准备好<span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">放大</span>你的品牌了吗？
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/55">
            告诉我们你的目标，48 小时内给出第一版方向。
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Btn primary>预约通话</Btn>
            <Btn>发邮件</Btn>
          </div>
        </motion.div>
        <div className="mt-10 text-[11px] text-white/25">
          模板来源 · motionsites.ai 免费模板 · 一比一复刻
        </div>
      </section>
    </div>
  );
}
