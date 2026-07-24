// 动画类组件的演示包装（中文示例）
// 每个导出对应 components.js 里 Animations 分类的 slug
import CursorGrid from '../bits/Animations/CursorGrid';
import AnimatedContent from '../bits/Animations/AnimatedContent';
import FadeContent from '../bits/Animations/FadeContent';
import ElectricBorder from '../bits/Animations/ElectricBorder';
import OrbitImages from '../bits/Animations/OrbitImages';
import PixelTransition from '../bits/Animations/PixelTransition';
import GlareHover from '../bits/Animations/GlareHover';
import Antigravity from '../bits/Animations/Antigravity';
import LogoLoop from '../bits/Animations/LogoLoop';
import TargetCursor from '../bits/Animations/TargetCursor';
import MagicRings from '../bits/Animations/MagicRings';
import LaserFlow from '../bits/Animations/LaserFlow';
import MagnetLines from '../bits/Animations/MagnetLines';
import GhostCursor from '../bits/Animations/GhostCursor';
import GradualBlur from '../bits/Animations/GradualBlur';
import ClickSpark from '../bits/Animations/ClickSpark';
import Magnet from '../bits/Animations/Magnet';
import Strands from '../bits/Animations/Strands';
import StickerPeel from '../bits/Animations/StickerPeel';
import PixelTrail from '../bits/Animations/PixelTrail';
import Cubes from '../bits/Animations/Cubes';
import MetallicPaint from '../bits/Animations/MetallicPaint';
import Noise from '../bits/Animations/Noise';
import ShapeBlur from '../bits/Animations/ShapeBlur';
import Crosshair from '../bits/Animations/Crosshair';
import ImageTrail from '../bits/Animations/ImageTrail';
import Ribbons from '../bits/Animations/Ribbons';
import SplashCursor from '../bits/Animations/SplashCursor';
import MetaBalls from '../bits/Animations/MetaBalls';
import BlobCursor from '../bits/Animations/BlobCursor';
import StarBorder from '../bits/Animations/StarBorder';

// 占位图片（与 React Bits 演示一致，使用 picsum 随机图）
const P = (seed, w = 500, h = 320) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const demoWrap = (node) => <div className="flex min-h-[140px] w-full items-center justify-center py-8">{node}</div>;

const LOGOS = [
  { src: P('logo1', 120, 48), alt: '标志 1' },
  { src: P('logo2', 120, 48), alt: '标志 2' },
  { src: P('logo3', 120, 48), alt: '标志 3' },
  { src: P('logo4', 120, 48), alt: '标志 4' },
  { src: P('logo5', 120, 48), alt: '标志 5' },
  { src: P('logo6', 120, 48), alt: '标志 6' },
];

const ORBIT_IMGS = [
  P('ob1', 160, 160), P('ob2', 160, 160), P('ob3', 160, 160),
  P('ob4', 160, 160), P('ob5', 160, 160), P('ob6', 160, 160),
];

const TRAIL_IMGS = [
  P('tr1', 200, 200), P('tr2', 200, 200), P('tr3', 200, 200),
  P('tr4', 200, 200), P('tr5', 200, 200),
];

export const ANIMATION_DEMOS = {
  'cursor-grid': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <CursorGrid color="#22d3ee" radius={120} />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
          移动鼠标点亮网格
        </p>
      </div>
    ),

  'animated-content': () =>
    demoWrap(
      <AnimatedContent direction="vertical" distance={40} duration={0.8}>
        <div className="text-3xl font-bold text-white">内容随滚动进场</div>
      </AnimatedContent>
    ),

  'fade-content': () =>
    demoWrap(
      <FadeContent blur duration={0.8}>
        <div className="text-3xl font-bold text-white">淡入并去除模糊</div>
      </FadeContent>
    ),

  'electric-border': () =>
    demoWrap(
      <ElectricBorder color="#22d3ee" speed={3} chaos={40} borderRadius={14}>
        <div className="flex h-32 w-64 items-center justify-center rounded-xl bg-black/30 text-lg font-bold text-white">
          电光边框
        </div>
      </ElectricBorder>
    ),

  'orbit-images': () =>
    demoWrap(
      <div className="flex h-[320px] w-full max-w-2xl items-center justify-center">
        <OrbitImages
          images={ORBIT_IMGS}
          width={520}
          height={300}
          baseWidth={520}
          radiusX={240}
          radiusY={80}
          radius={120}
          itemSize={56}
        />
      </div>
    ),

  'pixel-transition': () =>
    demoWrap(
      <div className="w-[360px] max-w-full">
        <PixelTransition
          firstContent={
            <img src={P('px1', 360, 240)} alt="" className="h-full w-full rounded-xl object-cover" />
          }
          secondContent={
            <img src={P('px2', 360, 240)} alt="" className="h-full w-full rounded-xl object-cover" />
          }
          gridSize={12}
          aspectRatio="3 / 2"
        />
      </div>
    ),

  'glare-hover': () =>
    demoWrap(
      <GlareHover
        width="300px"
        height="200px"
        background="#0ea5e9"
        glareColor="#ffffff"
        borderRadius="16px"
      >
        <span className="text-lg font-bold text-white">高光悬停</span>
      </GlareHover>
    ),

  'antigravity': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <Antigravity count={14} color="#22d3ee" autoAnimate particleShape="sphere" />
      </div>
    ),

  'logo-loop': () =>
    demoWrap(
      <div className="w-full max-w-2xl overflow-hidden py-6">
        <LogoLoop logos={LOGOS} speed={100} direction="left" logoHeight={36} gap={40} />
      </div>
    ),

  'target-cursor': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <TargetCursor />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
          移动鼠标查看瞄准光标
        </p>
      </div>
    ),

  'magic-rings': () =>
    demoWrap(
      <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <MagicRings color="#22d3ee" colorTwo="#a855f7" followMouse clickBurst />
      </div>
    ),

  'laser-flow': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <LaserFlow />
      </div>
    ),

  'magnet-lines': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <MagnetLines rows={12} columns={12} containerSize="40vmin" lineColor="#22d3ee" />
      </div>
    ),

  'ghost-cursor': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <GhostCursor />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
          移动鼠标查看幽灵光标
        </p>
      </div>
    ),

  'gradual-blur': () =>
    demoWrap(
      <GradualBlur className="text-3xl font-bold text-white">
        逐渐模糊的文字效果
      </GradualBlur>
    ),

  'click-spark': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <ClickSpark sparkColor="#22d3ee" sparkSize={10} sparkCount={8} />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
          点击任意位置产生火花
        </p>
      </div>
    ),

  'magnet': () =>
    demoWrap(
      <Magnet magnetStrength={4}>
        <button className="rounded-full bg-cyan-400 px-8 py-4 text-lg font-bold text-black">
          磁吸按钮
        </button>
      </Magnet>
    ),

  'strands': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <Strands />
      </div>
    ),

  'sticker-peel': () =>
    demoWrap(
      <div className="w-full max-w-md">
        <StickerPeel imageSrc={P('sticker', 480, 320)} className="rounded-xl" />
      </div>
    ),

  'pixel-trail': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <PixelTrail pixels={TRAIL_IMGS} pixelSize={24} gap={10} speed={20} />
      </div>
    ),

  'cubes': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <Cubes />
      </div>
    ),

  'metallic-paint': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <MetallicPaint />
      </div>
    ),

  'noise': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <Noise />
      </div>
    ),

  'shape-blur': () =>
    demoWrap(
      <ShapeBlur textClassName="text-3xl font-bold text-white">
        形状模糊文字
      </ShapeBlur>
    ),

  'crosshair': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <Crosshair />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
          移动鼠标查看十字准星
        </p>
      </div>
    ),

  'image-trail': () =>
    demoWrap(
      <div className="relative h-72 w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <ImageTrail images={TRAIL_IMGS} path={5} />
      </div>
    ),

  'ribbons': () =>
    demoWrap(
      <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <Ribbons />
      </div>
    ),

  'splash-cursor': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <SplashCursor />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
          移动鼠标查看飞溅光标
        </p>
      </div>
    ),

  'meta-balls': () =>
    demoWrap(
      <div className="h-64 w-full max-w-xl">
        <MetaBalls color="#22d3ee" cursorBallColor="#a855f7" cursorBallSize={3} ballCount={8}>
          <div className="text-2xl font-bold text-black">元球体文字</div>
        </MetaBalls>
      </div>
    ),

  'blob-cursor': () =>
    demoWrap(
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <BlobCursor />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
          移动鼠标查看团块光标
        </p>
      </div>
    ),

  'star-border': () =>
    demoWrap(
      <StarBorder color="cyan" speed="6s" className="rounded-xl">
        <div className="px-8 py-5 text-lg font-bold text-white">星光边框</div>
      </StarBorder>
    ),
};
