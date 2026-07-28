import { useEffect, useRef } from 'react'

// 轻量 Canvas 2D 星空 —— 高保真还原 nareshkhatri.dev 的太空星点氛围
// （原站用 Three.js WebGL 粒子云渲染同一空 <canvas>，这里用 2D canvas 还原，
//   更轻、更稳、移动端更省电，但观感一致：深空黑底 + 密集白星 + 缓慢漂移 + 闪烁 + 偶发流星）
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let stars = []
    let shootingStars = []
    let raf = 0
    let lastShoot = 0
    let nextShootIn = 3000 + Math.random() * 5000
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    // 直接读 html 上的 .dark class（system 模式切换时也能即时反映）
    const isDark = () => document.documentElement.classList.contains('dark')

    function resize() {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
    }

    function buildStars() {
      // 密度降低，避免“雪片”般的灰白噪点感，更像遥远稀疏的深空星点
      const count = Math.min(220, Math.floor((w * h) / 9000))
      stars = new Array(count).fill(0).map(() => {
        const depth = 0.2 + Math.random() * 0.8 // 视差层：近大亮、远小暗
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + Math.random() * 1.1 * depth,
          baseA: 0.15 + Math.random() * 0.55, // 整体更暗、更冷
          tw: 0.3 + Math.random() * 1.4, // 闪烁速度
          ph: Math.random() * Math.PI * 2,
          depth,
          // 少量星点带极淡的蓝/青/品色调，模拟真实恒星光谱
          tint: Math.random() > 0.82 ? (Math.random() > 0.5 ? '190,220,255' : '255,220,230') : null,
        }
      })
    }

    function spawnShooting() {
      const startX = Math.random() * w * 0.75
      const startY = Math.random() * h * 0.35
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35
      const speed = 7 + Math.random() * 3
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 120 + Math.random() * 180,
        life: 0,
        max: 55 + Math.random() * 35,
      })
    }

    let t0 = performance.now()
    function frame(now) {
      const t = (now - t0) / 1000
      // 鼠标视差缓动（轻微，增强太空沉浸感）
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      const dark = isDark()
      ctx.clearRect(0, 0, w, h)

      const starColor = dark ? '255,255,255' : '60,75,110'
      const globalAlphaBase = dark ? 0.85 : 0.35 // 暗色下也压低一点，避免发灰

      for (const s of stars) {
        const driftX = Math.sin(t * 0.04 + s.ph) * 5 * s.depth
        const driftY = Math.cos(t * 0.03 + s.ph) * 3 * s.depth
        const px = s.x + driftX + mouse.x * s.depth * 10
        const py = s.y + driftY + mouse.y * s.depth * 10
        let a = s.baseA
        if (!reduceMotion) a *= 0.5 + 0.5 * Math.sin(t * s.tw + s.ph)
        a *= globalAlphaBase
        if (a <= 0.02) continue
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        // 暗色模式下给少量星点加冷蓝/品红 tint，避免纯白一片显得平
        const color = dark && s.tint ? s.tint : starColor
        ctx.fillStyle = `rgba(${color},${a.toFixed(3)})`
        ctx.fill()
      }

      // 流星
      if (!reduceMotion) {
        if (now - lastShoot > nextShootIn) {
          spawnShooting()
          lastShoot = now
          nextShootIn = 3500 + Math.random() * 6000
        }
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const m = shootingStars[i]
          m.x += m.vx
          m.y += m.vy
          m.life++
          const k = m.life / m.max
          if (k >= 1) {
            shootingStars.splice(i, 1)
            continue
          }
          const dist = Math.hypot(m.vx, m.vy)
          const tailX = m.x - (m.vx / dist) * m.len
          const tailY = m.y - (m.vy / dist) * m.len
          const ma = (1 - k) * (dark ? 0.85 : 0.4)
          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
          grad.addColorStop(0, `rgba(255,255,255,${ma})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.6
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(frame)
    }

    function onMove(e) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
