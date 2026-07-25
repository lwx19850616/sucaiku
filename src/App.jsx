import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopAnimeNav from './components/TopAnimeNav';
import Home from './components/Home';
import ComponentPage from './components/ComponentPage';
import BackgroundStudio from './tools/BackgroundStudio';
import ShapeMagic from './tools/ShapeMagic';
import TextureLab from './tools/TextureLab';
import Anime1 from './pages/Anime1';
import Anime2 from './pages/Anime2';
import Anime3 from './pages/Anime3';

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
            <Route path="/anime/1" element={<Anime1 />} />
            <Route path="/anime/2" element={<Anime2 />} />
            <Route path="/anime/3" element={<Anime3 />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
