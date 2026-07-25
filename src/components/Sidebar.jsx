import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/components';
import { TOOLS } from '../data/tools';

export default function Sidebar() {
  const location = useLocation();
  const current = location.hash.replace('#/c/', '');
  const currentTool = location.hash.replace('#/tools/', '');
  const currentPage = location.hash.replace('#/pages/', '');

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="text-lg font-black tracking-tight text-white">
          组件库<span className="text-cyan-400">中文站</span>
        </div>
        <div className="mt-1 text-xs text-white/40">React Bits 风格 · 一比一复刻</div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* 工作室工具（最上方三栏） */}
        <div className="mb-5">
          <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            工作室 <span className="text-white/20">· Tools</span>
          </div>
          <ul className="space-y-0.5">
            {TOOLS.map((tool) => {
              const active = currentTool === tool.slug;
              return (
                <li key={tool.slug}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-cyan-400/15 text-cyan-200'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{tool.icon}</span>
                    <div>
                      <div className="font-medium leading-tight">{tool.zh}</div>
                      <div className="text-[10px] text-white/40">{tool.en}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 页面模板（免费 Hero / Landing） */}
        <div className="mb-5">
          <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            页面模板 <span className="text-white/20">· Pages</span>
          </div>
          <ul className="space-y-0.5">
            {[
              { slug: 'hero', zh: 'Hero 页面', en: 'Hero', icon: '🚀' },
              { slug: 'landing', zh: 'Landing 页面', en: 'Landing', icon: '📄' },
            ].map((p) => {
              const active = currentPage === p.slug;
              return (
                <li key={p.slug}>
                  <Link
                    to={`/pages/${p.slug}`}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-cyan-400/15 text-cyan-200'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{p.icon}</span>
                    <div>
                      <div className="font-medium leading-tight">{p.zh}</div>
                      <div className="text-[10px] text-white/40">{p.en}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="mb-5">
            <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
              {cat.zh} <span className="text-white/20">· {cat.en}</span>
            </div>
            <ul className="space-y-0.5">
              {cat.items.map((item) => {
                const active = current === item.slug;
                return (
                  <li key={item.slug}>
                    <Link
                      to={`/c/${item.slug}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors ${
                        active
                          ? 'bg-cyan-400/15 text-cyan-200'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{item.zh}</span>
                      {item.status === 'soon' && (
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/40">
                          待上线
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-3 text-[11px] text-white/30">
        复刻自 reactbits.dev · MIT 开源
      </div>
    </aside>
  );
}
