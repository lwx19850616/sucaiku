import AnimatedContent from '../bits/AnimatedContent'
import TiltedCard from '../bits/TiltedCard'

// 占位作品数据：把每项替换成你的真实项目即可（标题 / 描述 / 链接 / 标签）
const PROJECTS = [
  {
    title: '项目一',
    desc: '一句话描述这个项目解决了什么问题、用了什么技术。',
    tag: 'React',
    href: '#',
  },
  {
    title: '项目二',
    desc: '一句话描述这个项目解决了什么问题、用了什么技术。',
    tag: 'Vue',
    href: '#',
  },
  {
    title: '项目三',
    desc: '一句话描述这个项目解决了什么问题、用了什么技术。',
    tag: 'Node',
    href: '#',
  },
  {
    title: '项目四',
    desc: '一句话描述这个项目解决了什么问题、用了什么技术。',
    tag: 'Three.js',
    href: '#',
  },
]

export default function Works() {
  return (
    <section id="works" className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedContent>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">作品集</span>
        </h2>
        <p className="mt-3 text-white/60">下面是一些我做过的有趣东西。</p>
      </AnimatedContent>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <AnimatedContent key={p.title} delay={i * 0.08}>
            <TiltedCard className="h-full">
              <a
                href={p.href}
                className="glass block h-full rounded-2xl p-6 transition-colors hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {p.desc}
                </p>
                <span className="mt-4 inline-block text-sm text-cyan-300">
                  查看详情 →
                </span>
              </a>
            </TiltedCard>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
