import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data.js'

// 复刻 nareshkhatri.dev 的入场遮罩：显示名字 + “按任意键进入”，
// 首次交互或 2.4s 后淡出。SVG 波浪与站点背景色一致。
export default function Intro({ onDone }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const finish = () => {
      setDone(true)
      setTimeout(onDone, 700)
    }
    const onKey = () => finish()
    const onClick = () => finish()
    const timer = setTimeout(finish, 2400)

    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onClick)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onClick)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <svg
            className="absolute inset-x-0 bottom-0 h-[40vh] w-full"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,160 C200,80 400,240 600,160 C800,80 1000,240 1200,160 L1200,300 L0,300 Z"
              fill="hsl(var(--brand) / 0.12)"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {profile.roleEn}
            </p>
            <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-muted-foreground animate-pulse">
              按任意键 / 点击进入
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
