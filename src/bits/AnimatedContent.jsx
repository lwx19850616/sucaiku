import { motion } from 'framer-motion'

/**
 * AnimatedContent —— 滚动进入视口时淡入上浮（React Bits 风格）
 * 用法：把任意内容包起来，滚动到它时就会播放入场动画。
 */
export default function AnimatedContent({
  children,
  className = '',
  delay = 0,
  y = 30,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
