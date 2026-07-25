import { animate, createTimeline, stagger, utils, createAnimatable } from 'animejs';
import { useAnimeDemo, DemoCard, ScrollProgress } from '../anime/animeKit';

// 错落网格：从中心向外依次放大再收回，循环
function StaggerGrid() {
  const ref = useAnimeDemo((root) => {
    const rows = 9;
    const total = rows * rows;
    root.style.display = 'grid';
    root.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
    root.style.gap = '6px';
    root.style.placeContent = 'center';
    root.style.padding = '20px';
    const dots = [];
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.style.cssText = 'width:100%;aspect-ratio:1;border-radius:9999px;background:#22d3ee;opacity:.25';
      root.appendChild(d);
      dots.push(d);
    }
    const tl = createTimeline({ loop: true, defaults: { ease: 'inOutSine' } })
      .add(
        dots,
        { scale: [0, 1], opacity: [0.25, 1], duration: 700, delay: stagger(35, { grid: [rows, rows], from: 'center' }) },
        0
      )
      .add(
        dots,
        { scale: [1, 0], opacity: [1, 0.25], duration: 700, delay: stagger(35, { grid: [rows, rows], from: 'center' }) },
        1100
      )
      .init();
    return () => tl.revert();
  });
  return (
    <DemoCard
      title="错落网格 · Stagger"
      desc="用 stagger(grid) 让格子从中心向外依次放大再收回，循环播放。"
      height={360}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 网格涟漪：每次随机选一个中心，向四周扩散波纹
function GridRipple() {
  const ref = useAnimeDemo((root) => {
    const rows = 12;
    const total = rows * rows;
    root.style.display = 'grid';
    root.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
    root.style.gap = '3px';
    root.style.padding = '16px';
    const dots = [];
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.style.cssText = 'width:100%;aspect-ratio:1;border-radius:9999px;background:#a78bfa;opacity:.3';
      root.appendChild(d);
      dots.push(d);
    }
    let index = Math.floor(utils.random(0, total));
    let cancelled = false;
    let tl;
    function run() {
      if (cancelled) return;
      const next = Math.floor(utils.random(0, total));
      tl = createTimeline({ defaults: { ease: 'inOutQuad' }, onComplete: run });
      tl.add(
        dots,
        {
          keyframes: [{ scale: 0.6, duration: 180 }, { scale: 2.2, duration: 420 }, { scale: 1, duration: 560 }],
          delay: stagger(28, { grid: [rows, rows], from: index }),
        },
        0
      );
      index = next;
    }
    run();
    return () => {
      cancelled = true;
      try {
        tl && tl.revert();
      } catch (e) {
        /* noop */
      }
    };
  });
  return (
    <DemoCard
      title="网格涟漪 · Grid Ripple"
      desc="每次随机挑一个中心，错落延迟向四周扩散波纹，无限循环。"
      height={360}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 光标跟随：整片粒子带弹性地追随指针
function FollowCursor() {
  const ref = useAnimeDemo((root) => {
    const size = 14;
    const total = size * size;
    root.style.display = 'grid';
    root.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    root.style.gap = '2px';
    root.style.padding = '14px';
    const parts = [];
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.style.cssText = 'width:100%;aspect-ratio:1;border-radius:3px;background:#34d399';
      root.appendChild(d);
      parts.push(d);
    }
    const anim = createAnimatable(parts, {
      x: { duration: stagger(40, { ease: 'in(1)', from: 'center', grid: [size, size] }) },
      y: { duration: stagger(40, { ease: 'in(1)', from: 'center', grid: [size, size] }) },
      rotate: { unit: 'rad', duration: 0 },
      ease: 'outElastic(.3, 1.4)',
    });
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      const cx = e.clientX - r.left - r.width / 2;
      const cy = e.clientY - r.top - r.height / 2;
      anim.x(cx);
      anim.y(cy);
      anim.rotate(-Math.atan2(r.width / 2 - (e.clientX - r.left), r.height / 2 - (e.clientY - r.top)));
    };
    root.addEventListener('pointermove', onMove);
    return () => {
      root.removeEventListener('pointermove', onMove);
      try {
        anim.revert && anim.revert();
      } catch (e) {
        /* noop */
      }
    };
  });
  return (
    <DemoCard
      title="光标跟随 · Follow Cursor"
      desc="用 createAnimatable 注册 x/y/rotate，指针移动时整片粒子带弹性地追随光标。"
      height={340}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 萤火粒子：持续随机飞散，点击中心有反馈
function Fireflies() {
  const ref = useAnimeDemo((root) => {
    root.style.position = 'relative';
    root.style.overflow = 'hidden';
    const ring = document.createElement('div');
    ring.style.cssText =
      'position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:9999px;background:radial-gradient(circle,#f472b6,#db2777);box-shadow:0 0 30px #db2777';
    root.appendChild(ring);
    const count = 60;
    const parts = [];
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.style.cssText =
        'position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:9999px;background:#f9a8d4';
      root.appendChild(d);
      parts.push(d);
    }
    const hw = root.clientWidth / 2;
    const hh = root.clientHeight / 2;
    let cancelled = false;
    const fly = (el) => {
      if (cancelled) return;
      const a = Math.random() * Math.PI * 2;
      const r = utils.random(20, Math.min(hw, hh) * 0.9, 2);
      animate(el, {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        scale: utils.random(0.4, 1.4, 2),
        opacity: utils.random(0.3, 1, 2),
        duration: utils.random(1200, 2400),
        ease: `inOut(${utils.random(1, 4)})`,
        onComplete: () => fly(el),
      });
    };
    parts.forEach(fly);
    const onDown = () => animate(ring, { scale: 0.5, opacity: 1 });
    const onUp = () => animate(ring, { scale: 1, opacity: 0.6 });
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);
    return () => {
      cancelled = true;
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
    };
  });
  return (
    <DemoCard
      title="萤火粒子 · Fireflies"
      desc="粒子持续向外随机飞散，点击中心环会有缩放与透明度反馈。"
      height={320}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

export default function Anime1() {
  return (
    <div className="px-8 py-10">
      <ScrollProgress />
      <header className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300/70">anime.js · 演示专区 ①</div>
        <h1 className="mt-1 text-3xl font-black text-white">中文1 · CSS / DOM 动画</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          这一组复刻自 anime.js 官方 examples 的 CSS / DOM 类案例：错落、涟漪、光标跟随与粒子。全部用 anime.js
          驱动，与站点现有动画互不干扰。
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StaggerGrid />
        <GridRipple />
        <FollowCursor />
        <Fireflies />
      </div>
    </div>
  );
}
