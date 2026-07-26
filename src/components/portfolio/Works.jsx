import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

// id -> { 跳转路由, 预览图(来自 motionsites 资源) }
const META = {
  motionsites: { to: '/pages/motionsites', img: '/sucaiku/motionsites-assets/immersive-ocean.webp' },
  uiverse: { to: '/pages/uiverse', img: '/sucaiku/motionsites-assets/network-hero.webp' },
  aura: { to: '/pages/aura', img: '/sucaiku/motionsites-assets/neon-logic.webp' },
  lithos: { to: '/pages/lithos', img: '/sucaiku/motionsites-assets/lithos.webp' },
  reactbits: { to: '/library', img: '/sucaiku/motionsites-assets/digital-experiences.webp' },
  bgstudio: { to: '/tools/background-studio', img: '/sucaiku/motionsites-assets/aurora-onboard.png' },
};

export default function Works() {
  const { t } = useApp();
  const items = t('works.items', []);

  return (
    <section
      id="works"
      className="relative scroll-mt-20 border-y border-black/5 bg-slate-50 py-24 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
            {t('works.title')}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {t('works.lead')}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => {
            const meta = META[w.id] || { to: '#', img: '' };
            return (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={meta.to}
                  className="magnetic-element group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-white/5">
                    <img
                      src={meta.img}
                      alt={w.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{w.title}</h3>
                      <span className="shrink-0 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">
                        {w.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-white/60">
                      {w.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
