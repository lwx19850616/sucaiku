import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, profile } from '../data.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar({ route, onNavigate, onHome }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    onNavigate(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || route ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          onClick={onHome}
          className="group flex items-center gap-2 text-lg font-extrabold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand ring-1 ring-brand/30 transition-transform group-hover:scale-105">
            {profile.name.charAt(0).toUpperCase()}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </button>

        {/* 桌面导航 */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="菜单"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/30 bg-background/20 text-foreground backdrop-blur-sm transition-all hover:bg-background/80 md:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="glass mx-3 mb-3 flex flex-col gap-1 rounded-xl p-2">
              {nav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
