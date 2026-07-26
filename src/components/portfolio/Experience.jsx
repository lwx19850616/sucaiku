import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export default function Experience() {
  const { t } = useApp();
  const items = t('experience.items', []);

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 bg-white py-24 dark:bg-[#0b0b0f]"
    >
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
            {t('experience.title')}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {t('experience.lead')}
          </h2>
        </div>

        <div className="relative pl-8">
          {/* 竖线 */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-violet-500/60 to-cyan-400/60" />

          <div className="space-y-10">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                {/* 节点 */}
                <span className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 ring-4 ring-white dark:ring-[#0b0b0f]" />
                <div className="rounded-2xl border border-black/5 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">
                    {it.period}
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {it.role}
                  </h3>
                  <div className="text-sm text-slate-500 dark:text-white/50">{it.org}</div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                    {it.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
