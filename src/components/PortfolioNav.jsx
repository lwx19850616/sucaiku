import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const SECTIONS = ['about', 'skills', 'experience', 'works', 'contact'];

export default function PortfolioNav() {
  const { t, lang, theme, toggleLang, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-black/10 bg-white/70 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/50'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 text-lg font-black tracking-tight text-slate-900 dark:text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm text-white shadow-lg">
            ◆
          </span>
          <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-300 dark:to-cyan-200">
            {t('nav.brand')}
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              className="magnetic-element rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-black/5 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {t(`nav.${s}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10"
            aria-label="toggle language"
          >
            {lang === 'zh' ? t('nav.toEn') : t('nav.toZh')}
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10"
            aria-label="toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
}
