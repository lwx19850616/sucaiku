import Reveal from './Reveal.jsx'
import { experience } from '../data.js'

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24">
      <Reveal className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          Experience
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          我的职业历程
        </h2>
      </Reveal>

      <div className="relative ml-3 border-l-2 border-border pl-8">
        {experience.map((job, i) => (
          <Reveal key={i} delay={i * 0.1} className="relative pb-12 last:pb-0">
            {/* 时间线节点 */}
            <span className="absolute -left-[42px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand bg-background">
              <span className="h-2 w-2 rounded-full bg-brand" />
            </span>

            <div className="glass rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold">{job.company}</h3>
                <span className="text-sm text-muted-foreground">{job.period}</span>
              </div>
              <p className="mt-1 font-medium text-brand">{job.role}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {job.points.map((p, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
