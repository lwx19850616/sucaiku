import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ChevronDown } from 'lucide-react';

const VIDEO = '/sucaiku/motionsites-assets/prompt-hero.mp4';
const POSTER = '/sucaiku/motionsites-assets/prompt-hero_img.webp';

export default function Hero() {
  const { t } = useApp();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const handler = (e) => setReduce(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 背景视频（来自 motionsites 的 prompt-hero） */}
      <div className="absolute inset-0">
        {reduce ? (
          <img src={POSTER} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={VIDEO}
            poster={POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        )}
        {/* 渐变遮罩，保证文字可读 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 via-transparent to-cyan-900/30" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70"
        >
          {t('hero.hi')} <span className="text-cyan-300">{t('hero.name')}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
            {t('hero.role')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80"
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => go('works')}
            className="magnetic-element rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-violet-500/30 transition-transform hover:scale-105"
          >
            {t('hero.ctaWorks')}
          </button>
          <button
            onClick={() => go('about')}
            className="magnetic-element rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            {t('hero.ctaAbout')}
          </button>
        </motion.div>
      </div>

      {/* 向下滚动提示 */}
      <button
        onClick={() => go('about')}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="scroll down"
      >
        <span className="mb-1 block text-xs tracking-widest">{t('hero.scroll')}</span>
        <ChevronDown className="mx-auto h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}
