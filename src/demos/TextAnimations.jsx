// 文字动画组件的演示包装（中文示例）
// 每个导出对应 components.js 里 status: 'ready' 的 slug
import BlurText from '../bits/TextAnimations/BlurText';
import CircularText from '../bits/TextAnimations/CircularText';
import TextType from '../bits/TextAnimations/TextType';
import Shuffle from '../bits/TextAnimations/Shuffle';
import ShinyText from '../bits/TextAnimations/ShinyText';
import TextPressure from '../bits/TextAnimations/TextPressure';
import CurvedLoop from '../bits/TextAnimations/CurvedLoop';
import FuzzyText from '../bits/TextAnimations/FuzzyText';
import GradientText from '../bits/TextAnimations/GradientText';
import FallingText from '../bits/TextAnimations/FallingText';
import TextCursor from '../bits/TextAnimations/TextCursor';
import DecryptedText from '../bits/TextAnimations/DecryptedText';
import TrueFocus from '../bits/TextAnimations/TrueFocus';
import ScrollFloat from '../bits/TextAnimations/ScrollFloat';
import ScrollReveal from '../bits/TextAnimations/ScrollReveal';
import ASCIIText from '../bits/TextAnimations/ASCIIText';
import ScrambledText from '../bits/TextAnimations/ScrambledText';
import RotatingText from '../bits/TextAnimations/RotatingText';
import GlitchText from '../bits/TextAnimations/GlitchText';
import ScrollVelocity from '../bits/TextAnimations/ScrollVelocity';
import VariableProximity from '../bits/TextAnimations/VariableProximity';
import CountUp from '../bits/TextAnimations/CountUp';

const demoWrap = (node) => <div className="flex min-h-[120px] items-center justify-center py-8">{node}</div>;

export const TEXT_ANIMATION_DEMOS = {
  'blur-text': () =>
    demoWrap(
      <BlurText text="欢迎来到我的组件库" className="text-3xl font-bold text-white" />
    ),

  'circular-text': () =>
    demoWrap(
      <div className="relative h-48 w-48">
        <CircularText
          text="组件库 动画 中文 "
          className="fill-white text-lg font-bold"
        />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">✦</div>
      </div>
    ),

  'text-type': () =>
    demoWrap(
      <TextType
        text={['你好，世界', '我是前端爱好者', '欢迎体验动画']}
        className="text-2xl font-bold text-white"
        typingSpeed={60}
      />
    ),

  'shuffle': () =>
    demoWrap(
      <Shuffle text="悬停触发洗牌效果" className="text-2xl font-bold text-white" triggerOnHover />
    ),

  'shiny-text': () =>
    demoWrap(
      <ShinyText text="闪闪发光的文字" className="text-3xl font-bold" speed={3} />
    ),

  'text-pressure': () =>
    demoWrap(
      <div className="w-full px-4">
        <TextPressure text="PRESSURE" className="text-5xl font-black text-white" />
      </div>
    ),

  'curved-loop': () =>
    demoWrap(
      <CurvedLoop
        marqueeText="组件库 中文动画 一比一复刻 "
        className="text-2xl font-bold"
        speed={2}
        direction="left"
        curveAmount={300}
        interactive={false}
      />
    ),

  'fuzzy-text': () =>
    demoWrap(
      <FuzzyText baseIntensity={0.3} hoverIntensity={0.8} className="text-4xl font-bold text-white">
        模糊文字
      </FuzzyText>
    ),

  'gradient-text': () =>
    demoWrap(
      <GradientText colors={['#a78bfa', '#22d3ee', '#f472b6', '#a78bfa']} className="text-4xl font-black">
        渐变流光
      </GradientText>
    ),

  'falling-text': () =>
    demoWrap(
      <div className="h-40 w-full">
        <FallingText text="坠落文字效果" highlightWords={['文字']} trigger="hover" />
      </div>
    ),

  'text-cursor': () =>
    demoWrap(
      <div className="h-16 w-full text-2xl font-bold text-white">
        <TextCursor text="在文字上移动鼠标试试" spacing={0.1} followMouseDirection maxPoints={5} />
      </div>
    ),

  'decrypted-text': () =>
    demoWrap(
      <DecryptedText text="解密一段文字" className="text-2xl font-bold text-white" encryptedClassName="text-fuchsia-400" />
    ),

  'true-focus': () =>
    demoWrap(
      <TrueFocus sentence="专注当下 活在此时" glowColor="#22d3ee" />
    ),

  'scroll-float': () =>
    demoWrap(
      <ScrollFloat textClassName="text-3xl font-bold text-white">滚动浮动</ScrollFloat>
    ),

  'scroll-reveal': () =>
    demoWrap(
      <ScrollReveal textClassName="text-3xl font-bold text-white">滚动揭示文字内容</ScrollReveal>
    ),

  'ascii-text': () =>
    demoWrap(
      <div className="w-full">
        <ASCIIText text="HI" textColor="#ffffff" />
      </div>
    ),

  'scrambled-text': () =>
    demoWrap(
      <ScrambledText className="text-2xl font-bold text-emerald-400">
        打乱重组的文字动画
      </ScrambledText>
    ),

  'rotating-text': () =>
    demoWrap(
      <RotatingText
        texts={['创意', '动效', '组件', '中文']}
        className="text-3xl font-bold text-white"
        mainClassName="px-2"
      />
    ),

  'glitch-text': () =>
    demoWrap(
      <GlitchText speed={0.8} className="text-4xl font-bold text-white">
        故障风格
      </GlitchText>
    ),

  'scroll-velocity': () =>
    demoWrap(
      <div className="w-full overflow-hidden">
        <ScrollVelocity texts={['中 文 动 画 ', '组 件 库 ']} className="font-bold text-white" />
      </div>
    ),

  'variable-proximity': () => {
    const ref = { current: null };
    return demoWrap(
      <div ref={ref} className="w-full px-2">
        <VariableProximity
          label="可变接近的文字"
          containerRef={ref}
          className="text-3xl font-bold text-white"
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 900"
          radius={100}
        />
      </div>
    );
  },

  'count-up': () =>
    demoWrap(
      <div className="text-center">
        <CountUp to={138} className="text-6xl font-black text-cyan-300" />&nbsp;
        <span className="text-xl text-white/70">个组件</span>
      </div>
    ),
};
