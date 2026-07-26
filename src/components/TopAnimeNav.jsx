import { Link, useLocation } from 'react-router-dom';

const ITEMS = [
  { to: '/anime/1', label: '中文1' },
  { to: '/anime/2', label: '中文2' },
  { to: '/anime/3', label: '中文3' },
];

export default function TopAnimeNav() {
  const { hash } = useLocation();
  const cur = hash.replace(/^#/, '');
  return (
    <div className="fixed left-64 right-0 top-0 z-30 flex h-14 items-center gap-2 border-b border-white/10 bg-black/50 px-4 backdrop-blur-xl">
      <span className="mr-2 text-xs font-semibold text-white/50">anime.js 演示</span>
      {ITEMS.map((it) => {
        const active = cur === it.to || cur.startsWith(it.to + '/');
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              active
                ? 'bg-cyan-400/20 text-cyan-200'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            {it.label}
          </Link>
        );
      })}
      <span className="mx-1 h-5 w-px bg-white/10" />
      <Link
        to="/pages/aura"
        className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
          cur === '/pages/aura'
            ? 'bg-amber-400/20 text-amber-200'
            : 'text-amber-200/70 hover:bg-white/5 hover:text-amber-100'
        }`}
      >
        Aura 落地页
      </Link>
    </div>
  );
}
