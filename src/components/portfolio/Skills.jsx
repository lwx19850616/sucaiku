import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export default function Skills() {
  const { t } = useApp();
  const items = t('skills.items', []);

  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-y border-black/5 bg-slate-50 py-24 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
            {t('skills.title')}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {t('skills.lead')}
          </h2>
        </div>

        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {items.map((s, i) => (
            <div key={s.name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-white/80">{s.name}</span>
                <span className="text-slate-400 dark:text-white/40">{s.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
