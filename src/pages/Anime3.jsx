import { animate, createTimeline, stagger, utils, scrambleText, splitText, easings } from 'animejs';
import { useAnimeDemo, DemoCard, ScrollProgress } from '../anime/animeKit';

// 文字打乱：hover 时乱码重组
function Scramble() {
  const ref = useAnimeDemo((root) => {
    root.style.display = 'flex';
    root.style.alignItems = 'center';
    root.style.justifyContent = 'center';
    const el = document.createElement('div');
    el.style.cssText =
      'font-size:30px;font-weight:700;letter-spacing:.04em;color:#f8fafc;cursor:pointer;text-align:center;padding:0 16px';
    el.dataset.text = 'anime.js 文字打乱特效';
    el.textContent = el.dataset.text;
    root.appendChild(el);
    const replay = () =>
      animate(el, {
        innerHTML: scrambleText({
          text: el.dataset.text,
          duration: 850,
          settleDuration: 250,
          perturbation: 0.2,
          cursor: '░▒▓█',
        }),
      });
    animate(el, { innerHTML: scrambleText({ text: el.dataset.text, duration: 1100 }) });
    el.addEventListener('pointerenter', replay);
    return () => el.removeEventListener('pointerenter', replay);
  });
  return (
    <DemoCard
      title="文字打乱 · Scramble Text"
      desc="hover 时文字像被解码一样乱码重组——scrambleText 是 anime.js 特有，motion 没有。"
      height={200}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 文字拆分：拆成行/词后循环起伏
function SplitTextEffects() {
  const ref = useAnimeDemo((root) => {
    root.style.display = 'flex';
    root.style.alignItems = 'center';
    root.style.justifyContent = 'center';
    root.style.padding = '24px';
    const p = document.createElement('p');
    p.style.cssText =
      'max-width:520px;font-size:22px;line-height:1.6;color:#e2e8f0;text-align:center';
    p.textContent = 'anime.js 能把段落自动拆成行与词，再逐行逐词编排动画。';
    root.appendChild(p);
    const split = splitText(p, { lines: true });
    split.addEffect((sp) =>
      createTimeline({
        defaults: { alternate: true, loop: true, loopDelay: 75, duration: 1500, ease: 'inOutQuad' },
      })
        .add(split.lines, { color: { from: '#22d3ee' }, y: -10, scale: 1.1 }, stagger(100, { start: 0 }))
        .add(split.words, { scale: [0.98, 1.04] }, stagger(100, { use: 'data-line', start: 0 }))
        .init()
    );
    return () => split.revert();
  });
  return (
    <DemoCard
      title="文字拆分 · Split Text"
      desc="splitText 把段落拆成行 / 词，配合 timeline 做循环起伏——也是 anime.js 的招牌能力。"
      height={220}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 打字机：不规则按键节奏
function Typewriter() {
  const ref = useAnimeDemo((root) => {
    root.style.display = 'flex';
    root.style.alignItems = 'center';
    root.style.justifyContent = 'center';
    root.style.gap = '4px';
    root.style.fontSize = '28px';
    root.style.fontWeight = '700';
    root.style.color = '#f8fafc';
    const text = 'anime.js 打字机效果';
    const chars = [];
    for (const ch of text) {
      const s = document.createElement('span');
      s.style.cssText = 'opacity:0';
      s.textContent = ch;
      root.appendChild(s);
      chars.push(s);
    }
    const cursor = document.createElement('span');
    cursor.style.cssText = 'width:3px;height:1.1em;background:#22d3ee;display:inline-block';
    root.appendChild(cursor);
    const steps = chars.length - 1;
    const interval = 125;
    const tl = createTimeline({ playbackEase: easings.irregular(steps, 2) })
      .set(chars, { opacity: [0, 1] }, stagger(interval))
      .add(cursor, { left: '100%', duration: steps * interval, ease: easings.steps(steps) }, 0)
      .init();
    const blink = animate(cursor, { opacity: 0, duration: 750, loop: true, alternate: true });
    return () => {
      try {
        tl.revert();
      } catch (e) {
        /* noop */
      }
      try {
        blink.revert();
      } catch (e) {
        /* noop */
      }
    };
  });
  return (
    <DemoCard
      title="打字机 · Typewriter"
      desc="用 easings.irregular + steps 模拟不规则按键节奏，光标随字符推进。"
      height={160}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 时间轴编排：多根柱子精确串起来循环
function TimelineChoreo() {
  const ref = useAnimeDemo((root) => {
    root.style.display = 'flex';
    root.style.alignItems = 'center';
    root.style.justifyContent = 'center';
    root.style.gap = '10px';
    const bars = [];
    const n = 7;
    for (let i = 0; i < n; i++) {
      const b = document.createElement('div');
      b.style.cssText =
        'width:22px;height:120px;border-radius:8px;background:linear-gradient(#22d3ee,#3b82f6);transform-origin:bottom';
      root.appendChild(b);
      bars.push(b);
    }
    const tl = createTimeline({ loop: true, defaults: { ease: 'inOutSine' } })
      .add(bars, { scaleY: [0.15, 1], duration: 600, delay: stagger(80, { from: 'center' }) }, 0)
      .add(bars, { scaleY: [1, 0.15], duration: 600, delay: stagger(80, { from: 'center' }) }, 900)
      .init();
    return () => tl.revert();
  });
  return (
    <DemoCard
      title="时间轴编排 · Timeline"
      desc="createTimeline 把多根柱子的伸缩按时间轴精确串起来循环——复杂时序编排是 anime.js 强项。"
      height={240}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

export default function Anime3() {
  return (
    <div className="px-8 py-10">
      <ScrollProgress />
      <header className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300/70">anime.js · 演示专区 ③</div>
        <h1 className="mt-1 text-3xl font-black text-white">中文3 · 文字 / 时间轴 / 滚动</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          这一组覆盖 anime.js 在文字（打乱 / 拆分 / 打字机）、时间轴编排上的能力，以及用 onScroll
          做的滚动联动——都是 motion 不擅长的地方。
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Scramble />
        <SplitTextEffects />
        <Typewriter />
        <TimelineChoreo />
      </div>
    </div>
  );
}
