import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

// 精选自 motionsites 的轻量预览图（webp，秒加载）
const PICKS = [
  { src: '/sucaiku/motionsites-assets/lithos.webp', label: 'Lithos' },
  { src: '/sucaiku/motionsites-assets/immersive-ocean.webp', label: 'Immersive Ocean' },
  { src: '/sucaiku/motionsites-assets/organic-odyssey.webp', label: 'Organic Odyssey' },
  { src: '/sucaiku/motionsites-assets/network-hero.webp', label: 'Network Hero' },
  { src: '/sucaiku/motionsites-assets/neon-logic.webp', label: 'Neon Logic' },
  { src: '/sucaiku/motionsites-assets/digital-experiences.webp', label: 'Digital Experiences' },
];

export default function Featured() {
  const { t } = useApp();
  return (
    <section className="relative border-y border-black/5 bg-slate-50 py-14 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
              Featured
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {t('works.title')} · motionsites
            </h2>
          </div>
          <Link
            to="/pages/motionsites"
            className="magnetic-element hidden items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10 sm:flex"
          >
            全部合集 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {PICKS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                to="/pages/motionsites"
                className="group relative block overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-all hover:shadow-xl dark:border-white/10"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-white/5">
                  <img
                    src={p.src}
                    alt={p.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                  <span className="text-sm font-semibold text-white">{p.label}</span>
                  <ArrowRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
