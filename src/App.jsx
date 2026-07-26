import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopAnimeNav from './components/TopAnimeNav';
import Home from './components/Home';
import ComponentPage from './components/ComponentPage';
import BackgroundStudio from './tools/BackgroundStudio';
import ShapeMagic from './tools/ShapeMagic';
import TextureLab from './tools/TextureLab';
import Aura from './pages/Aura';
import Lithos from './pages/Lithos';
import MotionsitesGallery from './pages/MotionsitesGallery';
import UiverseGallery from './pages/UiverseGallery';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-ink text-white">
        <Sidebar />
        <TopAnimeNav />
        <main className="ml-64 pt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/c/:slug" element={<ComponentPage />} />
            <Route path="/tools/background-studio" element={<BackgroundStudio />} />
            <Route path="/tools/shape-magic" element={<ShapeMagic />} />
            <Route path="/tools/texture-lab" element={<TextureLab />} />
            <Route path="/pages/aura" element={<Aura />} />
            <Route path="/pages/lithos" element={<Lithos />} />
            <Route path="/pages/motionsites" element={<MotionsitesGallery />} />
            <Route path="/pages/uiverse" element={<UiverseGallery />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
