import React from "react";
import { motion } from "motion/react";
import SpaceStars from "./SpaceStars";
import { scrollToTarget } from "./useSmoothScroll";

/**
 * SpaceShowcase — 太空主题 demo 页面
 * 完整复刻 nareshkhatri.dev 的视觉风格:
 *  - 深色渐变背景 + 粒子星空
 *  - Hero 大字 + 副标题
 *  - 多个 scroll snap section
 *  - 配合 useSmoothScroll 使用丝滑滚动
 *
 * 用法:
 *   import SpaceShowcase from '@/bits/Backgrounds/SpaceShowcase';
 *   <Route path="/space-demo" element={<SpaceShowcase />} />
 */
export default function SpaceShowcase() {
  const sections = [
    {
      id: "intro",
      eyebrow: "01 / Hello",
      title: "Naresh Khatri",
      subtitle: "Full-Stack Developer · Creative Technologist",
      body: "A jaw-dropping developer portfolio packed with interactive 3D animations, buttery smooth transitions, and a space-themed aesthetic.",
    },
    {
      id: "tech",
      eyebrow: "02 / Tech Stack",
      title: "Modern tools, beautifully orchestrated.",
      subtitle: "Next.js · TypeScript · React · GSAP · Spline · Framer Motion",
      body: "Every interaction is a deliberate handshake between libraries — Lenis for buttery scroll, GSAP for choreography, Spline for the 3D layer.",
    },
    {
      id: "projects",
      eyebrow: "03 / Projects",
      title: "Things I've built.",
      subtitle: "Coding Ducks · Gumbalup · Waku · PeakPosts · Kanbi · StoreKit",
      body: "Each project ships with its own data model, animation pipeline, and deployment story. No boilerplate, no shortcuts.",
    },
    {
      id: "contact",
      eyebrow: "04 / Contact",
      title: "Let's build something.",
      subtitle: "Open for collaboration · remote · worldwide",
      body: "Have an idea that needs a 3D keycap keyboard? Hit me up.",
    },
  ];

  return (
    <div className="space-showcase">
      <SpaceStars quantity={250} />

      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="text-white font-semibold tracking-wide">@naresh / sucaiku</div>
        <div className="flex gap-6 text-sm text-white/70">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToTarget(`#space-${s.id}`)}
              className="hover:text-white transition-colors"
            >
              {s.eyebrow.split(" / ")[1]}
            </button>
          ))}
        </div>
      </nav>

      {/* 内容区 */}
      <main className="relative pt-32">
        {sections.map((section, idx) => (
          <section
            id={`space-${section.id}`}
            key={section.id}
            className="min-h-screen flex items-center px-8 md:px-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, margin: "-20%" }}
              className="max-w-4xl w-full"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
                {section.eyebrow}
              </div>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.04em",
                }}
              >
                {section.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-4 font-light">
                {section.subtitle}
              </p>
              <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed">
                {section.body}
              </p>

              {idx === 0 && (
                <button
                  onClick={() => scrollToTarget("#space-tech")}
                  className="mt-12 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
                >
                  ↓ Scroll to explore
                </button>
              )}
            </motion.div>
          </section>
        ))}
      </main>

      {/* 底部提示 */}
      <footer className="relative py-12 text-center text-white/30 text-sm border-t border-white/5">
        Scroll up & down to feel the smooth motion ✨
      </footer>
    </div>
  );
}
