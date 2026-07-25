// 动画类组件的演示包装（中文示例 + 1:1 还原 React Bits 的 Customize 旋钮面板）
// 每个导出对应 components.js 里 Animations 分类的 slug
import { useState } from 'react';
import KnobsPanel from '../components/KnobsPanel';

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

import { ANIM_KNOB_CONFIGS, ANIM_DEFAULTS } from './animKnobConfigs';

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

// ── 通用交互包装器：自动管理 state + KnobsPanel ──
function InteractiveDemo({ knobs, defaults, render }) {
  const [values, setValues] = useState(defaults || {});
  const handleChange = (prop, val) => setValues((prev) => ({ ...prev, [prop]: val }));
  return (
    <div className="w-full">
      {render(values)}
      <KnobsPanel knobs={knobs} values={values} onChange={handleChange} />
    </div>
  );
}

// 真实组件默认（来自各组件对外 prop API）+ 少量「展示用」预设（颜色/尺寸，均在旋钮范围内）
const PRESETS = {
  CursorGrid: { color: '#22d3ee' },
  ElectricBorder: { color: '#22d3ee' },
  MagicRings: { color: '#22d3ee', colorTwo: '#a855f7' },
  Antigravity: { color: '#22d3ee' },
  TargetCursor: { cursorColor: '#22d3ee' },
  OrbitImages: { width: 300, height: 300, baseWidth: 1400, radiusX: 240, radiusY: 80, radius: 120, itemSize: 56 },
  LogoLoop: { speed: 20, direction: 'left', logoHeight: 36, gap: 40 },
  GlareHover: { background: '#0ea5e9', glareColor: '#ffffff' },
  MagnetLines: { lineColor: '#22d3ee' },
  ClickSpark: { sparkColor: '#22d3ee' },
  PixelTrail: { color: '#ffffff' },
  ImageTrail: { variant: 1 },
  SplashCursor: { COLOR: '#ff0000' },
  MetaBalls: { color: '#22d3ee', cursorBallColor: '#a855f7', ballCount: 8 },
  StarBorder: { color: '#22d3ee' },
};

const PD = (name, extra = {}) => ({ ...ANIM_DEFAULTS[name], ...(PRESETS[name] || {}), ...extra });
const kx = (name) => ANIM_KNOB_CONFIGS[name] || [];

// 全屏感容器（光标类 / canvas 类组件通用）
const Frame = ({ children, label }) => (
  <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
    {children}
    {label && (
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
        {label}
      </p>
    )}
  </div>
);

export const ANIMATION_DEMOS = {
  'cursor-grid': () => (
    <InteractiveDemo knobs={kx('CursorGrid')} defaults={PD('CursorGrid')} render={(v) =>
      demoWrap(<Frame label="移动鼠标点亮网格"><CursorGrid {...v} /></Frame>)} />
  ),

  'animated-content': () => (
    <InteractiveDemo knobs={kx('AnimatedContent')} defaults={PD('AnimatedContent')} render={(v) =>
      demoWrap(
        <AnimatedContent {...v}>
          <div className="text-3xl font-bold text-white">内容随滚动进场</div>
        </AnimatedContent>
      )} />
  ),

  'fade-content': () => (
    <InteractiveDemo knobs={kx('FadeContent')} defaults={PD('FadeContent')} render={(v) =>
      demoWrap(
        <FadeContent {...v}>
          <div className="text-3xl font-bold text-white">淡入并去除模糊</div>
        </FadeContent>
      )} />
  ),

  'electric-border': () => (
    <InteractiveDemo knobs={kx('ElectricBorder')} defaults={PD('ElectricBorder')} render={(v) =>
      demoWrap(
        <ElectricBorder {...v}>
          <div className="flex h-32 w-64 items-center justify-center rounded-xl bg-black/30 text-lg font-bold text-white">
            电光边框
          </div>
        </ElectricBorder>
      )} />
  ),

  'orbit-images': () => (
    <InteractiveDemo knobs={kx('OrbitImages')} defaults={PD('OrbitImages')} render={(v) =>
      demoWrap(
        <div className="flex h-[320px] w-full max-w-2xl items-center justify-center">
          <OrbitImages images={ORBIT_IMGS} {...v} />
        </div>
      )} />
  ),

  'pixel-transition': () => (
    <InteractiveDemo knobs={kx('PixelTransition')} defaults={PD('PixelTransition')} render={(v) =>
      demoWrap(
        <div className="w-[360px] max-w-full">
          <PixelTransition
            firstContent={
              <img src={P('px1', 360, 240)} alt="" className="h-full w-full rounded-xl object-cover" />
            }
            secondContent={
              <img src={P('px2', 360, 240)} alt="" className="h-full w-full rounded-xl object-cover" />
            }
            {...v}
          />
        </div>
      )} />
  ),

  'glare-hover': () => (
    <InteractiveDemo knobs={kx('GlareHover')} defaults={PD('GlareHover')} render={(v) =>
      demoWrap(
        <GlareHover {...v}>
          <span className="text-lg font-bold text-white">高光悬停</span>
        </GlareHover>
      )} />
  ),

  'antigravity': () => (
    <InteractiveDemo knobs={kx('Antigravity')} defaults={PD('Antigravity')} render={(v) =>
      demoWrap(<Frame><Antigravity {...v} /></Frame>)} />
  ),

  'logo-loop': () => (
    <InteractiveDemo knobs={kx('LogoLoop')} defaults={PD('LogoLoop')} render={(v) =>
      demoWrap(
        <div className="w-full max-w-2xl overflow-hidden py-6">
          <LogoLoop logos={LOGOS} {...v} />
        </div>
      )} />
  ),

  'target-cursor': () => (
    <InteractiveDemo knobs={kx('TargetCursor')} defaults={PD('TargetCursor')} render={(v) =>
      demoWrap(<Frame label="移动鼠标查看瞄准光标"><TargetCursor {...v} /></Frame>)} />
  ),

  'magic-rings': () => (
    <InteractiveDemo knobs={kx('MagicRings')} defaults={PD('MagicRings')} render={(v) =>
      demoWrap(<Frame><MagicRings {...v} /></Frame>)} />
  ),

  'laser-flow': () => (
    <InteractiveDemo knobs={kx('LaserFlow')} defaults={PD('LaserFlow')} render={(v) =>
      demoWrap(<Frame><LaserFlow {...v} /></Frame>)} />
  ),

  'magnet-lines': () => (
    <InteractiveDemo knobs={kx('MagnetLines')} defaults={PD('MagnetLines')} render={(v) =>
      demoWrap(<Frame><MagnetLines {...v} /></Frame>)} />
  ),

  'ghost-cursor': () => (
    <InteractiveDemo knobs={kx('GhostCursor')} defaults={PD('GhostCursor')} render={(v) =>
      demoWrap(<Frame label="移动鼠标查看幽灵光标"><GhostCursor {...v} /></Frame>)} />
  ),

  'gradual-blur': () => (
    <InteractiveDemo knobs={kx('GradualBlur')} defaults={PD('GradualBlur')} render={(v) =>
      demoWrap(
        <GradualBlur {...v} className="text-3xl font-bold text-white">
          逐渐模糊的文字效果
        </GradualBlur>
      )} />
  ),

  'click-spark': () => (
    <InteractiveDemo knobs={kx('ClickSpark')} defaults={PD('ClickSpark')} render={(v) =>
      demoWrap(
        <div className="relative h-64 w-full max-w-xl cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <ClickSpark {...v} />
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
            点击任意位置产生火花
          </p>
        </div>
      )} />
  ),

  'magnet': () => (
    <InteractiveDemo knobs={kx('Magnet')} defaults={PD('Magnet')} render={(v) =>
      demoWrap(
        <Magnet {...v}>
          <button className="rounded-full bg-cyan-400 px-8 py-4 text-lg font-bold text-black">
            磁吸按钮
          </button>
        </Magnet>
      )} />
  ),

  'strands': () => (
    <InteractiveDemo knobs={kx('Strands')} defaults={PD('Strands')} render={(v) =>
      demoWrap(<Frame><Strands {...v} /></Frame>)} />
  ),

  'sticker-peel': () => (
    <InteractiveDemo knobs={kx('StickerPeel')} defaults={PD('StickerPeel')} render={(v) =>
      demoWrap(
        <div className="w-full max-w-md">
          <StickerPeel imageSrc={P('sticker', 480, 320)} className="rounded-xl" {...v} />
        </div>
      )} />
  ),

  'pixel-trail': () => (
    <InteractiveDemo knobs={kx('PixelTrail')} defaults={PD('PixelTrail')} render={(v) =>
      demoWrap(
        <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-800 to-black">
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/40">
            移动鼠标查看像素拖尾
          </p>
          <PixelTrail {...v} />
        </div>
      )} />
  ),

  'cubes': () => (
    <InteractiveDemo knobs={kx('Cubes')} defaults={PD('Cubes')} render={(v) =>
      demoWrap(<Frame><Cubes {...v} /></Frame>)} />
  ),

  'metallic-paint': () => (
    <InteractiveDemo knobs={kx('MetallicPaint')} defaults={PD('MetallicPaint')} render={(v) =>
      demoWrap(<Frame><MetallicPaint {...v} /></Frame>)} />
  ),

  'noise': () => (
    <InteractiveDemo knobs={kx('Noise')} defaults={PD('Noise')} render={(v) =>
      demoWrap(<Frame><Noise {...v} /></Frame>)} />
  ),

  'shape-blur': () => (
    <InteractiveDemo knobs={kx('ShapeBlur')} defaults={PD('ShapeBlur')} render={(v) =>
      demoWrap(
        <ShapeBlur {...v} textClassName="text-3xl font-bold text-white">
          形状模糊文字
        </ShapeBlur>
      )} />
  ),

  'crosshair': () => (
    <InteractiveDemo knobs={kx('Crosshair')} defaults={PD('Crosshair')} render={(v) =>
      demoWrap(<Frame label="移动鼠标查看十字准星"><Crosshair {...v} /></Frame>)} />
  ),

  'image-trail': () => (
    <InteractiveDemo knobs={kx('ImageTrail')} defaults={PD('ImageTrail')} render={(v) =>
      demoWrap(
        <div className="relative h-72 w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <ImageTrail items={TRAIL_IMGS} {...v} />
        </div>
      )} />
  ),

  'ribbons': () => (
    <InteractiveDemo knobs={kx('Ribbons')} defaults={PD('Ribbons')} render={(v) =>
      demoWrap(<Frame><Ribbons {...v} /></Frame>)} />
  ),

  'splash-cursor': () => (
    <InteractiveDemo knobs={kx('SplashCursor')} defaults={PD('SplashCursor')} render={(v) =>
      demoWrap(<Frame label="移动鼠标查看飞溅光标"><SplashCursor {...v} /></Frame>)} />
  ),

  'meta-balls': () => (
    <InteractiveDemo knobs={kx('MetaBalls')} defaults={PD('MetaBalls')} render={(v) =>
      demoWrap(
        <div className="h-64 w-full max-w-xl">
          <MetaBalls {...v}>
            <div className="text-2xl font-bold text-black">元球体文字</div>
          </MetaBalls>
        </div>
      )} />
  ),

  'blob-cursor': () => (
    <InteractiveDemo knobs={kx('BlobCursor')} defaults={PD('BlobCursor')} render={(v) =>
      demoWrap(<Frame label="移动鼠标查看团块光标"><BlobCursor {...v} /></Frame>)} />
  ),

  'star-border': () => (
    <InteractiveDemo knobs={kx('StarBorder')} defaults={PD('StarBorder')} render={(v) =>
      demoWrap(
        <StarBorder {...v} className="rounded-xl">
          <div className="px-8 py-5 text-lg font-bold text-white">星光边框</div>
        </StarBorder>
      )} />
  ),
};
