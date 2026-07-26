import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Copy, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE = import.meta.env.BASE_URL; // '/sucaiku/'
const PER_PAGE = 35;

// uiverse types (ordered by typical popularity); only those present in manifest are shown
// 注：form / notification 在源站可抓取 feed 中无数据，已从列表中移除
const TYPE_ORDER = [
  'button', 'card', 'loader', 'switch', 'checkbox',
  'input', 'radio', 'pattern', 'tooltip',
];
const TYPE_ZH = {
  button: '按钮', card: '卡片', loader: '加载', switch: '切换', checkbox: '复选框',
  input: '输入框', radio: '单选', pattern: '图案', tooltip: '提示',
};

function stageBg(comp) {
  if (comp.backgroundColor && comp.backgroundColor.trim()) return comp.backgroundColor.trim();
  return comp.theme === 'dark' ? '#0b0b0f' : '#f4f4f5';
}

function typeLabel(x) {
  return TYPE_ZH[x] || x;
}

function displayName(c) {
  return c.title || c.friendlyId;
}

// centered=true 用于模态大图预览（组件居中展示）；false 用于网格缩略图（顶对齐、去强制 padding/居中，1:1 还原）
function buildDoc(comp, centered = false) {
  const bg = stageBg(comp);
  const stage = centered
    ? `min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px`
    : `padding:18px`;
  return `<!doctype html><html><head><meta charset="utf-8">` +
    `<style>${comp.css || ''}</style>` +
    `<style>html,body{margin:0;padding:0}#uv-stage{${stage};background:${bg};box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:hidden}#uv-stage>*{max-width:100%}</style>` +
    `</head><body><div id="uv-stage">${comp.html || ''}</div></body></html>`;
}

function Preview({ comp, className, style, centered = false }) {
  const [doc, setDoc] = useState('');
  useEffect(() => { setDoc(buildDoc(comp, centered)); }, [comp, centered]);
  return (
    <iframe
      title={comp.friendlyId}
      sandbox="allow-scripts allow-pointer-lock"
      srcDoc={doc}
      className={className}
      style={{ border: 'none', background: stageBg(comp), ...style }}
    />
  );
}

function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/50">{label}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre className="overflow-auto p-4 text-[12px] leading-relaxed text-white/80"><code>{code}</code></pre>
    </div>
  );
}

function Modal({ comp, onClose }) {
  const [tab, setTab] = useState('html');
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!comp) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div>
            <div className="text-base font-semibold text-white">{displayName(comp)}</div>
            <div className="text-xs text-white/40">by {comp.username} · {typeLabel(comp.type)}</div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
          <div className="min-h-[260px] border-b border-white/10 md:border-b-0 md:border-r">
            <Preview comp={comp} className="h-full w-full" centered />
          </div>
          <div className="flex min-h-0 flex-col gap-3 p-4">
            <div className="flex gap-2">
              {['html', 'css'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-lg px-4 py-1.5 text-sm transition-colors ${tab === t ? 'bg-violet-400/20 text-violet-200' : 'bg-white/5 text-white/60 hover:text-white'}`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
            <CodeBlock label={tab === 'html' ? 'HTML' : 'CSS'} code={tab === 'html' ? (comp.html || '') : (comp.css || '')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UiverseGallery() {
  const [manifest, setManifest] = useState(null);   // {type: count}
  const [types, setTypes] = useState([]);
  const [active, setActive] = useState(null);
  const [items, setItems] = useState([]);            // current type's components
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [loadingType, setLoadingType] = useState(false);
  const [selected, setSelected] = useState(null);
  const cacheRef = useRef({});

  useEffect(() => {
    fetch(`${BASE}uiverse/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => {
        if (!m) return;
        setManifest(m);
        const present = TYPE_ORDER.filter((t) => m[t]);
        setTypes(present);
        if (present.length) setActive(present[0]);
      })
      .catch(() => {});
  }, []);

  const loadType = useCallback((type) => {
    if (cacheRef.current[type]) {
      setItems(cacheRef.current[type]);
      setPage(0);
      return;
    }
    setLoadingType(true);
    fetch(`${BASE}uiverse/${type}.json`)
      .then((r) => r.json())
      .then((arr) => {
        cacheRef.current[type] = arr;
        setItems(arr);
        setPage(0);
      })
      .catch(() => setItems([]))
      .finally(() => setLoadingType(false));
  }, []);

  useEffect(() => { if (active) loadType(active); }, [active, loadType]);

  const filtered = query.trim()
    ? items.filter((c) =>
        (c.title || '').toLowerCase().includes(query.toLowerCase()) ||
        c.friendlyId.toLowerCase().includes(query.toLowerCase()) ||
        c.username.toLowerCase().includes(query.toLowerCase()))
    : items;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = filtered.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/30 px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Uiverse <span className="text-violet-400">组件库</span>
              </h1>
              <p className="mt-1 text-sm text-white/50">
                一比一复刻 uiverse.io/elements · 共 {manifest ? Object.values(manifest).reduce((a, b) => a + b, 0) : 0} 个免费组件
              </p>
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(0); }}
                placeholder="搜索组件 / 作者…"
                className="w-64 rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-400/50"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => { setActive(t); }}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active === t ? 'bg-violet-400/20 text-violet-200' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="font-medium">{typeLabel(t)}</span>
                <span className={`rounded-full px-1.5 text-[11px] ${active === t ? 'bg-violet-400/30' : 'bg-white/10'} text-white/70`}>
                  {manifest?.[t] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {loadingType ? (
          <div className="py-20 text-center text-white/40">加载中…</div>
        ) : pageItems.length === 0 ? (
          <div className="py-20 text-center text-white/40">暂无组件</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {pageItems.map((c) => (
              <button
                key={c.username + '/' + c.friendlyId}
                onClick={() => setSelected(c)}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-left transition-all hover:border-violet-400/40 hover:bg-white/[0.06]"
              >
                <div className="h-48 w-full overflow-hidden bg-zinc-900">
                  <Preview comp={c} className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white/90">{displayName(c)}</div>
                    <div className="truncate text-[11px] text-white/40">@{c.username}</div>
                  </div>
                  <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">{typeLabel(c.type)}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft size={15} /> 上一页
            </button>
            <span className="text-sm text-white/50">
              {safePage + 1} / {totalPages}
            </span>
            <button
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              下一页 <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {selected && <Modal comp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
