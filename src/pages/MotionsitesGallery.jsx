import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ExternalLink, Copy, Check, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hls from 'hls.js';
import prompts from '../data/motionsitesPrompts.json';

// 加载失败时的占位
function MediaPlaceholder({ className = '' }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-white/5 to-transparent ${className}`}>
      <Layers className="h-8 w-8 text-white/20" />
    </div>
  );
}

// 统一媒体渲染：支持 m3u8(hls.js)、普通视频、图片，失败自动兜底占位
function PreviewMedia({ url, className = '' }) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);
  const isM3u8 = /\.m3u8(\?|$)/i.test(url || '');

  useEffect(() => {
    setFailed(false);
    if (!isM3u8 || !url || !videoRef.current) return;
    const video = videoRef.current;
    let hls;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else if (Hls.isSupported()) {
      hls = new Hls({ maxBufferLength: 8, capLevelToPlayerSize: true });
      hls.loadSource(url);
      hls.attachMedia(video);
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, [url, isM3u8]);

  if (!url || failed) return <MediaPlaceholder className={className} />;
  if (isM3u8) {
    return <video ref={videoRef} autoPlay loop muted playsInline className={className} />;
  }
  if (isVideoUrl(url)) {
    return (
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <img
      src={url}
      alt=""
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const ITEMS_PER_PAGE = 24;

function getPreviewUrl(item) {
  return item.video_preview_url || item.image_preview_url;
}

function isVideoUrl(url) {
  if (!url) return false;
  return /\.(m3u8|mp4|webm|mov)(\?|$)/i.test(url);
}

function getTypeLabel(type) {
  if (!type) return 'Other';
  return type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function PromptModal({ item, onClose }) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleCopy = async () => {
    if (!item.prompt_text) return;
    try {
      await navigator.clipboard.writeText(item.prompt_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (textRef.current) {
        textRef.current.select();
        textRef.current.setSelectionRange(0, item.prompt_text.length);
      }
    }
  };

  const previewUrl = getPreviewUrl(item);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1012] shadow-2xl md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Preview */}
        <div className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden bg-black/40 md:min-h-[540px]">
          <PreviewMedia url={previewUrl} className="h-full w-full object-contain" />
          {!previewUrl && (
            <span className="pointer-events-none absolute bottom-4 text-xs text-white/40">No preview available</span>
          )}
          {item.replicated && (
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              已复刻
            </div>
          )}
        </div>

        {/* Prompt text */}
        <div className="flex w-full flex-col border-t border-white/10 md:w-[420px] md:border-l md:border-t-0 lg:w-[480px]">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
            <div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/50">{item.category}</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/60">
                {getTypeLabel(item.type)}
              </span>
              {item.is_free && (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
                  Free
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <textarea
              ref={textRef}
              readOnly
              value={item.prompt_text || 'No prompt text available.'}
              className="h-full min-h-[280px] w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-relaxed text-white/80 outline-none focus:border-white/20"
            />
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 p-5">
            <button
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? '已复制' : '复制提示词'}
            </button>
            {item.replicated && item.route && (
              <Link
                to={item.route}
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
                查看复刻页面
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function MotionsitesGallery() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const types = useMemo(() => {
    const set = new Set(prompts.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const categories = useMemo(() => {
    const set = new Set(prompts.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prompts.filter(p => {
      const matchesSearch = !q ||
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q));
      const matchesType = typeFilter === 'all' || p.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [search, typeFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#0c0c0c] px-4 pb-12 pt-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-cyan-400/80">
              <Sparkles className="h-4 w-4" />
              提示词模板库
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">motionsites.ai</h1>
            <p className="mt-2 max-w-xl text-sm text-white/50">
              收集了 motionsites.ai 上全部 Free 提示词，以及已复刻的 Aura、Lithos。点击卡片可放大查看预览与完整提示词。
            </p>
          </div>
          <div className="text-sm text-white/40">
            共 <span className="font-semibold text-white">{filtered.length}</span> 条
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="搜索标题、分类..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/20 focus:bg-white/[0.07]"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
          >
            {types.map(t => (
              <option key={t} value={t} className="bg-[#0f1012]">
                {t === 'all' ? '全部类型' : getTypeLabel(t)}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-[#0f1012]">
                {c === 'all' ? '全部分类' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {pageItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-24 text-center">
            <Layers className="h-10 w-10 text-white/20" />
            <p className="mt-4 text-white/50">没有匹配的提示词</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map((item) => {
              const previewUrl = getPreviewUrl(item);
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                    <PreviewMedia
                      url={previewUrl}
                      className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    {item.replicated && (
                      <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold text-emerald-200 backdrop-blur-md">
                        <Sparkles className="h-3 w-3" />
                        已复刻
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
                        {getTypeLabel(item.type)}
                      </span>
                      {item.is_free && (
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
                          Free
                        </span>
                      )}
                    </div>
                    <h3 className="line-clamp-1 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 line-clamp-1 text-xs text-white/40">{item.category}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-2.5 text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-white text-black'
                    : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <PromptModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
