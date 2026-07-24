import { useEffect, useState } from 'react'

/**
 * 顶部吸顶导航。
 * 把「你的名字」换成你的展示名；链接锚点对应下方各区块的 id。
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: '关于' },
    { href: '#works', label: '作品' },
    { href: '#skills', label: '技能' },
    { href: '#contact', label: '联系' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-lg' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* 改成你的名字 */}
        <a href="#top" className="text-lg font-bold tracking-wide text-gradient">
          你的名字
        </a>
        <ul className="flex gap-6 text-sm text-white/70">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
