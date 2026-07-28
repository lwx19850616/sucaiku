import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useSmoothScroll — 丝滑滚动 Hook
 * 适配 Vite + React 18 (无需 Next.js)
 * 源自 nareshkhatri.dev 的 smooth-scroll.tsx
 *
 * 用法:
 *   // 在 App.jsx 顶层调用一次
 *   useSmoothScroll({ duration: 1.4 });
 *
 * @param {Object} options
 * @param {number} options.duration - 滚动动画时长（秒），越大越"丝滑",推荐 1.2-1.8
 * @param {string} options.easing - 缓动函数,默认 'easeOutQuart'
 * @param {boolean} options.smoothWheel - 是否平滑滚轮,默认 true
 */
let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export default function useSmoothScroll(options = {}) {
  const {
    duration = 1.4,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel = true,
  } = options;

  useEffect(() => {
    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenisInstance = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [duration, easing, smoothWheel]);
}

/**
 * scrollToTarget — 丝滑滚动到任意元素
 * 用法: scrollToTarget('#projects'); scrollToTarget('.hero');
 */
export function scrollToTarget(target, options = {}) {
  if (!lenisInstance) {
    // fallback:原生滚动
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  lenisInstance.scrollTo(target, {
    duration: 1.4,
    ...options,
  });
}
