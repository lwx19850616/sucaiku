import { useState, useMemo, useRef, useCallback } from 'react';
import { BG_CONFIG, PARAM_DEFS, DEFAULT_PARAMS } from './bgConfig';
import ErrorBoundary from '../components/ErrorBoundary';

export default function BackgroundStudio() {
  const [bgKey, setBgKey] = useState('plasma');
  const [params, setParams] = useState({ ...DEFAULT_PARAMS });
  const [paused, setPaused] = useState(false);
  const captureRef = useRef(null);

  const config = useMemo(() => BG_CONFIG.find((b) => b.key === bgKey), [bgKey]);
  const BgComp = config?.comp;

  // 把通用参数映射到组件 props
  const compProps = useMemo(() => {
    if (!config) return {};
    const props = {};
    for (const [generic, propName] of Object.entries(config.map)) {
      if (propName) props[propName] = params[generic];
    }
    return props;
  }, [config, params]);

  const setParam = (key, value) => setParams((p) => ({ ...p, [key]: value }));
  const reset = () => setParams({ ...DEFAULT_PARAMS });

  const exportImage = useCallback(() => {
    const container = captureRef.current;
    if (!container) return;
    const canvas = container.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `bg-${bgKey}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      alert('该背景暂不支持导出（非 Canvas 渲染）');
    }
  }, [bgKey]);

  const share = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}#/tools/background-studio?bg=${bgKey}&speed=${params.speed}&scale=${params.scale}&color=${encodeURIComponent(params.color)}&noise=${params.noise}&rotation=${params.rotation}`;
    navigator.clipboard?.writeText(url).then(() => alert('链接已复制到剪贴板'));
  }, [bgKey, params]);

  // 检查哪些参数对该背景可用
  const isParamActive = (generic) => config?.map[generic] != null;

  return (
    <div className="flex h-full">
      {/* 左侧：背景选择 */}
      <div className="w-44 shrink-0 overflow-y-auto border-r border-white/10 bg-black/20 py-4">
        <div className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-white/40">背景</div>
        <div className="space-y-0.5 px-2">
          {BG_CONFIG.filter((b) => !b.hidden).map((item) => (
            <button
              key={item.key}
              onClick={() => { setBgKey(item.key); setPaused(false); }}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                bgKey === item.key
                  ? 'bg-cyan-400/20 text-cyan-300'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.zh}
            </button>
          ))}
        </div>
      </div>

      {/* 中间：预览 */}
      <div className="flex flex-1 flex-col">
        <div ref={captureRef} className="relative flex-1 overflow-hidden bg-black">
          <ErrorBoundary>
            {BgComp && <BgComp {...compProps} />}
          </ErrorBoundary>
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
          {PARAM_DEFS.map((def) => {
            const active = isParamActive(def.key);
            return (
              <div key={def.key} className={active ? '' : 'opacity-30'}>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm text-white/80">{def.label}</span>
                  <span className="text-xs text-white/50">
                    {def.type === 'color' ? params[def.key] : params[def.key].toFixed(1)}
                  </span>
                </div>
                {def.type === 'color' ? (
                  <input
                    type="color"
                    value={params[def.key]}
                    onChange={(e) => setParam(def.key, e.target.value)}
                    disabled={!active}
                    className="h-8 w-full cursor-pointer rounded bg-transparent"
                  />
                ) : (
                  <input
                    type="range"
                    min={def.min}
                    max={def.max}
                    step={def.step}
                    value={params[def.key]}
                    onChange={(e) => setParam(def.key, parseFloat(e.target.value))}
                    disabled={!active}
                    className="w-full accent-cyan-400"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 px-3 text-[10px] leading-relaxed text-white/30">
          灰色参数表示该背景不支持此调节项
        </div>
      </div>
    </div>
  );
}
