// 组件类演示 — 含 React Bits 同款 Customize 交互面板
import React, { useState } from 'react';
import KnobsPanel from '../components/KnobsPanel';

// 组件导入
import SpecularButton from '../bits/Components/SpecularButton/SpecularButton';
import OptionWheel from '../bits/Components/OptionWheel/OptionWheel';
import CurvedInput from '../bits/Components/CurvedInput/CurvedInput';
import LineSidebar from '../bits/Components/LineSidebar/LineSidebar';
import AnimatedList from '../bits/Components/AnimatedList/AnimatedList';
import ScrollStack, { ScrollStackItem } from '../bits/Components/ScrollStack/ScrollStack';
import BubbleMenu from '../bits/Components/BubbleMenu/BubbleMenu';
import MagicBento from '../bits/Components/MagicBento/MagicBento';
import CircularGallery from '../bits/Components/CircularGallery/CircularGallery';
import ReflectiveCard from '../bits/Components/ReflectiveCard/ReflectiveCard';
import CardNav from '../bits/Components/CardNav/CardNav';
import CardSwap, { Card } from '../bits/Components/CardSwap/CardSwap';
import Stack from '../bits/Components/Stack/Stack';
import FluidGlass from '../bits/Components/FluidGlass/FluidGlass';
import PillNav from '../bits/Components/PillNav/PillNav';
import TiltedCard from '../bits/Components/TiltedCard/TiltedCard';
import Masonry from '../bits/Components/Masonry/Masonry';
import GlassSurface from '../bits/Components/GlassSurface/GlassSurface';
import GlassIcons from '../bits/Components/GlassIcons/GlassIcons';
import DomeGallery from '../bits/Components/DomeGallery/DomeGallery';
import ChromaGrid from '../bits/Components/ChromaGrid/ChromaGrid';
import Folder from '../bits/Components/Folder/Folder';
import StaggeredMenu from '../bits/Components/StaggeredMenu/StaggeredMenu';
import ModelViewer from '../bits/Components/ModelViewer/ModelViewer';
import Lanyard from '../bits/Components/Lanyard/Lanyard';
import ProfileCard from '../bits/Components/ProfileCard/ProfileCard';
import Dock from '../bits/Components/Dock/Dock';
import GooeyNav from '../bits/Components/GooeyNav/GooeyNav';
import PixelCard from '../bits/Components/PixelCard/PixelCard';
import Carousel from '../bits/Components/Carousel/Carousel';
import SpotlightCard from '../bits/Components/SpotlightCard/SpotlightCard';
import BorderGlow from '../bits/Components/BorderGlow/BorderGlow';
import FlyingPosters from '../bits/Components/FlyingPosters/FlyingPosters';
import BounceCards from '../bits/Components/BounceCards/BounceCards';
import DecayCard from '../bits/Components/DecayCard/DecayCard';
import ElasticSlider from '../bits/Components/ElasticSlider/ElasticSlider';
import Counter from '../bits/Components/Counter/Counter';
import Stepper from '../bits/Components/Stepper/Stepper';
import FlowingMenu from '../bits/Components/FlowingMenu/FlowingMenu';
import InfiniteMenu from '../bits/Components/InfiniteMenu/InfiniteMenu';

// === 工具函数 ===
const P = (seed, w = 480, h = 320) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const demoWrap = (node) => <div className="flex min-h-[200px] w-full items-center justify-center py-8">{node}</div>;
const fullWrap = (node) => <div className="flex min-h-[280px] w-full items-center justify-center py-4">{node}</div>;

const IMAGES5 = [P('bc1', 200, 200), P('bc2', 200, 200), P('bc3', 200, 200), P('bc4', 200, 200), P('bc5', 200, 200)];

// === 通用交互包装器：自动管理 state + KnobsPanel ===
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

// === 已交互化的 20 个组件演示 ===
export const COMPONENT_DEMOS = {
  // ── option-wheel ──
  'option-wheel': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'tilt', label: '倾斜度', type: 'number', default: 6, min: 1, max: 36, step: 0.5 },
        { prop: 'blur', label: '模糊', type: 'number', default: 2, min: 0, max: 20, step: 0.5 },
        { prop: 'fade', label: '衰减', type: 'number', default: 0.25, min: 0.05, max: 1, step: 0.05 },
        { prop: 'smoothing', label: '平滑度', type: 'number', default: 200, min: 30, max: 600, step: 10 },
      ]}
      defaults={{ tilt: 6, blur: 2, fade: 0.25, smoothing: 200 }}
      render={(v) =>
        fullWrap(
          <div className="h-[400px] w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black/30">
            <OptionWheel
              items={['环境音乐', '浩室音乐', '电子音乐', '爵士乐', '低保真', '合成波']}
              textColor="#a6a6a6"
              activeColor="#22d3ee"
              tilt={v.tilt}
              blur={v.blur}
              fade={v.fade}
              smoothing={v.smoothing}
            />
          </div>
        )
      }
    />
  ),

  // ── circular-gallery ──
  'circular-gallery': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'font', label: '字体', type: 'select', default: 'Figtree',
          options: [{ value: 'bold 30px Figtree', label: 'Figtree（默认）' }, { value: 'bold 30px Inter', label: 'Inter' }, { value: 'bold 30px Georgia', label: 'Georgia' }] },
        { prop: 'bend', label: '弯曲度', type: 'number', default: 3, min: -10, max: 10, step: 0.5 },
        { prop: 'borderRadius', label: '圆角', type: 'number', default: 0.05, min: 0, max: 0.3, step: 0.01 },
        { prop: 'scrollSpeed', label: '滚动速度', type: 'number', default: 2, min: 0.5, max: 8, step: 0.5 },
        { prop: 'scrollEase', label: '滚动平滑', type: 'number', default: 0.05, min: 0.01, max: 0.3, step: 0.01 },
      ]}
      defaults={{ bend: 3, borderRadius: 0.05, scrollSpeed: 2, scrollEase: 0.05, font: 'bold 30px Figtree' }}
      render={(v) =>
        fullWrap(
          <div className="h-[400px] w-full max-w-3xl rounded-xl border border-white/10 bg-black/30 overflow-hidden">
            <CircularGallery
              items={[
                { image: P('cg1', 400, 300), text: '作品 1' },
                { image: P('cg2', 400, 300), text: '作品 2' },
                { image: P('cg3', 400, 300), text: '作品 3' },
                { image: P('cg4', 400, 300), text: '作品 4' },
                { image: P('cg5', 400, 300), text: '作品 5' },
              ]}
              bend={v.bend}
              borderRadius={v.borderRadius}
              scrollSpeed={v.scrollSpeed}
              scrollEase={v.scrollEase}
              font={v.font}
            />
          </div>
        )
      }
    />
  ),

  // ── card-nav ──
  'card-nav': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'ease', label: '动画缓动', type: 'select', default: 'power3.out',
          options: [
            { value: 'power3.out', label: 'power3.out' },
            { value: 'power2.out', label: 'power2.out' },
            { value: 'expo.out', label: 'expo.out' },
            { value: 'back.out(1.5)', label: 'back.out' },
            { value: 'elastic.out(1,0.5)', label: 'elastic.out' },
          ] },
      ]}
      defaults={{ ease: 'power3.out' }}
      render={(v) =>
        fullWrap(
          <div className="relative w-full max-w-3xl h-[400px] rounded-xl border border-white/10 bg-black/20">
            <CardNav
              logo={P('logo', 120, 32)}
              logoAlt="Logo"
              items={[
                { label: '组件库', bgColor: '#4F46E5', textColor: '#fff', links: [{ label: '按钮', href: '#', ariaLabel: '按钮' }, { label: '卡片', href: '#', ariaLabel: '卡片' }] },
                { label: '动画效果', bgColor: '#10B981', textColor: '#fff', links: [{ label: '文字', href: '#', ariaLabel: '文字' }, { label: '背景', href: '#', ariaLabel: '背景' }] },
                { label: '工具', bgColor: '#F59E0B', textColor: '#000', links: [{ label: '背景工作室', href: '#', ariaLabel: '背景工作室' }] },
              ]}
              ease={v.ease}
              baseColor="#120F17"
              menuColor="#ffffff"
            />
          </div>
        )
      }
    />
  ),

  // ── magic-bento ──
  'magic-bento': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'spotlightRadius', label: '聚光半径', type: 'number', default: 300, min: 100, max: 600, step: 20 },
        { prop: 'enableStars', label: '星星效果', type: 'boolean', default: true },
        { prop: 'enableSpotlight', label: '聚光效果', type: 'boolean', default: true },
        { prop: 'enableTilt', label: '倾斜效果', type: 'boolean', default: false },
        { prop: 'clickEffect', label: '点击效果', type: 'boolean', default: true },
        { prop: 'enableMagnetism', label: '磁性吸引', type: 'boolean', default: true },
        { prop: 'disableAnimations', label: '禁用所有动画', type: 'boolean', default: false },
      ]}
      defaults={{ spotlightRadius: 300, enableStars: true, enableSpotlight: true, enableTilt: false, clickEffect: true, enableMagnetism: true, disableAnimations: false }}
      render={(v) =>
        demoWrap(
          <MagicBento
            spotlightRadius={v.spotlightRadius}
            enableStars={v.enableStars}
            enableSpotlight={v.enableSpotlight}
            enableTilt={v.enableTilt}
            clickEffect={v.clickEffect}
            enableMagnetism={v.enableMagnetism}
            disableAnimations={v.disableAnimations}
          />
        )
      }
    />
  ),

  // ── stack ──
  'stack': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'randomRotation', label: '随机旋转', type: 'boolean', default: false },
        { prop: 'autoplay', label: '自动播放', type: 'boolean', default: false },
        { prop: 'pauseOnHover', label: '悬停暂停', type: 'boolean', default: false },
        { prop: 'sensitivity', label: '灵敏度', type: 'number', default: 200, min: 50, max: 500, step: 10 },
        { prop: 'autoplayDelay', label: '自动切换间隔', type: 'number', default: 3000, min: 500, max: 10000, step: 500 },
      ]}
      defaults={{ randomRotation: false, autoplay: false, pauseOnHover: false, sensitivity: 200, autoplayDelay: 3000 }}
      render={(v) =>
        demoWrap(
          <div className="w-full max-w-sm h-[350px]">
            <Stack
              randomRotation={v.randomRotation}
              sendToBackOnClick
              autoplay={v.autoplay}
              autoplayDelay={v.autoplayDelay}
              pauseOnHover={v.pauseOnHover}
              sensitivity={v.sensitivity}
              cards={[
                <div key="1" className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">卡片 1</div>,
                <div key="2" className="w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">卡片 2</div>,
                <div key="3" className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">卡片 3</div>,
              ]}
            />
          </div>
        )
      }
    />
  ),

  // ── pill-nav ──
  'pill-nav': () =>
    demoWrap(
      <div className="relative w-full max-w-3xl h-[120px]">
        <PillNav
          logo={P('logop', 40, 40)}
          logoAlt="Logo"
          items={[
            { label: '首页', href: '#', ariaLabel: '首页' },
            { label: '组件', href: '#', ariaLabel: '组件' },
            { label: '动画', href: '#', ariaLabel: '动画' },
            { label: '背景', href: '#', ariaLabel: '背景' },
          ]}
          baseColor="#120F17"
          pillColor="#ffffff"
          hoveredPillTextColor="#120F17"
          initialLoadAnimation
        />
      </div>
    ),

  // ── masonry ──
  'masonry': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'ease', label: '缓动函数', type: 'select', default: 'power3.out',
          options: [{ value: 'power3.out', label: 'power3.out' }, { value: 'power2.out', label: 'power2.out' }, { value: 'expo.out', label: 'expo.out' }] },
        { prop: 'animateFrom', label: '入场方向', type: 'select', default: 'bottom',
          options: [{ value: 'bottom', label: '底部' }, { value: 'top', label: '顶部' }, { value: 'left', label: '左侧' }, { value: 'right', label: '右侧' }, { value: 'center', label: '中心' }, { value: 'random', label: '随机' }] },
        { prop: 'duration', label: '时长', type: 'number', default: 0.6, min: 0.1, max: 3, step: 0.1 },
        { prop: 'stagger', label: '间隔', type: 'number', default: 0.05, min: 0, max: 0.5, step: 0.01 },
        { prop: 'scaleOnHover', label: '悬停放大', type: 'boolean', default: true },
        { prop: 'blurToFocus', label: '模糊聚焦', type: 'boolean', default: true },
        { prop: 'colorShiftOnHover', label: '悬停变色', type: 'boolean', default: false },
      ]}
      defaults={{ ease: 'power3.out', animateFrom: 'bottom', duration: 0.6, stagger: 0.05, scaleOnHover: true, blurToFocus: true, colorShiftOnHover: false }}
      render={(v) =>
        demoWrap(
          <div className="w-full max-w-3xl">
            <Masonry
              items={[
                { id: '1', img: P('m1', 300, 400), url: '#', height: 400 },
                { id: '2', img: P('m2', 300, 250), url: '#', height: 250 },
                { id: '3', img: P('m3', 300, 350), url: '#', height: 350 },
                { id: '4', img: P('m4', 300, 300), url: '#', height: 300 },
                { id: '5', img: P('m5', 300, 380), url: '#', height: 380 },
              ]}
              ease={v.ease}
              animateFrom={v.animateFrom}
              duration={v.duration}
              stagger={v.stagger}
              scaleOnHover={v.scaleOnHover}
              blurToFocus={v.blurToFocus}
              colorShiftOnHover={v.colorShiftOnHover}
            />
          </div>
        )
      }
    />
  ),

  // ── dome-gallery ──
  'dome-gallery': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'fit', label: '适配大小', type: 'number', default: 0.5, min: 0.2, max: 1.5, step: 0.1 },
        { prop: 'minRadius', label: '最小半径', type: 'number', default: 600, min: 300, max: 1200, step: 50 },
        { prop: 'maxVerticalRotationDeg', label: '最大纵向旋转', type: 'number', default: 5, min: 0, max: 30, step: 1 },
        { prop: 'segments', label: '分段数', type: 'number', default: 35, min: 10, max: 60, step: 1 },
        { prop: 'dragDampening', label: '拖拽阻尼', type: 'number', default: 2, min: 0, max: 10, step: 0.5 },
        { prop: 'grayscale', label: '灰度', type: 'boolean', default: true },
      ]}
      defaults={{ fit: 0.5, minRadius: 600, maxVerticalRotationDeg: 5, segments: 35, dragDampening: 2, grayscale: true }}
      render={(v) =>
        fullWrap(
          <div className="h-[400px] w-full max-w-3xl rounded-xl border border-white/10 overflow-hidden">
            <DomeGallery
              images={[P('dg1', 600, 400), P('dg2', 600, 400), P('dg3', 600, 400), P('dg4', 600, 400)]}
              fit={v.fit}
              minRadius={v.minRadius}
              maxVerticalRotationDeg={v.maxVerticalRotationDeg}
              segments={v.segments}
              dragDampening={v.dragDampening}
              grayscale={v.grayscale}
            />
          </div>
        )
      }
    />
  ),

  // ── chroma-grid ──
  'chroma-grid': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'radius', label: '聚光半径', type: 'number', default: 300, min: 100, max: 600, step: 20 },
        { prop: 'damping', label: '跟随阻尼', type: 'number', default: 0.45, min: 0.1, max: 2, step: 0.05 },
        { prop: 'fadeOut', label: '淡出时间', type: 'number', default: 0.6, min: 0.1, max: 3, step: 0.1 },
      ]}
      defaults={{ radius: 300, damping: 0.45, fadeOut: 0.6 }}
      render={(v) =>
        fullWrap(
          <div className="h-[400px] w-full max-w-4xl">
            <ChromaGrid radius={v.radius} damping={v.damping} fadeOut={v.fadeOut} />
          </div>
        )
      }
    />
  ),

  // ── lanyard ──
  'lanyard': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'positionZ', label: '相机距离', type: 'number', default: 30, min: 15, max: 50, step: 1 },
        { prop: 'disableGravity', label: '禁用重力', type: 'boolean', default: false },
      ]}
      defaults={{ positionZ: 30, disableGravity: false }}
      render={(v) =>
        fullWrap(
          <div className="w-full max-w-lg h-[350px] rounded-xl border border-white/10 bg-black/30 overflow-hidden cursor-grab">
            <Lanyard
              position={[0, 0, v.positionZ]}
              gravity={v.disableGravity ? [0, 0, 0] : [0, -40, 0]}
              fov={20}
              transparent
            />
          </div>
        )
      }
    />
  ),

  // ── bounce-cards ──
  'bounce-cards': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'enableHover', label: '悬停交互', type: 'boolean', default: false },
        { prop: 'animationDelay', label: '动画延迟', type: 'number', default: 0.5, min: 0, max: 3, step: 0.1 },
        { prop: 'animationStagger', label: '逐位间隔', type: 'number', default: 0.06, min: 0, max: 0.5, step: 0.01 },
      ]}
      defaults={{ enableHover: false, animationDelay: 0.5, animationStagger: 0.06 }}
      render={(v) =>
        demoWrap(
          <div className="flex justify-center">
            <BounceCards
              images={IMAGES5}
              enableHover={v.enableHover}
              animationDelay={v.animationDelay}
              animationStagger={v.animationStagger}
              containerWidth={500}
              containerHeight={400}
            />
          </div>
        )
      }
    />
  ),

  // ── infinite-menu ──
  'infinite-menu': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'scale', label: '缩放', type: 'number', default: 1, min: 0.5, max: 2, step: 0.1 },
      ]}
      defaults={{ scale: 1 }}
      render={(v) =>
        fullWrap(
          <div className="w-full max-w-3xl h-[350px] rounded-xl border border-white/10 bg-black/30 overflow-hidden">
            <InfiniteMenu
              scale={v.scale}
              items={[
                { image: P('im1', 300, 400), link: '#', title: '项目一', description: 'Web 应用' },
                { image: P('im2', 300, 400), link: '#', title: '项目二', description: '移动端 App' },
                { image: P('im3', 300, 400), link: '#', title: '项目三', description: '品牌设计' },
                { image: P('im4', 300, 400), link: '#', title: '项目四', description: '3D 可视化' },
              ]}
            />
          </div>
        )
      }
    />
  ),

  // ── elastic-slider ──
  'elastic-slider': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'defaultValue', label: '默认值', type: 'number', default: 50, min: 0, max: 100, step: 1 },
        { prop: 'startingValue', label: '起始值', type: 'number', default: 0, min: 0, max: 99, step: 1 },
        { prop: 'maxValue', label: '最大值', type: 'number', default: 100, min: 1, max: 200, step: 1 },
        { prop: 'isStepped', label: '步进模式', type: 'boolean', default: false },
        { prop: 'stepSize', label: '步长', type: 'number', default: 10, min: 1, max: 50, step: 1 },
      ]}
      defaults={{ defaultValue: 50, startingValue: 0, maxValue: 100, isStepped: false, stepSize: 10 }}
      render={(v) =>
        demoWrap(
          <ElasticSlider
            defaultValue={v.defaultValue}
            startingValue={v.startingValue}
            maxValue={v.maxValue}
            isStepped={v.isStepped}
            stepSize={v.stepSize}
          />
        )
      }
    />
  ),

  // ── flowing-menu ──
  'flowing-menu': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'speed', label: '速度', type: 'number', default: 15, min: 5, max: 40, step: 1 },
        { prop: 'textColor', label: '文字颜色', type: 'color', default: '#ffffff' },
        { prop: 'bgColor', label: '背景颜色', type: 'color', default: '#120F17' },
        { prop: 'marqueeBgColor', label: '滚动条背景', type: 'color', default: '#ffffff' },
        { prop: 'marqueeTextColor', label: '滚动条文字', type: 'color', default: '#120F17' },
        { prop: 'borderColor', label: '边框颜色', type: 'color', default: '#ffffff' },
      ]}
      defaults={{ speed: 15, textColor: '#ffffff', bgColor: '#120F17', marqueeBgColor: '#ffffff', marqueeTextColor: '#120F17', borderColor: '#ffffff' }}
      render={(v) =>
        fullWrap(
          <div className="w-full max-w-3xl h-[350px] rounded-xl border border-white/10 overflow-hidden">
            <FlowingMenu
              items={[
                { link: '#', text: '首页', image: P('fm1', 200, 80) },
                { link: '#', text: '作品', image: P('fm2', 200, 80) },
                { link: '#', text: '关于', image: P('fm3', 200, 80) },
                { link: '#', text: '联系', image: P('fm4', 200, 80) },
              ]}
              speed={v.speed}
              textColor={v.textColor}
              bgColor={v.bgColor}
              marqueeBgColor={v.marqueeBgColor}
              marqueeTextColor={v.marqueeTextColor}
              borderColor={v.borderColor}
            />
          </div>
        )
      }
    />
  ),

  // ── decay-card ──
  'decay-card': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'width', label: '宽度', type: 'number', default: 300, min: 150, max: 500, step: 10 },
        { prop: 'height', label: '高度', type: 'number', default: 400, min: 200, max: 600, step: 10 },
        { prop: 'baseFrequency', label: '基础频率', type: 'number', default: 0.015, min: 0.005, max: 0.05, step: 0.001 },
        { prop: 'numOctaves', label: '八度数', type: 'number', default: 5, min: 1, max: 10, step: 1 },
        { prop: 'seed', label: '种子', type: 'number', default: 4, min: 1, max: 10, step: 1 },
        { prop: 'maxDisplacement', label: '最大位移', type: 'number', default: 400, min: 50, max: 800, step: 10 },
        { prop: 'movementBound', label: '移动范围', type: 'number', default: 50, min: 10, max: 150, step: 5 },
      ]}
      defaults={{ width: 300, height: 400, baseFrequency: 0.015, numOctaves: 5, seed: 4, maxDisplacement: 400, movementBound: 50 }}
      render={(v) =>
        demoWrap(
          <DecayCard
            image={P('dc', 300, 400)}
            width={v.width}
            height={v.height}
            baseFrequency={v.baseFrequency}
            numOctaves={v.numOctaves}
            seed={v.seed}
            maxDisplacement={v.maxDisplacement}
            movementBound={v.movementBound}
          >
            衰减效果
          </DecayCard>
        )
      }
    />
  ),

  // ── glass-icons ──
  'glass-icons': () =>
    demoWrap(
      <div className="flex gap-6">
        <GlassIcons
          items={[
            { icon: <span className="text-2xl">🏠</span>, label: '首页', color: '#6366f1' },
            { icon: <span className="text-2xl">📁</span>, label: '文件', color: '#06b6d4' },
            { icon: <span className="text-2xl">⚙️</span>, label: '设置', color: '#8b5cf6' },
            { icon: <span className="text-2xl">💡</span>, label: '灵感', color: '#f59e0b' },
            { icon: <span className="text-2xl">👤</span>, label: '用户', color: '#ef4444' },
          ]}
        />
      </div>
    ),

  // ── border-glow ──
  'border-glow': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'edgeSensitivity', label: '边缘灵敏度', type: 'number', default: 30, min: 5, max: 80, step: 1 },
        { prop: 'borderRadius', label: '圆角', type: 'number', default: 28, min: 0, max: 60, step: 2 },
        { prop: 'glowRadius', label: '辉光半径', type: 'number', default: 40, min: 10, max: 120, step: 5 },
        { prop: 'glowIntensity', label: '辉光强度', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1 },
        { prop: 'coneSpread', label: '锥角宽度', type: 'number', default: 25, min: 5, max: 45, step: 1 },
        { prop: 'animated', label: '入场动画', type: 'boolean', default: false },
        { prop: 'backgroundColor', label: '背景色', type: 'color', default: '#120F17' },
        { prop: 'color1', label: '渐变色 1', type: 'color', default: '#6366f1' },
        { prop: 'color2', label: '渐变色 2', type: 'color', default: '#06b6d4' },
        { prop: 'color3', label: '渐变色 3', type: 'color', default: '#8b5cf6' },
      ]}
      defaults={{ edgeSensitivity: 30, borderRadius: 28, glowRadius: 40, glowIntensity: 1, coneSpread: 25, animated: false, backgroundColor: '#120F17', color1: '#6366f1', color2: '#06b6d4', color3: '#8b5cf6' }}
      render={(v) =>
        demoWrap(
          <BorderGlow
            edgeSensitivity={v.edgeSensitivity}
            borderRadius={v.borderRadius}
            glowRadius={v.glowRadius}
            glowIntensity={v.glowIntensity}
            coneSpread={v.coneSpread}
            animated={v.animated}
            backgroundColor={v.backgroundColor}
            colors={[v.color1, v.color2, v.color3]}
          >
            <div className="w-64 h-32 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
              边框辉光
            </div>
          </BorderGlow>
        )
      }
    />
  ),

  // ── pixel-card ──
  'pixel-card': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'variant', label: '样式', type: 'select', default: 'default',
          options: [
            { value: 'default', label: '默认 Default' },
            { value: 'simple', label: '简洁 Simple' },
          ] },
      ]}
      defaults={{ variant: 'default' }}
      render={(v) =>
        demoWrap(
          <PixelCard variant={v.variant} className="w-64 h-40 flex items-center justify-center text-white text-lg font-bold">
            像素卡片
          </PixelCard>
        )
      }
    />
  ),

  // ── gooey-nav ──
  'gooey-nav': () => (
    <InteractiveDemo
      knobs={[
        { prop: 'particleCount', label: '粒子数量', type: 'number', default: 15, min: 5, max: 40, step: 1 },
        { prop: 'timeVariance', label: '动画差异', type: 'number', default: 300, min: 50, max: 800, step: 50 },
        { prop: 'particleR', label: '半径系数', type: 'number', default: 100, min: 30, max: 200, step: 10 },
      ]}
      defaults={{ particleCount: 15, timeVariance: 300, particleR: 100 }}
      render={(v) =>
        demoWrap(
          <div className="w-full max-w-lg h-[100px]">
            <GooeyNav
              items={[
                { label: '首页', href: '#' },
                { label: '作品', href: '#' },
                { label: '关于', href: '#' },
                { label: '联系', href: '#' },
              ]}
              particleCount={v.particleCount}
              timeVariance={v.timeVariance}
              particleR={v.particleR}
            />
          </div>
        )
      }
    />
  ),

  // ── profile-card ──
  'profile-card': () =>
    demoWrap(
      <ProfileCard
        avatarUrl={P('pf1', 400, 600)}
        miniAvatarUrl={P('pf2', 100, 100)}
        name="张三"
        title="高级前端工程师"
        handle="zhangsan_dev"
        status="在线"
      />
    ),

  // === 以下 20 个组件保持简化演示 ===

  'specular-button': () =>
    demoWrap(
      <div className="flex flex-wrap items-center justify-center gap-6">
        <SpecularButton size="sm">小型按钮</SpecularButton>
        <SpecularButton size="md">中型按钮</SpecularButton>
        <SpecularButton size="lg" lineColor="#22d3ee" baseColor="#1e3a5f">大型按钮</SpecularButton>
      </div>
    ),

  'curved-input': () =>
    demoWrap(<div className="w-full max-w-lg py-12"><CurvedInput placeholder="输入邮箱地址" buttonText="订阅" theme="dark" /></div>),

  'line-sidebar': () =>
    fullWrap(<div className="w-full max-w-sm pl-16 py-8"><LineSidebar items={['概览', '组件库', '动画效果', '背景素材', '展示页', '更新日志']} accentColor="#22d3ee" textColor="#a1a1aa" /></div>),

  'animated-list': () =>
    demoWrap(<AnimatedList items={['通知中心', '消息列表', '任务管理', '日程安排', '文件管理', '设置偏好', '用户资料', '数据面板']} onItemSelect={(item, idx) => console.log(item, idx)} />),

  'scroll-stack': () =>
    fullWrap(
      <div className="h-[500px] w-full max-w-2xl">
        <ScrollStack>
          <ScrollStackItem className="bg-gradient-to-br from-purple-600 to-blue-500"><h3 className="text-2xl font-bold text-white">卡片一</h3><p className="text-white/70">滚动查看堆叠效果</p></ScrollStackItem>
          <ScrollStackItem className="bg-gradient-to-br from-cyan-500 to-teal-400"><h3 className="text-2xl font-bold text-white">卡片二</h3><p className="text-white/70">每张卡片逐渐缩小叠加</p></ScrollStackItem>
          <ScrollStackItem className="bg-gradient-to-br from-orange-500 to-red-500"><h3 className="text-2xl font-bold text-white">卡片三</h3><p className="text-white/70">最后一张展示完成后结束</p></ScrollStackItem>
        </ScrollStack>
      </div>
    ),

  'bubble-menu': () =>
    fullWrap(
      <div className="relative w-full max-w-3xl h-[500px] overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <BubbleMenu logo={<span className="text-lg font-bold text-gray-800">Logo</span>} menuBg="#ffffff" menuContentColor="#111111" useFixedPosition={false} />
        <p className="absolute bottom-4 left-4 text-xs text-white/40">点击右上角菜单按钮展开</p>
      </div>
    ),

  'reflective-card': () => demoWrap(<ReflectiveCard metalness={0.8} roughness={0.3} />),

  'card-swap': () =>
    demoWrap(
      <div className="relative w-full max-w-md h-[350px]">
        <CardSwap>
          <Card className="bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-xl font-bold text-white">卡片 A</Card>
          <Card className="bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white">卡片 B</Card>
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl font-bold text-white">卡片 C</Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl font-bold text-white">卡片 D</Card>
        </CardSwap>
      </div>
    ),

  'fluid-glass': () =>
    fullWrap(<div className="w-full max-w-3xl h-[400px] rounded-xl border border-white/10 overflow-hidden"><FluidGlass mode="lens" /></div>),

  'tilted-card': () =>
    demoWrap(<TiltedCard imageSrc={P('tilt', 400, 400)} altText="倾斜卡片示例" captionText="悬停查看3D倾斜效果" containerHeight="300px" imageWidth="300px" imageHeight="300px" />),

  'glass-surface': () =>
    demoWrap(<GlassSurface className="w-80 h-60 flex items-center justify-center text-white text-lg font-semibold">毛玻璃表面效果</GlassSurface>),

  'folder': () => demoWrap(<Folder color="#6366f1" size={1.5} />),

  'staggered-menu': () =>
    fullWrap(
      <div className="relative w-full max-w-3xl h-[400px] rounded-xl border border-white/10 bg-black/20 overflow-hidden">
        <StaggeredMenu isFixed={false} position="right" items={[{ label: '首页', ariaLabel: '首页', link: '#' }, { label: '作品', ariaLabel: '作品集', link: '#' }, { label: '关于', ariaLabel: '关于我们', link: '#' }, { label: '联系', ariaLabel: '联系我们', link: '#' }]} displaySocials={false} />
      </div>
    ),

  'model-viewer': () => demoWrap(<span className="text-base text-white/40">模型查看器需要 .glb/.obj 3D 模型文件</span>),

  'dock': () =>
    demoWrap(
      <div className="w-full max-w-xl h-[120px]">
        <Dock items={[{ icon: <span className="text-2xl">🏠</span>, label: '首页', onClick: () => {} }, { icon: <span className="text-2xl">🔍</span>, label: '搜索', onClick: () => {} }, { icon: <span className="text-2xl">⭐</span>, label: '收藏', onClick: () => {} }, { icon: <span className="text-2xl">⚙️</span>, label: '设置', onClick: () => {} }, { icon: <span className="text-2xl">👤</span>, label: '用户', onClick: () => {} }]} />
      </div>
    ),

  'carousel': () =>
    demoWrap(<div className="w-full max-w-3xl"><Carousel items={[{ image: P('ca1', 600, 400), link: '#', title: '作品 1' }, { image: P('ca2', 600, 400), link: '#', title: '作品 2' }, { image: P('ca3', 600, 400), link: '#', title: '作品 3' }]} /></div>),

  'spotlight-card': () =>
    demoWrap(<SpotlightCard className="w-72 p-6"><h3 className="text-lg font-bold text-white mb-2">聚光卡片</h3><p className="text-sm text-white/60">鼠标移动查看聚光灯效果</p></SpotlightCard>),

  'flying-posters': () =>
    fullWrap(<div className="w-full max-w-lg h-[350px] rounded-xl border border-white/10 overflow-hidden"><FlyingPosters items={[P('fp1', 400, 500), P('fp2', 400, 500), P('fp3', 400, 500)]} /></div>),

  'counter': () => demoWrap(<Counter value={12345} />),

  'stepper': () =>
    demoWrap(
      <Stepper
        steps={[
          { title: '第一步', description: '填写基本信息' },
          { title: '第二步', description: '验证邮箱地址' },
          { title: '第三步', description: '完成注册' },
        ]}
      />
    ),
};
