import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COMPONENTS_BY_SLUG } from '../data/components';
import { TEXT_ANIMATION_DEMOS } from '../demos/TextAnimations';
import { ANIMATION_DEMOS } from '../demos/Animations';
import { COMPONENT_DEMOS } from '../demos/Components';
import { BG_CONFIG } from '../tools/bgConfig';
import bgProps from '../data/bgProps.json';
import ErrorBoundary from './ErrorBoundary';

// 按分类分发对应的演示映射
const DEMO_MAPS = {
  'text-animations': TEXT_ANIMATION_DEMOS,
  'animations': ANIMATION_DEMOS,
  'components': COMPONENT_DEMOS,
};

// 部分背景组件需要「内容型」数据才能呈现（如 GridMotion 的图片网格），
// 这里注入占位数据，避免在线预览区空白/黑屏。
function makeSampleItems() {
  const colors = ['#5227FF', '#7cff67', '#FF6B6B', '#4ECDC4', '#FFD93D', '#A06CD5'];
  return colors.map((c) =>
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c}'/><stop offset='1' stop-color='#0b1020'/></linearGradient></defs><rect width='300' height='300' fill='url(#g)'/></svg>`
    )
  );
}
const SAMPLE_DATA = {
  GridMotion: { items: makeSampleItems() },
};

function kebabToPascal(key) {
  return key.replace(/(^|-)([a-z])/g, (_, __, ch) => ch.toUpperCase());
}

function isSafePropValue(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.every((v) => typeof v === 'string');
  if (typeof value === 'string') {
    // 简单字符串可以透传；包含 {} () [] > 或 window. 的当作表达式过滤掉
    return !/[{}()\[\]>]/.test(value) && !value.startsWith('window.');
  }
  return false;
}

function formatType(value) {
  if (Array.isArray(value)) return 'string[]';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return Number.isInteger(value) ? 'number' : 'number';
  if (typeof value === 'string') return 'string';
  return 'unknown';
}

function formatDefault(value) {
  if (Array.isArray(value)) return `[${value.map((v) => `'${v}'`).join(', ')}]`;
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
}

function BackgroundPage({ info, bg, compName }) {
  const meta = bgProps[compName] || { defaults: {}, controls: {} };
  const defaults = meta.defaults || {};
  const controls = meta.controls || {};

  const [props, setProps] = useState(() => {
    const initial = {};
    for (const [key, value] of Object.entries(defaults)) {
      if (isSafePropValue(value)) initial[key] = value;
    }
    // 内容型占位（覆盖空数组等导致空白的默认值）
    const sample = SAMPLE_DATA[compName];
    if (sample) Object.assign(initial, sample);
    return initial;
  });

  // 组件内部可能读取 window.innerWidth；确保挂载时触发一次 resize
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [bg.key]);

  const BgComp = bg.comp;
  const controlEntries = useMemo(
    () => Object.entries(controls).filter(([key]) => isSafePropValue(defaults[key])),
    [controls, defaults]
  );

  const setProp = (key, value) => setProps((p) => ({ ...p, [key]: value }));

  const reset = () => {
    const initial = {};
    for (const [key, value] of Object.entries(defaults)) {
      if (isSafePropValue(value)) initial[key] = value;
    }
    const sample = SAMPLE_DATA[compName];
    if (sample) Object.assign(initial, sample);
    setProps(initial);
  };

  return (
    <article className="mx-auto max-w-7xl px-6 py-10">
      {/* 面包屑 + 标题 */}
      <div className="mb-2 text-xs text-white/40">
        <Link to="/" className="hover:text-white">首页</Link>
        <span className="mx-2">/</span>
        <span>{info.categoryZh}</span>
        <span className="mx-2">/</span>
        <span className="text-white/70">{info.zh}</span>
      </div>
      <h1 className="text-3xl font-black text-white sm:text-4xl">{info.zh}</h1>
      <p className="mt-1 text-sm text-white/40">
        原名 <span className="font-mono text-white/60">{info.en}</span>
        <span className="ml-3 rounded bg-emerald-400/15 px-2 py-0.5 text-emerald-300">已上线</span>
      </p>

      {/* 主体：预览 + 控制面板 */}
      <div className="mt-6 flex flex-col gap-5 lg:flex-row">
        {/* 预览区 */}
        <div className="relative flex min-h-[420px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black sm:min-h-[520px]">
          <ErrorBoundary>
            <BgComp {...props} />
          </ErrorBoundary>
        </div>

        {/* 控制面板 */}
        <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:w-80">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/40">自定义</div>
            <button
              onClick={reset}
              className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/70 hover:bg-white/20"
            >
              ↺ 重置
            </button>
          </div>

          {controlEntries.length === 0 ? (
            <p className="text-sm text-white/40">该背景暂无可用调节项。</p>
          ) : (
            <div className="space-y-4">
              {controlEntries.map(([key, ctrl]) => (
                <ControlRow
                  key={key}
                  name={key}
                  ctrl={ctrl}
                  value={props[key]}
                  onChange={(v) => setProp(key, v)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 属性表格 */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <div className="mb-4 text-lg font-semibold text-white">属性</div>
        {Object.keys(defaults).length === 0 ? (
          <p className="text-sm text-white/40">暂无属性说明。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                  <th className="pb-3 pr-4 font-semibold">属性</th>
                  <th className="pb-3 pr-4 font-semibold">类型</th>
                  <th className="pb-3 pr-4 font-semibold">默认值</th>
                  <th className="pb-3 font-semibold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                {Object.entries(defaults).map(([key, value]) => (
                  <tr key={key}>
                    <td className="py-3 pr-4 font-mono text-cyan-300">{key}</td>
                    <td className="py-3 pr-4 text-white/50">{formatType(value)}</td>
                    <td className="py-3 pr-4 font-mono text-white/60">{formatDefault(value)}</td>
                    <td className="py-3 text-white/40">
                      {isSafePropValue(value) ? '' : '运行时表达式，不支持在控制面板中修改'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 说明 */}
      <div className="mt-6 text-sm leading-relaxed text-white/60">
        <p>
          本组件复刻自 <span className="font-mono">React Bits</span> 开源库（MIT 许可），
          动画逻辑与原站一致，名称已翻译为中文。左侧预览为纯背景效果，控制面板按组件实际属性生成。
        </p>
      </div>
    </article>
  );
}

function ControlRow({ name, ctrl, value, onChange }) {
  const label = ctrl.label || name;

  if (ctrl.type === 'color') {
    return (
      <div>
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-white/80">{label}</span>
          <span className="font-mono text-xs text-white/50">{value}</span>
        </div>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-full cursor-pointer rounded bg-transparent"
        />
      </div>
    );
  }

  if (ctrl.type === 'colors') {
    const colors = Array.isArray(value) ? value : [];
    return (
      <div>
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-white/80">{label}</span>
          <span className="text-xs text-white/50">{colors.length} 色</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((c, i) => (
            <input
              key={i}
              type="color"
              value={c}
              onChange={(e) => {
                const next = [...colors];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (ctrl.type === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center justify-between">
        <span className="text-sm text-white/80">{label}</span>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-cyan-400"
        />
      </label>
    );
  }

  if (ctrl.type === 'select') {
    return (
      <div>
        <div className="mb-1.5 text-sm text-white/80">{label}</div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        >
          {ctrl.options.map((opt) => (
            <option key={opt} value={opt} className="bg-black">
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (ctrl.type === 'range') {
    const step = ctrl.step || 0.1;
    const display = Number.isInteger(step) ? value : Number(value).toFixed(String(step).split('.')[1]?.length || 1);
    return (
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-white/80">{label}</span>
          <span className="text-xs text-white/50">{display}</span>
        </div>
        <input
          type="range"
          min={ctrl.min}
          max={ctrl.max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
      </div>
    );
  }

  // text fallback
  return (
    <div>
      <div className="mb-1.5 text-sm text-white/80">{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
      />
    </div>
  );
}

export default function ComponentPage() {
  const { slug } = useParams();
  const info = COMPONENTS_BY_SLUG[slug];

  if (!info) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/60">
        未找到该组件：{slug}
      </div>
    );
  }

  const isReady = info.status === 'ready';
  const renderDemo = (DEMO_MAPS[info.categoryKey] || {})[slug];

  // 背景组件走专用页面
  if (info.categoryKey === 'backgrounds') {
    const bg = BG_CONFIG.find((b) => b.key === slug);
    if (bg) {
      return <BackgroundPage info={info} bg={bg} compName={kebabToPascal(slug)} />;
    }
  }

  return (
    <article className="mx-auto max-w-6xl px-6 py-12">
      {/* 面包屑 */}
      <div className="mb-2 text-xs text-white/40">
        <Link to="/" className="hover:text-white">首页</Link>
        <span className="mx-2">/</span>
        <span>{info.categoryZh}</span>
        <span className="mx-2">/</span>
        <span className="text-white/70">{info.zh}</span>
      </div>

      {/* 标题 */}
      <h1 className="text-4xl font-black text-white">{info.zh}</h1>
      <p className="mt-1 text-sm text-white/40">
        原名 <span className="font-mono text-white/60">{info.en}</span>
        {isReady && <span className="ml-3 rounded bg-emerald-400/15 px-2 py-0.5 text-emerald-300">已上线</span>}
      </p>

      {/* 演示区 */}
      <div className="mt-8 min-h-[420px] rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        {isReady && renderDemo ? (
          <ErrorBoundary>{renderDemo()}</ErrorBoundary>
        ) : (
          <div className="flex min-h-[160px] flex-col items-center justify-center text-center text-white/50">
            <div className="mb-3 text-5xl">🚧</div>
            <p className="text-lg font-semibold text-white/70">该组件即将上线</p>
            <p className="mt-1 max-w-md text-sm text-white/40">
              「{info.zh}」已列入复刻计划，后续分批实现后即可在此查看真实演示。
              当前共 {Object.values(COMPONENTS_BY_SLUG).filter((c) => c.status === 'ready').length} 个组件已上线。
            </p>
          </div>
        )}
      </div>

      {/* 说明 */}
      <div className="mt-6 text-sm leading-relaxed text-white/60">
        <p>
          本组件复刻自 <span className="font-mono">React Bits</span> 开源库（MIT 许可），
          动画逻辑与原站一致，名称已翻译为中文。
        </p>
      </div>
    </article>
  );
}
