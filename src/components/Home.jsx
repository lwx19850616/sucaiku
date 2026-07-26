import { useApp } from '../context/AppContext';
import PortfolioNav from './PortfolioNav';
import Hero from './portfolio/Hero';
import Featured from './portfolio/Featured';
import About from './portfolio/About';
import Skills from './portfolio/Skills';
import Experience from './portfolio/Experience';
import Works from './portfolio/Works';
import Contact from './portfolio/Contact';

export default function Home() {
  const { t, theme } = useApp();
  return (
    <div data-theme={theme} className="bg-white text-slate-900 dark:bg-[#0b0b0f] dark:text-white">
      <PortfolioNav />
      <main>
        <Hero />
        <Featured />
        <About />
        <Skills />
        <Experience />
        <Works />
        <Contact />
      </main>

      <footer className="border-t border-black/5 bg-white py-10 text-center dark:border-white/10 dark:bg-[#0b0b0f]">
        <p className="text-sm text-slate-500 dark:text-white/50">{t('footer.built')}</p>
        <p className="mt-1 text-xs text-slate-400 dark:text-white/30">{t('footer.rights')}</p>
      </footer>
    </div>
  );
}
