import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const { t } = useApp();
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-white py-24 dark:bg-[#0b0b0f]"
    >
      {/* 装饰光斑 */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />

      <div className="relative mx-auto max-w-2xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
            {t('contact.title')}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {t('contact.lead')}
          </h2>

          <a
            href={`mailto:${t('contact.email')}`}
            className="magnetic-element mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-violet-500/30 transition-transform hover:scale-105"
          >
            <Mail className="h-5 w-5" />
            {t('contact.emailLabel')}: {t('contact.email')}
          </a>

          <p className="mt-6 text-sm text-slate-400 dark:text-white/40">{t('contact.note')}</p>
        </motion.div>
      </div>
    </section>
  );
}
