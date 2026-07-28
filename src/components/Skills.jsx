import Reveal from './Reveal.jsx'
import { skills } from '../data.js'

function SectionTitle({ kicker, title }) {
  return (
    <Reveal className="mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        {kicker}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionTitle kicker="Tech Stack" title="我的技术栈" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.08}>
            <div className="glass h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <h3 className="mb-4 text-lg font-bold">{group.category}</h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((tech) => (
                  <span
                    key={tech.name}
                    data-cursor
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
