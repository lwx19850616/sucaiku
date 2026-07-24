import { useParams, Link } from 'react-router-dom';
import { COMPONENTS_BY_SLUG } from '../data/components';
import { TEXT_ANIMATION_DEMOS } from '../demos/TextAnimations';
import { ANIMATION_DEMOS } from '../demos/Animations';
import ErrorBoundary from './ErrorBoundary';

// 按分类分发对应的演示映射
const DEMO_MAPS = {
  'text-animations': TEXT_ANIMATION_DEMOS,
  'animations': ANIMATION_DEMOS,
};

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

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
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
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
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
