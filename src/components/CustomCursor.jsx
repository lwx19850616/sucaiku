import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// 磁性自定义光标：跟随鼠标，悬停可交互元素时放大并填充品牌色
export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => {
      const t = e.target.closest('a, button, [data-cursor], input, textarea')
      setHovering(!!t)
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* 外圈：弹簧跟随 */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="rounded-full border border-brand/70"
          animate={{
            width: hovering ? 56 : 22,
            height: hovering ? 56 : 22,
            marginLeft: hovering ? -28 : -11,
            marginTop: hovering ? -28 : -11,
            backgroundColor: hovering
              ? 'hsl(var(--brand) / 0.12)'
              : 'rgba(0,0,0,0)',
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
      </motion.div>

      {/* 中心点：即时跟随 */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y }}
      >
        <div
          className="h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-brand transition-opacity"
          style={{ opacity: visible ? 1 : 0 }}
        />
      </motion.div>
    </>
  )
}
