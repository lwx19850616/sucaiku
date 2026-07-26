import { Link, useLocation } from 'react-router-dom';

const ITEMS = [
  { to: '/pages/aura', label: 'Aura 落地页', cls: 'amber' },
  { to: '/pages/lithos', label: 'Lithos 落地页', cls: 'emerald' },
];

export default function TopAnimeNav() {
  const { hash } = useLocation();
  const cur = hash.replace(/^#/, '');
  const tone = (c, active) =>
    c === 'amber'
      ? active
        ? 'bg-amber-400/20 text-amber-200'
        : 'text-amber-200/70 hover:bg-white/5 hover:text-amber-100'
      : active
      ? 'bg-emerald-400/20 text-emerald-200'
      : 'text-emerald-200/70 hover:bg-white/5 hover:text-emerald-100';
  return (
    <div className="fixed left-64 right-0 top-0 z-30 flex h-14 items-center gap-2 border-b border-white/10 bg-black/50 px-4 backdrop-blur-xl">
      <span className="mr-2 text-xs font-semibold text-white/50">提示词落地页</span>
      {ITEMS.map((it) => {
        const active = cur === it.to || cur.startsWith(it.to + '/');
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${tone(it.cls, active)}`}
          >
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}
