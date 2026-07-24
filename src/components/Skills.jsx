import { motion } from 'framer-motion'
import AnimatedContent from '../bits/AnimatedContent'

// 占位技能列表：替换成你真正掌握的技能
const SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js',
  'Tailwind CSS', 'Framer Motion', 'Three.js', 'Git', 'UI 设计',
]

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedContent>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">技能</span>
        </h2>
      </AnimatedContent>

      <div className="mt-10 flex flex-wrap gap-3">
        {SKILLS.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="glass rounded-full px-5 py-2 text-sm text-white/80"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
