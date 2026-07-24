import BlurText from '../bits/BlurText'
import AuroraBackground from '../bits/AuroraBackground'
import Magnet from '../bits/Magnet'

/**
 * 首屏 Hero。
 * 大标题、副标题、按钮文案都是占位，直接改文字即可。
 */
export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center">
      <AuroraBackground className="absolute inset-0">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
          {/* 改成你的名字 / 一句话定位 */}
          <BlurText
            text="你好，我是你的名字"
            className="text-4xl font-bold sm:text-6xl"
            delay={0.1}
          />
          <BlurText
            text="一名热爱创造的开发者"
            className="mt-4 text-xl text-gradient sm:text-2xl"
            delay={0.4}
          />
          <p className="mt-6 max-w-xl text-white/60">
            这里放一句你的自我介绍或口号。比如：用代码把想法变成看得见的东西。
          </p>

          <div className="mt-10 flex gap-4">
            <Magnet>
              <a
                href="#works"
                className="inline-block rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105"
              >
                查看作品
              </a>
            </Magnet>
            <Magnet>
              <a
                href="#contact"
                className="inline-block rounded-full border border-white/20 px-7 py-3 font-medium text-white/80 transition-colors hover:bg-white/10"
              >
                联系我
              </a>
            </Magnet>
          </div>
        </div>
      </AuroraBackground>
    </section>
  )
}
