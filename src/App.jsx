import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ComponentPage from './components/ComponentPage';
import BackgroundStudio from './tools/BackgroundStudio';
import ShapeMagic from './tools/ShapeMagic';
import TextureLab from './tools/TextureLab';
import PagesHero from './pages/PagesHero';
import PagesLanding from './pages/PagesLanding';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-ink text-white">
        <Sidebar />
        <main className="ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/c/:slug" element={<ComponentPage />} />
            <Route path="/tools/background-studio" element={<BackgroundStudio />} />
            <Route path="/tools/shape-magic" element={<ShapeMagic />} />
            <Route path="/tools/texture-lab" element={<TextureLab />} />
            <Route path="/pages/hero" element={<PagesHero />} />
            <Route path="/pages/landing" element={<PagesLanding />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
