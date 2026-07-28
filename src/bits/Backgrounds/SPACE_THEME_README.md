# 太空主题背景 + 丝滑滚动移植说明

> 源自 [nareshkhatri.dev](https://nareshkhatri.dev) 的视觉风格，适配 Vite + React 18 + Tailwind。

## 📦 已新增文件

| 文件 | 作用 |
|------|------|
| `src/bits/Backgrounds/SpaceStars.jsx` | Canvas 粒子星空背景（鼠标交互 + 边缘渐隐） |
| `src/bits/Backgrounds/useSmoothScroll.js` | Lenis 丝滑滚动 Hook + scrollToTarget 工具 |
| `src/bits/Backgrounds/SpaceShowcase.jsx` | 完整 Demo 页面（Hero + 4 个段落 + 顶部导航） |

## 🚀 30 秒接入

```jsx
// 在你的 App.jsx 或 Layout.jsx 顶层
import useSmoothScroll from '@/bits/Backgrounds/useSmoothScroll';
import SpaceStars from '@/bits/Backgrounds/SpaceStars';

export default function App() {
  useSmoothScroll({ duration: 1.4 });  // 数字越大越"丝滑"
  return (
    <>
      <SpaceStars quantity={250} />
      <YourContent />
    </>
  );
}
```

## 🎨 关键效果对照原网站

| 效果 | 原网站（nareshkhatri.dev） | sucaiku 中实现 |
|------|---------------------------|-----------------|
| 粒子星空背景 | `Particles.tsx` | `SpaceStars.jsx` |
| 丝滑滚动 | Lenis + GSAP ticker | `useSmoothScroll.js` |
| 暗色渐变背景 | `dark:bg-gradient-to-tl from-black via-zinc-600/20 to-black` | `radial-gradient(ellipse at top, #1a1a3e 0%, #0a0a1a 50%, #000000 100%)` |
| 滚动入场动画 | GSAP ScrollTrigger | Framer Motion `whileInView` |
| 字体 | Space Grotesk + Unbounded | 同名（看你 UI 是否引入） |

## 🔧 参数调优

### SpaceStars（粒子星空）

```jsx
<SpaceStars
  quantity={250}        // 粒子数量（100-500），越多越"满"
  staticity={50}        // 鼠标吸引力（10-100），越小越"散"
  ease={50}              // 跟随平滑度（20-100），越大越"紧"
  maxDpr={2}             // DPR 上限（防止高DPR设备卡顿）
/>
```

### useSmoothScroll（丝滑滚动）

```jsx
useSmoothScroll({
  duration: 1.4,         // 1.0 灵敏 / 1.4 推荐 / 2.0 极致丝滑
  smoothWheel: true,     // 滚轮平滑
  touchMultiplier: 1.2,  // 触屏滚动倍率
});
```

### scrollToTarget（编程式滚动）

```jsx
import { scrollToTarget } from '@/bits/Backgrounds/useSmoothScroll';

<button onClick={() => scrollToTarget('#projects')}>
  跳到项目
</button>

// 滚到任意元素
scrollToTarget(document.querySelector('.hero'));
scrollToTarget(0, { duration: 2 });  // 滚到顶部
```

## 🎯 与原网站的关键差异

| 项 | 原网站 | sucaiku 实现 | 原因 |
|----|-------|-------------|------|
| 3D 键盘场景 | Spline（外部 .spline 文件） | **未包含** | 移植一个 100k+ 顶点的 Spline 场景需要 .spline 资产文件，且与你现有作品集项目无关联 |
| Framer Motion | 原站用 GSAP ScrollTrigger | **用 Framer Motion** | 你已有 framer-motion,语法更现代 |
| 框架 | Next.js 16 (App Router) | **Vite + React 18** | 保持与 sucaiku 一致 |
| 鼠标交互 | 全局 mouse 上下文 | **直接监听 mousemove** | Vite 项目无 Next.js Provider 限制 |

## 🎁 额外彩蛋

原网站 `Particles` 用了 `useMousePosition` Hook（同一份代码在多个组件复用鼠标位置）。
如果你的页面里需要多处共享鼠标位置，可以从 `src/utils/mouse.ts` 拷贝该 Hook 过来。

## 📝 接入 Demo 页面

在 `src/pages/` 加一个路由：

```jsx
// src/pages/SpaceDemo.jsx
import SpaceShowcase from '@/bits/Backgrounds/SpaceShowcase';
import useSmoothScroll from '@/bits/Backgrounds/useSmoothScroll';

export default function SpaceDemo() {
  useSmoothScroll({ duration: 1.4 });
  return <SpaceShowcase />;
}
```

然后在 `App.jsx`（react-router-dom）注册：

```jsx
<Route path="/space-demo" element={<SpaceDemo />} />
```

打开 `http://localhost:5173/sucaiku/space-demo` 即可看到完整效果。
