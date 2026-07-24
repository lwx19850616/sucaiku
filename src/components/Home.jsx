import { Link } from 'react-router-dom';
import { CATEGORIES, TOTAL_COUNT, READY_COUNT } from '../data/components';
import { TOOLS } from '../data/tools';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-5xl font-black leading-tight text-white">
        中文组件库
        <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
          一比一复刻 React Bits
        </span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/60">
        把 reactbits.dev 左侧导航的全部动画与组件，按原布局复刻到你的个人网站，
        名称翻译为中文。目前已上线 <span className="font-bold text-cyan-300">{READY_COUNT}</span> / {TOTAL_COUNT} 个组件。
      </p>

      {/* 工作室工具 */}
      <div className="mt-10">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">工作室 · Tools</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              to={`/tools/${tool.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              <div className="text-3xl">{tool.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-white group-hover:text-cyan-300">{tool.zh}</h3>
              <p className="mt-1 text-xs text-white/40">{tool.en}</p>
              <p className="mt-2 text-sm text-white/50">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const ready = cat.items.filter((i) => i.status === 'ready').length;
          const first = cat.items.find((i) => i.status === 'ready') || cat.items[0];
          return (
            <Link
              key={cat.key}
              to={`/c/${first.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{cat.zh}</h2>
                <span className="text-xs text-white/40">{cat.en}</span>
              </div>
              <p className="mt-1 text-sm text-white/50">
                {cat.items.length} 个组件 · 已上线 {ready} 个
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cat.items.slice(0, 6).map((i) => (
                  <span
                    key={i.slug}
                    className={`rounded-md px-2 py-0.5 text-[11px] ${
                      i.status === 'ready'
                        ? 'bg-cyan-400/15 text-cyan-200'
                        : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {i.zh}
                  </span>
                ))}
                {cat.items.length > 6 && (
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/40">
                    +{cat.items.length - 6}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
