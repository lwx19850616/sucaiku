import { Link, useLocation } from 'react-router-dom';

const ITEMS = [
  { to: '/pages/motionsites', label: 'motionsites.ai', cls: 'cyan' },
  { to: '/pages/uiverse', label: 'Uiverse', cls: 'violet' },
  { to: '/pages/aura', label: 'Aura', cls: 'amber' },
  { to: '/pages/lithos', label: 'Lithos', cls: 'emerald' },
];

const TONE = {
  cyan: {
    active: 'bg-cyan-400/20 text-cyan-200',
    idle: 'text-cyan-200/70 hover:bg-white/5 hover:text-cyan-100',
  },
  violet: {
    active: 'bg-violet-400/20 text-violet-200',
    idle: 'text-violet-200/70 hover:bg-white/5 hover:text-violet-100',
  },
  amber: {
    active: 'bg-amber-400/20 text-amber-200',
    idle: 'text-amber-200/70 hover:bg-white/5 hover:text-amber-100',
  },
  emerald: {
    active: 'bg-emerald-400/20 text-emerald-200',
    idle: 'text-emerald-200/70 hover:bg-white/5 hover:text-emerald-100',
  },
};

export default function TopAnimeNav() {
  const { hash } = useLocation();
  const cur = hash.replace(/^#/, '');

  return (
    <div className="fixed left-64 right-0 top-0 z-30 flex h-14 items-center gap-2 border-b border-white/10 bg-black/50 px-4 backdrop-blur-xl">
      <span className="mr-2 text-xs font-semibold text-white/50">提示词落地页</span>
      {ITEMS.map((it) => {
        const active = cur === it.to || cur.startsWith(it.to + '/');
        const tone = TONE[it.cls];
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${active ? tone.active : tone.idle}`}
          >
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}
