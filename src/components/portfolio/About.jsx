import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export default function About() {
  const { t } = useApp();
  const stats = t('about.stats', []);
  return (
    <section
      id="about"
      className="relative scroll-mt-20 bg-white py-24 dark:bg-[#0b0b0f]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
              {t('about.title')}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {t('about.lead')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-white/70">
              {t('about.p1')}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-white/70">
              {t('about.p2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-black/5 bg-slate-50 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-3xl font-black text-transparent dark:from-violet-300 dark:to-cyan-200">
                  {s.num}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-white/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
