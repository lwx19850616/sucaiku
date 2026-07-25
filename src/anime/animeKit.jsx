import { useEffect, useRef } from 'react';
import { animate, onScroll } from 'animejs';

// 在每个 demo 容器内运行 anime.js，卸载时执行返回的自清理函数
export function useAnimeDemo(setup) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    let cleanup;
    try {
      cleanup = setup(ref.current);
    } catch (e) {
      console.error('[anime demo]', e);
    }
    return () => {
      try {
        cleanup && cleanup();
      } catch (e) {
        /* noop */
      }
    };
  }, []);
  return ref;
}

export function DemoCard({ title, desc, height = 340, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="rounded bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-300">anime.js</span>
      </div>
      {desc && <p className="mb-3 text-xs leading-relaxed text-white/45">{desc}</p>}
      <div
        className="relative overflow-hidden rounded-xl border border-white/5 bg-black/30"
        style={{ height }}
      >
        {children}
      </div>
    </div>
  );
}

// 顶部滚动进度条：用 onScroll 把页面滚动进度映射到宽度（motion 不擅长滚动联动）
export function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    if (!bar.current) return;
    const a = animate(bar.current, {
      width: ['0%', '100%'],
      ease: 'linear',
      autoplay: onScroll({
        target: document.documentElement,
        enter: 'top top',
        leave: 'bottom bottom',
        sync: true,
      }),
    });
    return () => {
      try {
        a.revert();
      } catch (e) {
        /* noop */
      }
    };
  }, []);
  return (
    <div
      ref={bar}
      className="fixed left-64 right-0 top-14 z-40 h-[3px] bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500"
      style={{ width: '0%' }}
    />
  );
}
