import { createTimeline, stagger, utils, svg } from 'animejs';
import { useId } from 'react';
import { useAnimeDemo, DemoCard, ScrollProgress } from '../anime/animeKit';

const NS = 'http://www.w3.org/2000/svg';

// SVG 线条 + 同心圆 描边绘制
function SvgLineDrawing() {
  const uid = useId().replace(/:/g, '');
  const ref = useAnimeDemo((root) => {
    const W = 600;
    const H = 380;
    const m = 40;
    const svgEl = document.createElementNS(NS, 'svg');
    svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svgEl.style.width = '100%';
    svgEl.style.height = '100%';

    const g1 = document.createElementNS(NS, 'g');
    g1.setAttribute('fill', 'none');
    const nLines = 26;
    const sp = (W - m * 2) / (nLines - 1);
    for (let i = 0; i < nLines; i++) {
      const x = m + i * sp;
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', x);
      l.setAttribute('y1', m);
      l.setAttribute('x2', x);
      l.setAttribute('y2', H - m);
      l.setAttribute('stroke', '#22d3ee');
      l.setAttribute('stroke-width', '3');
      l.setAttribute('class', `ln-${uid}`);
      g1.appendChild(l);
    }

    const g2 = document.createElementNS(NS, 'g');
    g2.setAttribute('fill', 'none');
    const nC = 12;
    const step = (Math.min(W, H) / 2 - m) / nC;
    const cx = W / 2;
    const cy = H / 2;
    for (let i = 0; i < nC; i++) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('r', (i + 1) * step);
      c.setAttribute('stroke', '#22d3ee');
      c.setAttribute('stroke-width', '3');
      c.setAttribute('class', `ci-${uid}`);
      g2.appendChild(c);
    }

    svgEl.appendChild(g1);
    svgEl.appendChild(g2);
    root.appendChild(svgEl);

    const lines = svg.createDrawable(root.querySelectorAll(`.ln-${uid}`));
    const circles = svg.createDrawable(root.querySelectorAll(`.ci-${uid}`));

    const tl = createTimeline({ loop: true, defaults: { ease: 'inOut(4)', duration: 7000 } })
      .add(
        lines,
        {
          draw: [
            '.5 .5',
            () => {
              const l = utils.random(0.05, 0.45, 2);
              return `${0.5 - l} ${0.5 + l}`;
            },
            '0.5 0.5',
          ],
          stroke: '#f43f5e',
        },
        stagger([0, 6000], { from: 'first' })
      )
      .add(
        circles,
        {
          draw: [
            () => {
              const v = utils.random(-1, -0.5, 2);
              return `${v} ${v}`;
            },
            () => `${utils.random(0, 0.25, 2)} ${utils.random(0.5, 0.75, 2)}`,
            () => {
              const v = utils.random(1, 1.5, 2);
              return `${v} ${v}`;
            },
          ],
          stroke: '#f43f5e',
        },
        stagger([0, 6000], { start: 0 })
      )
      .init();
    return () => tl.revert();
  });
  return (
    <DemoCard
      title="SVG 描边绘制 · Line Drawing"
      desc="svg.createDrawable + draw 让线条与同心圆逐根描绘出来——这是 motion 很难做到的 SVG 路径动画。"
      height={400}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 单条贝塞尔曲线描边
function SvgPathDraw() {
  const uid = useId().replace(/:/g, '');
  const ref = useAnimeDemo((root) => {
    const W = 600;
    const H = 320;
    const svgEl = document.createElementNS(NS, 'svg');
    svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svgEl.style.width = '100%';
    svgEl.style.height = '100%';
    const path = document.createElementNS(NS, 'path');
    path.setAttribute(
      'd',
      'M40 260 C 120 60, 200 60, 260 160 S 420 300, 480 120 S 560 60, 560 90'
    );
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#a78bfa');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('class', `pth-${uid}`);
    svgEl.appendChild(path);
    root.appendChild(svgEl);

    const draw = svg.createDrawable(root.querySelectorAll(`.pth-${uid}`));
    const tl = createTimeline({ loop: true, defaults: { ease: 'inOut(3)', duration: 4000 } })
      .add(draw, { draw: ['0 0', '0.5 0.5', '1 1'], stroke: '#22d3ee' }, 0)
      .init();
    return () => tl.revert();
  });
  return (
    <DemoCard
      title="SVG 路径描边 · Path Draw"
      desc="对一条贝塞尔曲线做 draw 动画，像被实时画出来一样。"
      height={340}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

// 数值递增（innerHTML + modifier）
function SvgCounter() {
  const ref = useAnimeDemo((root) => {
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.alignItems = 'center';
    root.style.justifyContent = 'center';
    root.style.gap = '14px';
    const num = document.createElement('div');
    num.style.cssText =
      'font-size:64px;font-weight:800;color:#34d399;font-variant-numeric:tabular-nums';
    num.textContent = '0';
    root.appendChild(num);
    const label = document.createElement('div');
    label.style.cssText = 'font-size:13px;color:rgba(255,255,255,.5)';
    label.textContent = 'anime.js 数值递增（innerHTML + modifier）';
    root.appendChild(label);

    const tl = createTimeline({ loop: true, defaults: { ease: 'out(3)' } })
      .add(
        num,
        { innerHTML: [0, 98421], modifier: (v) => utils.round(v, 0).toLocaleString(), duration: 2500 },
        0
      )
      .add(
        num,
        { innerHTML: [98421, 0], modifier: (v) => utils.round(v, 0).toLocaleString(), duration: 1500 },
        '+=400'
      )
      .init();
    return () => tl.revert();
  });
  return (
    <DemoCard
      title="数值递增 · Counter"
      desc="用 innerHTML + modifier 把数字平滑地滚到目标值，适合统计 / 计数场景。"
      height={300}
    >
      <div ref={ref} className="h-full w-full" />
    </DemoCard>
  );
}

export default function Anime2() {
  return (
    <div className="px-8 py-10">
      <ScrollProgress />
      <header className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300/70">anime.js · 演示专区 ②</div>
        <h1 className="mt-1 text-3xl font-black text-white">中文2 · SVG 动画</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          这一组是 anime.js 的强项、也是 motion 的弱项：SVG 路径 / 线条描边绘制，以及把数字当动画目标平滑递增。
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SvgLineDrawing />
        <SvgPathDraw />
        <SvgCounter />
      </div>
    </div>
  );
}
