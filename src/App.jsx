import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TopAnimeNav from './components/TopAnimeNav';
import Home from './components/Home';
import LibraryHome from './components/LibraryHome';
import ComponentPage from './components/ComponentPage';
import BackgroundStudio from './tools/BackgroundStudio';
import ShapeMagic from './tools/ShapeMagic';
import TextureLab from './tools/TextureLab';
import Aura from './pages/Aura';
import Lithos from './pages/Lithos';
import MotionsitesGallery from './pages/MotionsitesGallery';
import UiverseGallery from './pages/UiverseGallery';

function Shell() {
  const { pathname } = useLocation();
  const isPortfolio = pathname === '/';

  return (
    <div className="min-h-screen bg-ink text-white">
      {!isPortfolio && <Sidebar />}
      {!isPortfolio && <TopAnimeNav />}
      <main className={isPortfolio ? '' : 'ml-64 pt-14'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<LibraryHome />} />
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
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Shell />
      </AppProvider>
    </HashRouter>
  );
}
