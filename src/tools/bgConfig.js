// 背景工作室配置：45 个真实背景组件 + 中文名 + 参数映射
// 每个背景定义：zh(中文名)、component(组件)、map(参数映射 generic → prop)
import Plasma from '../bits/Backgrounds/Plasma';
import Aurora from '../bits/Backgrounds/Aurora';
import Silk from '../bits/Backgrounds/Silk';
import Balatro from '../bits/Backgrounds/Balatro';
import Galaxy from '../bits/Backgrounds/Galaxy';
import Waves from '../bits/Backgrounds/Waves';
import DotGrid from '../bits/Backgrounds/DotGrid';
import GradientBlinds from '../bits/Backgrounds/GradientBlinds';
import Iridescence from '../bits/Backgrounds/Iridescence';
import Lightning from '../bits/Backgrounds/Lightning';
import Beams from '../bits/Backgrounds/Beams';
import Dither from '../bits/Backgrounds/Dither';
import DarkVeil from '../bits/Backgrounds/DarkVeil';
import Ferrofluid from '../bits/Backgrounds/Ferrofluid';
import GridDistortion from '../bits/Backgrounds/GridDistortion';
import GridMotion from '../bits/Backgrounds/GridMotion';
import Hyperspeed from '../bits/Backgrounds/Hyperspeed';
import LetterGlitch from '../bits/Backgrounds/LetterGlitch';
import Lightfall from '../bits/Backgrounds/Lightfall';
import LightPillar from '../bits/Backgrounds/LightPillar';
import LightRays from '../bits/Backgrounds/LightRays';
import LineWaves from '../bits/Backgrounds/LineWaves';
import LiquidChrome from '../bits/Backgrounds/LiquidChrome';
import LiquidEther from '../bits/Backgrounds/LiquidEther';
import Orb from '../bits/Backgrounds/Orb';
import Particles from '../bits/Backgrounds/Particles';
import PixelBlast from '../bits/Backgrounds/PixelBlast';
import PixelSnow from '../bits/Backgrounds/PixelSnow';
import PlasmaWave from '../bits/Backgrounds/PlasmaWave';
import Prism from '../bits/Backgrounds/Prism';
import PrismaticBurst from '../bits/Backgrounds/PrismaticBurst';
import Radar from '../bits/Backgrounds/Radar';
import RippleGrid from '../bits/Backgrounds/RippleGrid';
import ShapeGrid from '../bits/Backgrounds/ShapeGrid';
import SideRays from '../bits/Backgrounds/SideRays';
import SoftAurora from '../bits/Backgrounds/SoftAurora';
import Threads from '../bits/Backgrounds/Threads';
import ColorBends from '../bits/Backgrounds/ColorBends';
import DotField from '../bits/Backgrounds/DotField';
import EvilEye from '../bits/Backgrounds/EvilEye';
import FaultyTerminal from '../bits/Backgrounds/FaultyTerminal';
import FloatingLines from '../bits/Backgrounds/FloatingLines';
import Grainient from '../bits/Backgrounds/Grainient';
import Ballpit from '../bits/Backgrounds/Ballpit';

// 每个背景：zh(中文名), comp(组件), map(参数映射)
// map: { generic_param: 'prop_name' } — 把通用参数映射到组件实际 prop
export const BG_CONFIG = [
  { key: 'plasma', zh: '等离子', comp: Plasma, map: { speed: 'speed', scale: 'scale', color: 'color', noise: 'opacity', rotation: null } },
  { key: 'aurora', zh: '极光', comp: Aurora, map: { speed: null, scale: 'amplitude', color: null, noise: 'blend', rotation: null } },
  { key: 'silk', zh: '丝绸', comp: Silk, map: { speed: 'speed', scale: 'scale', color: 'color', noise: 'noiseIntensity', rotation: 'rotation' } },
  { key: 'balatro', zh: '巴拉特罗', comp: Balatro, map: { speed: 'spinSpeed', scale: null, color: null, noise: 'contrast', rotation: 'spinRotation' } },
  { key: 'galaxy', zh: '星系', comp: Galaxy, map: { speed: 'speed', scale: 'density', color: null, noise: 'glowIntensity', rotation: null } },
  { key: 'waves', zh: '波浪', comp: Waves, map: { speed: 'waveSpeedX', scale: 'waveAmpX', color: 'lineColor', noise: null, rotation: null } },
  { key: 'dot-grid', zh: '点网格', comp: DotGrid, map: { speed: null, scale: 'dotSize', color: 'baseColor', noise: null, rotation: null } },
  { key: 'gradient-blinds', zh: '渐变百叶', comp: GradientBlinds, map: { speed: null, scale: 'blindCount', color: null, noise: 'noise', rotation: 'angle' } },
  { key: 'iridescence', zh: '虹彩', comp: Iridescence, map: { speed: 'speed', scale: null, color: null, noise: null, rotation: null } },
  { key: 'lightning', zh: '闪电', comp: Lightning, map: { speed: 'speed', scale: 'size', color: null, noise: 'intensity', rotation: null } },
  { key: 'beams', zh: '光束', comp: Beams, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'dither', zh: '抖动', comp: Dither, map: { speed: null, scale: null, color: 'color', noise: null, rotation: null } },
  { key: 'dark-veil', zh: '暗纱', comp: DarkVeil, map: { speed: 'speed', scale: null, color: null, noise: 'noiseIntensity', rotation: null } },
  { key: 'ferrofluid', zh: '铁磁流体', comp: Ferrofluid, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'grid-distortion', zh: '网格扭曲', comp: GridDistortion, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'grid-motion', zh: '网格运动', comp: GridMotion, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'hyperspeed', zh: '超高速', comp: Hyperspeed, map: { speed: null, scale: null, color: null, noise: null, rotation: null }, hidden: true },
  { key: 'letter-glitch', zh: '字母故障', comp: LetterGlitch, map: { speed: 'glitchSpeed', scale: null, color: null, noise: null, rotation: null } },
  { key: 'lightfall', zh: '光落', comp: Lightfall, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'light-pillar', zh: '光柱', comp: LightPillar, map: { speed: 'rotationSpeed', scale: null, color: null, noise: 'intensity', rotation: null } },
  { key: 'light-rays', zh: '光线', comp: LightRays, map: { speed: 'raysSpeed', scale: 'lightSpread', color: 'raysColor', noise: null, rotation: null } },
  { key: 'line-waves', zh: '线波', comp: LineWaves, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'liquid-chrome', zh: '液态铬', comp: LiquidChrome, map: { speed: 'speed', scale: 'amplitude', color: 'baseColor', noise: null, rotation: null } },
  { key: 'liquid-ether', zh: '液态以太', comp: LiquidEther, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'orb', zh: '球体', comp: Orb, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'particles', zh: '粒子', comp: Particles, map: { speed: 'speed', scale: 'particleCount', color: 'particleColor', noise: null, rotation: null } },
  { key: 'pixel-blast', zh: '像素爆发', comp: PixelBlast, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'pixel-snow', zh: '像素雪', comp: PixelSnow, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'plasma-wave', zh: '等离子波', comp: PlasmaWave, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'prism', zh: '棱镜', comp: Prism, map: { speed: null, scale: 'height', color: null, noise: 'noise', rotation: null } },
  { key: 'prismatic-burst', zh: '棱彩爆发', comp: PrismaticBurst, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'radar', zh: '雷达', comp: Radar, map: { speed: 'speed', scale: 'scale', color: null, noise: null, rotation: null } },
  { key: 'ripple-grid', zh: '涟漪网格', comp: RippleGrid, map: { speed: null, scale: 'gridSize', color: 'gridColor', noise: 'rippleIntensity', rotation: null } },
  { key: 'shape-grid', zh: '形状网格', comp: ShapeGrid, map: { speed: 'speed', scale: 'squareSize', color: null, noise: null, rotation: null } },
  { key: 'side-rays', zh: '侧向光线', comp: SideRays, map: { speed: 'speed', scale: 'spread', color: null, noise: 'intensity', rotation: null } },
  { key: 'soft-aurora', zh: '柔极光', comp: SoftAurora, map: { speed: 'speed', scale: null, color: null, noise: null, rotation: null } },
  { key: 'threads', zh: '丝线', comp: Threads, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'color-bends', zh: '色彩弯折', comp: ColorBends, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'dot-field', zh: '点阵', comp: DotField, map: { speed: null, scale: 'dotSpacing', color: null, noise: null, rotation: null } },
  { key: 'evil-eye', zh: '邪眼', comp: EvilEye, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'faulty-terminal', zh: '故障终端', comp: FaultyTerminal, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'floating-lines', zh: '浮线', comp: FloatingLines, map: { speed: null, scale: null, color: 'gradientColor', noise: null, rotation: null } },
  { key: 'grainient', zh: '颗粒渐变', comp: Grainient, map: { speed: null, scale: null, color: null, noise: null, rotation: null } },
  { key: 'ballpit', zh: '球池', comp: Ballpit, map: { speed: null, scale: null, color: null, noise: null, rotation: null }, hidden: true },
];

export const PARAM_DEFS = [
  { key: 'speed', label: '速度', min: 0, max: 5, step: 0.1, default: 1.0 },
  { key: 'scale', label: '缩放', min: 0.1, max: 3, step: 0.05, default: 1.0 },
  { key: 'color', label: '颜色', type: 'color', default: '#0ea5e9' },
  { key: 'noise', label: '噪点强度', min: 0, max: 2, step: 0.05, default: 1.0 },
  { key: 'rotation', label: '旋转', min: -180, max: 180, step: 1, default: 0 },
];

export const DEFAULT_PARAMS = { speed: 1.0, scale: 1.0, color: '#0ea5e9', noise: 1.0, rotation: 0 };
