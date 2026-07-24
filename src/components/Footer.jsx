export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
      {/* 改成你的名字 */}
      <p>© {year} 你的名字. 用 React Bits 风格组件搭建。</p>
    </footer>
  )
}
