import AnimatedContent from '../bits/AnimatedContent'

/**
 * 关于我。
 * 段落文案为占位，替换成你的真实介绍即可。
 */
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedContent>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">关于我</span>
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          <p className="text-white/70 sm:col-span-2 leading-relaxed">
            这里写你的个人介绍。可以介绍你的背景、擅长方向、正在做的事。
            例如：我是一名前端开发者，喜欢把复杂的交互做得简单又好看，
            平时折腾动画、可视化与一些小工具。
          </p>
          <ul className="space-y-3 text-sm text-white/60">
            <li>📍 所在地：你的城市</li>
            <li>💼 当前：你的职位 / 状态</li>
            <li>🎓 背景：你的专业 / 学校</li>
          </ul>
        </div>
      </AnimatedContent>
    </section>
  )
}
