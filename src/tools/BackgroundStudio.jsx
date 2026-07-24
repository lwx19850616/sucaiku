import { useRef, useEffect, useState, useCallback } from 'react';
import { RENDERERS, BG_LIST, PARAM_DEFS } from './bgRenderers';

const DEFAULT_PARAMS = { speed: 1.0, scale: 1.0, color: '#0ea5e9', noise: 1.0, rotation: 0 };

export default function BackgroundStudio() {
  const canvasRef = useRef(null);
  const [bg, setBg] = useState('silk');
  const [params, setParams] = useState({ ...DEFAULT_PARAMS });
  const [paused, setPaused] = useState(false);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const renderer = RENDERERS[bg];

  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const dt = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    if (!paused) timeRef.current += dt;
    renderer.render(ctx, rect.width, rect.height, timeRef.current, params);
    rafRef.current = requestAnimationFrame(draw);
  }, [renderer, params, paused]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const setParam = (key, value) => setParams((p) => ({ ...p, [key]: value }));
  const reset = () => setParams({ ...DEFAULT_PARAMS });

  const exportImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `bg-${bg}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const share = () => {
    const url = `${window.location.origin}${window.location.pathname}#/tools/background-studio?bg=${bg}&speed=${params.speed}&scale=${params.scale}&color=${encodeURIComponent(params.color)}&noise=${params.noise}&rotation=${params.rotation}`;
    navigator.clipboard?.writeText(url).then(() => alert('链接已复制到剪贴板'));
  };

  return (
    <div className="flex h-full">
      {/* 左侧：背景选择 */}
      <div className="w-48 shrink-0 overflow-y-auto border-r border-white/10 bg-black/20 py-4">
        <div className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-white/40">背景</div>
        <div className="space-y-0.5 px-2">
          {BG_LIST.map((item) => (
            <button
              key={item.key}
              onClick={() => setBg(item.key)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                bg === item.key
                  ? 'bg-cyan-400/20 text-cyan-300'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-[10px] text-white/40">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 中间：画布预览 */}
      <div className="flex flex-1 flex-col">
        <div className="relative flex-1 overflow-hidden bg-black">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>

        {/* 底部：操作栏 */}
        <div className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-3">
          <button onClick={() => setPaused(!paused)} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20">
            {paused ? '▶ 播放' : '⏸ 暂停'}
          </button>
          <button onClick={reset} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20">↺ 重置</button>
          <button onClick={share} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20">🔗 分享</button>
          <div className="mx-2 h-6 w-px bg-white/20" />
          <button onClick={exportImage} className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-black hover:bg-cyan-400">📷 导出图片</button>
        </div>
      </div>

      {/* 右侧：参数控制 */}
      <div className="w-56 shrink-0 border-l border-white/10 bg-black/20 py-4">
        <div className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-white/40">参数</div>
        <div className="space-y-4 px-3">
          {PARAM_DEFS.map((def) => (
            <div key={def.key}>
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-white/80">{def.label}</span>
                <span className="text-xs text-white/50">{def.type === 'color' ? params[def.key] : params[def.key].toFixed(1)}</span>
              </div>
              {def.type === 'color' ? (
                <input type="color" value={params[def.key]} onChange={(e) => setParam(def.key, e.target.value)} className="h-8 w-full cursor-pointer rounded bg-transparent" />
              ) : (
                <input
                  type="range"
                  min={def.min}
                  max={def.max}
                  step={def.step}
                  value={params[def.key]}
                  onChange={(e) => setParam(def.key, parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
