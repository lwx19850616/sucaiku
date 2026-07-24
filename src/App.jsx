import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ComponentPage from './components/ComponentPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-ink text-white">
        <Sidebar />
        <main className="ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/c/:slug" element={<ComponentPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
