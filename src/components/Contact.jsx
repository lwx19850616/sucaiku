import AnimatedContent from '../bits/AnimatedContent'
import Magnet from '../bits/Magnet'

/**
 * 联系我。
 * 把邮箱和社交链接换成你自己的。
 */
export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 text-center">
      <AnimatedContent>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">联系我</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          有合作或单纯想聊聊？随时给我发消息。
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {/* 把邮箱换成你的 */}
          <Magnet>
            <a
              href="mailto:you@example.com"
              className="inline-block rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3 font-medium text-white shadow-lg"
            >
              发邮件给我
            </a>
          </Magnet>
          {/* 换成你的社交主页 */}
          <Magnet>
            <a
              href="#"
              className="inline-block rounded-full border border-white/20 px-7 py-3 font-medium text-white/80 hover:bg-white/10"
            >
              GitHub
            </a>
          </Magnet>
        </div>
      </AnimatedContent>
    </section>
  )
}
