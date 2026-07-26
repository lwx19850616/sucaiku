import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { STRINGS } from '../i18n/strings';

const AppContext = createContext(null);

function getPath(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('sucaiku-lang') || 'zh');
  const [theme, setTheme] = useState(() => localStorage.getItem('sucaiku-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('sucaiku-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('sucaiku-theme', theme);
  }, [theme]);

  const toggleLang = useCallback(() => setLang((l) => (l === 'zh' ? 'en' : 'zh')), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  const t = useCallback(
    (path, fallback) => {
      const val = getPath(STRINGS[lang], path);
      if (val != null) return val;
      const en = getPath(STRINGS.en, path);
      return en != null ? en : fallback != null ? fallback : path;
    },
    [lang]
  );

  return (
    <AppContext.Provider value={{ lang, theme, setLang, setTheme, toggleLang, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
