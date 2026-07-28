import Reveal from './Reveal.jsx'
import { profile } from '../data.js'

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24">
      <Reveal className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-14">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          Contact
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          一起做点酷东西
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          有项目想聊，或只是打个招呼？随时给我发邮件。
        </p>

        <a
          href={`mailto:${profile.email}`}
          data-cursor
          className="group relative mt-8 inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand to-rose-400 px-7 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <span className="relative z-10">{profile.email}</span>
        </a>

        <div className="mt-8 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            data-cursor
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/40 text-foreground backdrop-blur transition-colors hover:bg-muted"
          >
            <GithubIcon />
          </a>
        </div>
      </Reveal>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {profile.name} · 由 React + Tailwind CSS +
        Framer Motion 构建
      </footer>
    </section>
  )
}
