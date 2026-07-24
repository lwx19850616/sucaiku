// 组件类组件的演示包装（中文示例）
// 每个导出对应 components.js 里 Components 分类的 slug
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

// 占位图片
const P = (seed, w = 480, h = 320) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const demoWrap = (node) => (
  <div className="flex min-h-[140px] w-full items-center justify-center py-8">{node}</div>
);

const fullWrap = (node) => (
  <div className="flex min-h-[280px] w-full items-center justify-center py-4">{node}</div>
);

const IMAGES5 = [P('bc1', 200, 200), P('bc2', 200, 200), P('bc3', 200, 200), P('bc4', 200, 200), P('bc5', 200, 200)];

const FLOWING_ITEMS = [
  { link: '#', text: '首页', image: P('fm1', 200, 80) },
  { link: '#', text: '作品', image: P('fm2', 200, 80) },
  { link: '#', text: '关于', image: P('fm3', 200, 80) },
  { link: '#', text: '联系', image: P('fm4', 200, 80) },
];

const MENU_ITEMS = [
  { label: '首页', href: '#', ariaLabel: '首页' },
  { label: '组件', href: '#', ariaLabel: '组件' },
  { label: '动画', href: '#', ariaLabel: '动画' },
  { label: '背景', href: '#', ariaLabel: '背景' },
];

const CNAV_ITEMS = [
  {
    label: '组件库',
    bgColor: '#4F46E5',
    textColor: '#ffffff',
    links: [
      { label: '按钮', href: '#', ariaLabel: '按钮' },
      { label: '卡片', href: '#', ariaLabel: '卡片' },
    ],
  },
  {
    label: '动画效果',
    bgColor: '#10B981',
    textColor: '#ffffff',
    links: [
      { label: '文字动画', href: '#', ariaLabel: '文字动画' },
      { label: '背景动画', href: '#', ariaLabel: '背景动画' },
    ],
  },
  {
    label: '工具',
    bgColor: '#F59E0B',
    textColor: '#000000',
    links: [
      { label: '背景工作室', href: '#', ariaLabel: '背景工作室' },
      { label: '形状魔法', href: '#', ariaLabel: '形状魔法' },
    ],
  },
];

const MASONRY_ITEMS = [
  { image: P('m1', 300, 400), height: 400 },
  { image: P('m2', 300, 250), height: 250 },
  { image: P('m3', 300, 350), height: 350 },
  { image: P('m4', 300, 300), height: 300 },
  { image: P('m5', 300, 380), height: 380 },
  { image: P('m6', 300, 220), height: 220 },
];

const CAROUSEL_ITEMS = [
  { image: P('ca1', 600, 400), link: '#', title: '作品 1' },
  { image: P('ca2', 600, 400), link: '#', title: '作品 2' },
  { image: P('ca3', 600, 400), link: '#', title: '作品 3' },
  { image: P('ca4', 600, 400), link: '#', title: '作品 4' },
];

export const COMPONENT_DEMOS = {
  // --- specular-button ---
  'specular-button': () =>
    demoWrap(
      <div className="flex flex-wrap items-center justify-center gap-6">
        <SpecularButton size="sm">小型按钮</SpecularButton>
        <SpecularButton size="md">中型按钮</SpecularButton>
        <SpecularButton size="lg" lineColor="#22d3ee" baseColor="#1e3a5f">
          大型按钮
        </SpecularButton>
      </div>
    ),

  // --- option-wheel ---
  'option-wheel': () =>
    fullWrap(
      <div className="h-[400px] w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <OptionWheel
          items={['环境音乐', '浩室音乐', '电子音乐', '爵士乐', '低保真', '合成波']}
          textColor="#a6a6a6"
          activeColor="#22d3ee"
          side="left"
        />
      </div>
    ),

  // --- curved-input ---
  'curved-input': () =>
    demoWrap(
      <div className="w-full max-w-lg py-12">
        <CurvedInput placeholder="输入邮箱地址" buttonText="订阅" theme="dark" />
      </div>
    ),

  // --- line-sidebar ---
  'line-sidebar': () =>
    fullWrap(
      <div className="w-full max-w-sm pl-16 py-8">
        <LineSidebar
          items={['概览', '组件库', '动画效果', '背景素材', '展示页', '更新日志']}
          accentColor="#22d3ee"
          textColor="#a1a1aa"
        />
      </div>
    ),

  // --- animated-list ---
  'animated-list': () =>
    demoWrap(
      <AnimatedList
        items={['通知中心', '消息列表', '任务管理', '日程安排', '文件管理', '设置偏好', '用户资料', '数据面板']}
        onItemSelect={(item, idx) => console.log(item, idx)}
      />
    ),

  // --- scroll-stack ---
  'scroll-stack': () =>
    fullWrap(
      <div className="h-[500px] w-full max-w-2xl">
        <ScrollStack>
          <ScrollStackItem className="bg-gradient-to-br from-purple-600 to-blue-500">
            <h3 className="text-2xl font-bold text-white">卡片一</h3>
            <p className="text-white/70">滚动查看堆叠效果</p>
          </ScrollStackItem>
          <ScrollStackItem className="bg-gradient-to-br from-cyan-500 to-teal-400">
            <h3 className="text-2xl font-bold text-white">卡片二</h3>
            <p className="text-white/70">每张卡片逐渐缩小叠加</p>
          </ScrollStackItem>
          <ScrollStackItem className="bg-gradient-to-br from-orange-500 to-red-500">
            <h3 className="text-2xl font-bold text-white">卡片三</h3>
            <p className="text-white/70">最后一张展示完成后结束</p>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    ),

  // --- bubble-menu ---
  'bubble-menu': () =>
    fullWrap(
      <div className="relative w-full max-w-3xl h-[500px] overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <BubbleMenu
          logo={<span className="text-lg font-bold text-gray-800">Logo</span>}
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={false}
        />
        <p className="absolute bottom-4 left-4 text-xs text-white/40">点击右上角菜单按钮展开</p>
      </div>
    ),

  // --- magic-bento ---
  'magic-bento': () =>
    demoWrap(
      <MagicBento
        cards={[
          { title: '项目展示', description: '精选设计作品集', image: P('mb1', 300, 200), color: '#6366f1' },
          { title: '开发工具', description: '常用技术栈一览', image: P('mb2', 300, 200), color: '#06b6d4' },
          { title: '设计系统', description: '组件库与规范', image: P('mb3', 300, 200), color: '#8b5cf6' },
          { title: '博客文章', description: '最新技术分享', image: P('mb4', 300, 200), color: '#f59e0b' },
        ]}
      />
    ),

  // --- circular-gallery ---
  'circular-gallery': () =>
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
        />
      </div>
    ),

  // --- reflective-card ---
  'reflective-card': () =>
    demoWrap(
      <ReflectiveCard metalness={0.8} roughness={0.3} />
    ),

  // --- card-nav ---
  'card-nav': () =>
    fullWrap(
      <div className="relative w-full max-w-3xl h-[400px] rounded-xl border border-white/10 bg-black/20">
        <CardNav
          logo={P('logo', 120, 32)}
          logoAlt="Logo"
          items={CNAV_ITEMS}
          baseColor="#120F17"
          menuColor="#ffffff"
          buttonBgColor="#5227ff"
          buttonTextColor="#ffffff"
        />
      </div>
    ),

  // --- card-swap ---
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

  // --- stack ---
  'stack': () =>
    demoWrap(
      <div className="w-full max-w-sm h-[350px]">
        <Stack
          randomRotation
          sendToBackOnClick
          pauseOnHover
          cards={[
            <div key="1" className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">卡片 1</div>,
            <div key="2" className="w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">卡片 2</div>,
            <div key="3" className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">卡片 3</div>,
          ]}
        />
      </div>
    ),

  // --- fluid-glass ---
  'fluid-glass': () =>
    fullWrap(
      <div className="w-full max-w-3xl h-[400px] rounded-xl border border-white/10 overflow-hidden">
        <FluidGlass mode="lens" />
      </div>
    ),

  // --- pill-nav ---
  'pill-nav': () =>
    demoWrap(
      <div className="relative w-full max-w-3xl h-[120px]">
        <PillNav
          logo={P('logop', 40, 40)}
          logoAlt="Logo"
          items={MENU_ITEMS}
          baseColor="#120F17"
          pillColor="#ffffff"
          hoveredPillTextColor="#120F17"
        />
      </div>
    ),

  // --- tilted-card ---
  'tilted-card': () =>
    demoWrap(
      <TiltedCard
        imageSrc={P('tilt', 400, 400)}
        altText="倾斜卡片示例"
        captionText="悬停查看3D倾斜效果"
        containerHeight="300px"
        imageWidth="300px"
        imageHeight="300px"
      />
    ),

  // --- masonry ---
  'masonry': () =>
    demoWrap(
      <div className="w-full max-w-3xl">
        <Masonry items={MASONRY_ITEMS} columns={3} gap={12} />
      </div>
    ),

  // --- glass-surface ---
  'glass-surface': () =>
    demoWrap(
      <GlassSurface className="w-80 h-60 flex items-center justify-center text-white text-lg font-semibold">
        毛玻璃表面效果
      </GlassSurface>
    ),

  // --- glass-icons ---
  'glass-icons': () =>
    demoWrap(
      <div className="flex gap-6">
        <GlassIcons items={[
          { icon: '🏠', label: '首页' },
          { icon: '📁', label: '文件' },
          { icon: '⚙️', label: '设置' },
          { icon: '💡', label: '灵感' },
          { icon: '👤', label: '用户' },
        ]} />
      </div>
    ),

  // --- dome-gallery ---
  'dome-gallery': () =>
    fullWrap(
      <div className="h-[400px] w-full max-w-3xl rounded-xl border border-white/10 overflow-hidden">
        <DomeGallery
          images={[P('dg1', 600, 400), P('dg2', 600, 400), P('dg3', 600, 400), P('dg4', 600, 400)]}
        />
      </div>
    ),

  // --- chroma-grid ---
  'chroma-grid': () =>
    fullWrap(
      <div className="h-[400px] w-full max-w-4xl">
        <ChromaGrid />
      </div>
    ),

  // --- folder ---
  'folder': () =>
    demoWrap(
      <Folder color="#6366f1" size={1.5} />
    ),

  // --- staggered-menu ---
  'staggered-menu': () =>
    fullWrap(
      <div className="relative w-full max-w-3xl h-[400px] rounded-xl border border-white/10 bg-black/20 overflow-hidden">
        <StaggeredMenu
          isFixed={false}
          position="right"
          items={[
            { label: '首页', ariaLabel: '首页', link: '#' },
            { label: '作品', ariaLabel: '作品集', link: '#' },
            { label: '关于', ariaLabel: '关于我们', link: '#' },
            { label: '联系', ariaLabel: '联系我们', link: '#' },
          ]}
          displaySocials={false}
        />
      </div>
    ),

  // --- model-viewer ---
  'model-viewer': () =>
    demoWrap(
      <span className="text-base text-white/40">模型查看器需要 .glb/.obj 3D 模型文件</span>
    ),

  // --- lanyard ---
  'lanyard': () =>
    fullWrap(
      <div className="w-full max-w-lg h-[350px] rounded-xl border border-white/10 bg-black/30 overflow-hidden">
        <Lanyard
          position={[0, 0, 30]}
          gravity={[0, -40, 0]}
          fov={20}
          frontImage={P('lany1', 300, 400)}
          backImage={P('lany2', 300, 400)}
        />
      </div>
    ),

  // --- profile-card ---
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

  // --- dock ---
  'dock': () =>
    demoWrap(
      <div className="w-full max-w-xl h-[120px]">
        <Dock
          items={[
            { icon: <span className="text-2xl">🏠</span>, label: '首页', onClick: () => {} },
            { icon: <span className="text-2xl">🔍</span>, label: '搜索', onClick: () => {} },
            { icon: <span className="text-2xl">⭐</span>, label: '收藏', onClick: () => {} },
            { icon: <span className="text-2xl">⚙️</span>, label: '设置', onClick: () => {} },
            { icon: <span className="text-2xl">👤</span>, label: '用户', onClick: () => {} },
          ]}
        />
      </div>
    ),

  // --- gooey-nav ---
  'gooey-nav': () =>
    demoWrap(
      <div className="w-full max-w-lg h-[100px]">
        <GooeyNav
          items={[
            { label: '首页', href: '#' },
            { label: '作品', href: '#' },
            { label: '关于', href: '#' },
            { label: '联系', href: '#' },
          ]}
        />
      </div>
    ),

  // --- pixel-card ---
  'pixel-card': () =>
    demoWrap(
      <PixelCard variant="default" className="w-64 h-40 flex items-center justify-center text-white text-lg font-bold">
        像素卡片
      </PixelCard>
    ),

  // --- carousel ---
  'carousel': () =>
    demoWrap(
      <div className="w-full max-w-3xl">
        <Carousel items={CAROUSEL_ITEMS} />
      </div>
    ),

  // --- spotlight-card ---
  'spotlight-card': () =>
    demoWrap(
      <SpotlightCard className="w-72 p-6">
        <h3 className="text-lg font-bold text-white mb-2">聚光卡片</h3>
        <p className="text-sm text-white/60">鼠标移动查看聚光灯效果</p>
      </SpotlightCard>
    ),

  // --- border-glow ---
  'border-glow': () =>
    demoWrap(
      <BorderGlow
        start={0}
        end={100}
        duration={2000}
        onUpdate={(v) => {}}
        onEnd={() => {}}
      >
        <div className="w-64 h-32 rounded-xl flex items-center justify-center text-white font-bold">
          边框辉光
        </div>
      </BorderGlow>
    ),

  // --- flying-posters ---
  'flying-posters': () =>
    fullWrap(
      <div className="w-full max-w-lg h-[350px] rounded-xl border border-white/10 overflow-hidden">
        <FlyingPosters
          items={[P('fp1', 400, 500), P('fp2', 400, 500), P('fp3', 400, 500)]}
        />
      </div>
    ),

  // --- bounce-cards ---
  'bounce-cards': () =>
    demoWrap(
      <div className="flex justify-center">
        <BounceCards
          images={IMAGES5}
          enableHover
          containerWidth={500}
          containerHeight={400}
        />
      </div>
    ),

  // --- decay-card ---
  'decay-card': () =>
    demoWrap(
      <DecayCard
        image={P('dc', 300, 400)}
        width={300}
        height={400}
      >
        衰减效果
      </DecayCard>
    ),

  // --- elastic-slider ---
  'elastic-slider': () =>
    demoWrap(
      <ElasticSlider defaultValue={50} startingValue={0} maxValue={100} isStepped stepSize={5} />
    ),

  // --- counter ---
  'counter': () =>
    demoWrap(
      <Counter value={12345} />
    ),

  // --- stepper ---
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

  // --- flowing-menu ---
  'flowing-menu': () =>
    fullWrap(
      <div className="w-full max-w-3xl h-[350px] rounded-xl border border-white/10 overflow-hidden">
        <FlowingMenu items={FLOWING_ITEMS} speed={12} />
      </div>
    ),

  // --- infinite-menu ---
  'infinite-menu': () =>
    fullWrap(
      <div className="w-full max-w-3xl h-[350px] rounded-xl border border-white/10 bg-black/30 overflow-hidden">
        <InfiniteMenu
          items={[
            { image: P('im1', 300, 400), link: '#', title: '项目一', description: 'Web 应用' },
            { image: P('im2', 300, 400), link: '#', title: '项目二', description: '移动端 App' },
            { image: P('im3', 300, 400), link: '#', title: '项目三', description: '品牌设计' },
            { image: P('im4', 300, 400), link: '#', title: '项目四', description: '3D 可视化' },
          ]}
        />
      </div>
    ),
};
