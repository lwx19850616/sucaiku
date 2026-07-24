import { motion } from 'framer-motion'

/**
 * BlurText —— 文字逐字模糊入场动画（React Bits 风格）
 * 用法：<BlurText text="你好，世界" className="text-5xl" />
 */
export default function BlurText({
  text = '',
  delay = 0,
  stagger = 0.04,
  className = '',
  as: Tag = 'div',
}) {
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 12 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                delay: delay + (wi * word.length + ci) * stagger,
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
