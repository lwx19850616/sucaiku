import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Apple, ChevronRight, Sparkles, Search, File, Edit, View, HelpCircle,
  Reply, Forward, Archive, Trash2, MoreHorizontal, Paperclip, Menu, X,
  Inbox, Star, Send, FileText,
} from 'lucide-react';

/* ============================================================
 *  Shared primitives (from the prompt — reproduced exactly)
 * ========================================================== */

function AppleLogo({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function LogoMark({ className = 'w-8 h-8' }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z" />
    </svg>
  );
}

function AppleButton({ label = 'Download Aura', full = false }) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] ${full ? 'w-full' : ''}`}
    >
      <Apple className="w-4 h-4" />
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function SectionEyebrow({ label, tag }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-white/70">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      {label}
      {tag && (
        <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50">{tag}</span>
      )}
    </span>
  );
}

const gradientStyle = {
  backgroundImage:
    'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
};

/* ============================================================
 *  Data
 * ========================================================== */

const NAV_LINKS = ['Solutions', 'Pricing', 'Blog', 'Documentation', 'Careers'];
const MENU_ITEMS = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

const SIDEBAR_NAV = [
  { icon: Inbox, label: 'Inbox', count: 12, active: true },
  { icon: Star, label: 'Starred', count: 3 },
  { icon: Send, label: 'Sent' },
  { icon: FileText, label: 'Drafts', count: 2 },
  { icon: Archive, label: 'Archive' },
  { icon: Trash2, label: 'Trash' },
];

const LABELS = [
  { name: 'Work', color: '#00d2ff' },
  { name: 'Personal', color: '#A4F4FD' },
  { name: 'Travel', color: '#f59e0b' },
  { name: 'Finance', color: '#10b981' },
];

const MESSAGES = [
  { name: 'Linear', subject: 'Weekly product digest', preview: 'Your team shipped 23 issues this week...', time: '9:41 AM', unread: true, active: true },
  { name: 'Sophia Chen', subject: 'Re: Q3 roadmap review', preview: 'Thanks for sending the deck over. I had a few thoughts...', time: '8:12 AM', unread: true, active: false },
  { name: 'Figma', subject: 'Marcus commented on your file', preview: 'Love the new direction on the landing hero.', time: 'Yesterday', unread: false, active: false },
  { name: 'Stripe', subject: 'Payout of $12,480.00 sent', preview: 'Your payout is on its way to your bank...', time: 'Yesterday', unread: false, active: false },
  { name: 'Vercel', subject: 'Deployment ready for aura-web', preview: 'Preview is live at aura-web-g3f.vercel.app', time: 'Mon', unread: false, active: false },
  { name: 'GitHub', subject: '[aura/core] PR #482 approved', preview: 'david-lim approved your pull request.', time: 'Mon', unread: false, active: false },
];

const TRIAGE = [
  { title: 'Priority', count: 4, color: '#ffffff', items: ['Sophia Chen — Q3 review', 'David Lim — contract signoff'] },
  { title: 'Follow-up', count: 7, color: '#e5e5e5', items: ['Marcus — design review', 'Figma — comment thread'] },
  { title: 'Updates', count: 18, color: '#a3a3a3', items: ['Vercel — deploy ready', 'GitHub — PR #482 merged'] },
  { title: 'Archived', count: 13, color: '#525252', items: ['Stripe payout · Newsletter · Receipts'] },
];

const LOGO_NAMES = ['Linear', 'Vercel', 'Figma', 'Stripe', 'Ramp', 'Notion', 'Loom', 'Arc'];

const TESTIMONIALS = [
  { quote: 'Aura gave our leadership team four hours of their week back. It reads like email from the future.', name: 'Parker Wilf', role: 'Group Product Manager', company: 'MERCURY' },
  { quote: "The command palette alone has changed how I process messages. I can't imagine going back to a traditional client.", name: 'Andrew von Rosenbach', role: 'Senior Engineering Program Manager', company: 'COHERE' },
  { quote: 'Triage that actually understands context. Our team stopped dreading Monday morning inboxes.', name: 'Mathies Christensen', role: 'Engineering Manager', company: 'LUNAR' },
];

const PLANS = [
  {
    tier: 'Free', priceMonthly: 'Free', priceYearly: 'Free',
    desc: 'For creators taking their first steps with Forma.',
    features: ['Up to 3 projects in the cloud', 'Image export up to 1080p', 'Basic editing tools', 'Free templates and icons', 'Access via web and mobile app'],
    pro: false,
  },
  {
    tier: 'Standard', priceMonthly: '$9,99/m', priceYearly: '$99,99/y',
    desc: 'For freelancers and small teams who need more freedom and flexibility.',
    features: ['Up to 50 projects in the cloud', 'Export up to 4K', 'Advanced editing toolkit', 'Team collaboration (up to 5 members)', 'Access to premium template library'],
    pro: false,
  },
  {
    tier: 'Pro', priceMonthly: '$19,99/m', priceYearly: '$199,99/y',
    desc: 'For studios, agencies, and professional creators working with brands.',
    features: ['Unlimited projects', 'Export up to 8K + animations', 'AI-powered content generation tools', 'Unlimited team members', 'Brand customization'],
    pro: true,
  },
];

/* ============================================================
 *  Page
 * ========================================================== */

export default function Aura() {
  const [yearly, setYearly] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="aura-root relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* Inter font + all custom CSS for this page (scoped, injected at runtime) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .aura-root { font-family: 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        .aura-root ::selection { background: rgba(61,129,227,0.3); }

        @keyframes shiny {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shiny { animation: shiny 6s linear infinite; }

        .liquid-glass {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
          position: relative; overflow: hidden;
        }
        .liquid-glass::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }

        /* ----- Pricing section (custom CSS, reproduced exactly) ----- */
        .c3-pricing-section {
          position: relative; padding: 40px 20px 80px; display: flex;
          flex-direction: column; align-items: center; overflow-x: hidden;
        }
        .c3-watermark-container {
          position: relative; width: 100%; max-width: 1100px; text-align: center;
          margin-top: 40px; z-index: 2;
        }
        .c3-watermark-main {
          font-size: 9rem; font-weight: 800; line-height: 0.9; letter-spacing: -0.05em;
          filter: url(#c3-noise-pricing); display: flex; flex-direction: column; align-items: center;
        }
        .c3-watermark-line-1 { color: #fff; }
        .c3-watermark-line-2 {
          background: linear-gradient(to right, #091020 0%, #0B2551 25%, #A4F4FD 65%, #00d2ff 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .c3-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%;
          max-width: 1100px; margin-top: 60px; transform: translateX(20px);
          position: relative; z-index: 3;
        }
        .c3-card {
          background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4));
          backdrop-filter: blur(14px) brightness(0.91); border: 1px solid rgba(255,255,255,1);
          border-radius: 44px; padding: 50px 24px; min-height: 580px;
          display: flex; flex-direction: column; transition: all 0.6s cubic-bezier(.22,1,.36,1);
          overflow: hidden; position: relative;
        }
        .c3-card::before {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
          pointer-events:none;
        }
        .c3-card:hover {
          background: rgba(15,15,15,0.6); border-color: rgba(34,211,238,0.7);
          transform: translateY(-12px) scale(1.01);
        }
        .c3-card-pro { background: linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,0.55)); }
        .c3-tier-small { font-size: 1.1rem; font-weight: 400; color: rgba(255,255,255,0.6); }
        .c3-tier-large { font-size: 2.8rem; font-weight: 500; letter-spacing: -0.02em; color: #fff; margin-top: 8px; }
        .c3-desc {
          font-size: 0.88rem; color: rgba(255,255,255,0.45); min-height: 3.2em;
          margin-top: 16px; margin-bottom: 40px; line-height: 1.5;
        }
        .c3-list { list-style: none; padding: 0; margin: 0; }
        .c3-list li {
          display:flex; align-items:flex-start; gap: 14px; font-size: 0.92rem;
          color: rgba(255,255,255,0.8); margin-bottom: 18px; line-height: 1.4;
        }
        .c3-check {
          width:28px; height:28px; border-radius:50%; background: rgba(255,255,255,0.15);
          display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .c3-btn {
          background:#fff; color:#000; padding: 10px 32px; border-radius: 100px; font-weight:600;
          font-size: 0.88rem; margin-top:auto; border:none; cursor:pointer; align-self:center;
          transition: all 0.3s cubic-bezier(.22,1,.36,1);
        }
        .c3-btn:hover { background:#f5f5f5; transform:scale(1.02); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }
        .c3-toggle-wrap {
          display:flex; align-items:center; justify-content:flex-end; gap:12px; width:100%;
          max-width:1100px; margin-top:32px; padding-right:20px;
        }
        .c3-toggle {
          width:52px; height:28px; background:#fff; border-radius:100px; position:relative;
          cursor:pointer; border:none; transition: background 0.3s cubic-bezier(.4,0,.2,1); padding:0;
        }
        .c3-toggle-knob {
          width:20px; height:20px; background:#000; border-radius:50%; position:absolute;
          top:4px; left:4px; transition: all 0.3s cubic-bezier(.4,0,.2,1);
        }
        .c3-toggle.active { background: rgba(255,255,255,0.2); }
        .c3-toggle.active .c3-toggle-knob { transform: translateX(24px); background:#fff; }

        @media (max-width: 1024px) {
          .c3-watermark-main { font-size: 3.5rem; filter:none; }
          .c3-watermark-line-2 { background:none; -webkit-text-fill-color:#00d2ff; color:#00d2ff; }
          .c3-grid {
            display:flex; overflow-x:auto; scroll-snap-type:x mandatory; transform:none;
            width:100vw; padding:0 20px; gap:16px; scrollbar-width:none;
          }
          .c3-grid::-webkit-scrollbar { display:none; }
          .c3-card { flex: 0 0 320px; scroll-snap-align:center; }
          .c3-toggle-wrap { justify-content:center; padding-right:0; }
        }
      `}</style>

      {/* Global SVG noise filter (root level, multiply blend — for the shiny headline) */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Global background video (fixed, behind everything) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>

      {/* Hidden-on-mobile vertical guide lines at the 36rem container edges */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      {/* Content wrapper above the video */}
      <div className="relative z-10">
        {/* ===== Section 1 — Navbar ===== */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="flex items-center justify-between py-5">
            <a href="#/" className="flex items-center">
              <LogoMark className="w-8 h-8" />
            </a>

            <div className="hidden md:flex gap-8">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l}
                  href={l === 'Pricing' ? '#pricing' : '#'}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className="text-white/70 text-sm font-medium hover:text-white transition-colors"
                >
                  {l}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:block">
              <AppleButton />
            </div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/80"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mb-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-4 space-y-1">
              {NAV_LINKS.map((l) => (
                <a key={l} href="#" className="block px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5">
                  {l}
                </a>
              ))}
              <div className="pt-2"><AppleButton full /></div>
            </div>
          )}
        </motion.nav>

        {/* ===== Section 2 — Hero ===== */}
        <section className="pt-16 md:pt-28 pb-20 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
          >
            <span className="block text-white">Your email.</span>
            <span className="block animate-shiny" style={gradientStyle}>Revitalized</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
          >
            Aura is the premier inbox platform for the current era. It leverages powerful AI to
            organize, prioritize, and refine your messages into total clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <AppleButton />
            <span className="text-xs text-white/40">Download for Intel / Apple Silicon</span>
          </motion.div>
        </section>

        {/* ===== Section 3 — macOS menu bar strip ===== */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10"
        >
          <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <AppleLogo className="w-3.5 h-3.5" />
              <span className="font-bold text-white">Aura</span>
              {MENU_ITEMS.map((m, i) => (
                <span
                  key={m}
                  className={`text-white/70 ${i > 2 ? 'hidden sm:inline' : ''} ${i > 3 ? 'hidden md:inline' : ''}`}
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Search className="w-3.5 h-3.5" />
              <span>Wed May 6 1:09 PM</span>
            </div>
          </div>
        </motion.div>

        {/* ===== Section 4 — Inbox mockup ===== */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/10">
              <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              <span className="mx-auto text-xs text-white/50">Aura — Inbox</span>
            </div>

            {/* Body */}
            <div className="grid grid-cols-12 h-[520px]">
              {/* Sidebar */}
              <div className="col-span-12 md:col-span-3 border-r border-white/10 bg-black/30 p-4 overflow-y-auto">
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2 hover:bg-white/90 transition">
                  <Sparkles className="w-3.5 h-3.5" /> Compose with Aura
                </button>

                <ul className="mt-4 space-y-0.5">
                  {SIDEBAR_NAV.map((it) => {
                    const Icon = it.icon;
                    return (
                      <li key={it.label}>
                        <div
                          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm ${
                            it.active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="flex-1">{it.label}</span>
                          {it.count != null && (
                            <span className="text-xs text-white/40">{it.count}</span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 px-2.5 mb-2">Labels</div>
                  <div className="space-y-1.5 px-1">
                    {LABELS.map((l) => (
                      <div key={l.name} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                        {l.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message list */}
              <div className="col-span-12 md:col-span-4 border-r border-white/10 overflow-y-auto">
                <div className="flex items-center gap-2 px-4 h-12 border-b border-white/10">
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    placeholder="Search mail"
                    className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1"
                  />
                </div>
                <ul>
                  {MESSAGES.map((m) => (
                    <li
                      key={m.subject}
                      className={`px-4 py-3 border-b border-white/5 cursor-pointer transition-colors ${
                        m.active ? 'bg-white/5' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${m.unread ? 'font-semibold text-white' : 'text-white/80'}`}>
                          {m.name}
                        </span>
                        <span className="text-xs text-white/40">{m.time}</span>
                      </div>
                      <div className="text-sm text-white/70 truncate">{m.subject}</div>
                      <div className="text-xs text-white/40 truncate">{m.preview}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reader */}
              <div className="col-span-12 md:col-span-5 flex flex-col overflow-y-auto">
                <div className="flex items-center gap-1 px-4 h-12 border-b border-white/10">
                  {[Reply, Forward, Archive, Trash2].map((Icon, i) => (
                    <button key={i} className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/70">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/70">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] flex items-center justify-center text-xs font-semibold text-white">
                      L
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Linear</div>
                      <div className="text-xs text-white/40">to me · 9:41 AM</div>
                    </div>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">Work</span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-white">Weekly product digest</h3>

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex items-center gap-2 text-[#A4F4FD] text-xs font-medium">
                      <Sparkles className="w-4 h-4" /> Summary by Aura
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-[1.5]">
                      Your team closed 23 issues, merged 14 PRs, and shipped 2 features. Top
                      contributor: Marcus. No action needed.
                    </p>
                  </div>

                  <div className="mt-4 space-y-3 text-sm text-white/70 leading-[1.6]">
                    <p>Hi team,</p>
                    <p>Here is your weekly digest of everything happening across your projects. This was a strong week with significant progress on the Q3 roadmap.</p>
                    <p>Twenty-three issues were closed, fourteen pull requests were merged, and two customer-facing features went out. The velocity trend continues to climb.</p>
                    <p>Let me know if you would like a deeper breakdown by project or contributor.</p>
                    <p className="text-white/50">— The Linear team</p>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">
                    <Paperclip className="w-3.5 h-3.5" /> digest-may-6.pdf
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== Section 5 — FeatureTriage ===== */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <SectionEyebrow label="Triage" tag="AI-native" />
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
                Clear your inbox <br /> in a single pass.
              </h2>
              <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
                Aura reads every message, understands intent, and routes the noise away from the
                signal. Focus on what moves your day forward — the rest handles itself.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Auto-categorize', 'Snooze for later', 'Silent newsletters', 'One-tap unsubscribe'].map((c) => (
                  <span key={c} className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="liquid-glass rounded-2xl p-5">
              <div className="text-xs text-white/50">Today · 42 messages triaged</div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {TRIAGE.map((t) => (
                  <div key={t.title} className="liquid-glass rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: t.color }}>{t.title}</span>
                      <span className="text-xs text-white/40">{t.count}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {t.items.map((it) => (
                        <li key={it} className="text-xs text-white/60 truncate">{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 6 — LogoCloud ===== */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center text-xs uppercase tracking-widest text-white/40">
            Trusted by the world&apos;s most thoughtful teams
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {LOGO_NAMES.map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors text-center"
              >
                {n}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== Section 7 — Testimonials ===== */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="liquid-glass rounded-2xl p-6">
                <blockquote className="text-sm text-white/80 leading-[1.6]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-white/10">
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                  <div className="text-xs text-white font-semibold tracking-wide mt-1">{t.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ===== Section 8 — Pricing ===== */}
        <section id="pricing" className="c3-pricing-section">
          {/* Pricing SVG noise filter (fractal, overlay blend — watermark grain) */}
          <svg className="absolute h-0 w-0" aria-hidden="true">
            <filter id="c3-noise-pricing">
              <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
              <feComponentTransfer><feFuncA type="linear" slope="0.075" /></feComponentTransfer>
              <feComposite in2="SourceGraphic" operator="in" result="noise" />
              <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
            </filter>
          </svg>

          <div className="c3-watermark-container">
            <div className="c3-watermark-main">
              <span className="c3-watermark-line-1">Your email.</span>
              <span className="c3-watermark-line-2">Revitalized</span>
            </div>
          </div>

          <div className="c3-grid">
            {PLANS.map((p) => (
              <div key={p.tier} className={`c3-card ${p.pro ? 'c3-card-pro' : ''}`}>
                <div className="c3-tier-small">{p.tier}</div>
                <div className="c3-tier-large">{yearly ? p.priceYearly : p.priceMonthly}</div>
                <div className="c3-desc">{p.desc}</div>
                <ul className="c3-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="c3-check">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#fff" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="c3-btn">Choose Plan</button>
              </div>
            ))}
          </div>

          <div className="c3-toggle-wrap">
            <span className="text-sm text-white/70">Yearly</span>
            <button
              className={`c3-toggle ${yearly ? 'active' : ''}`}
              onClick={() => setYearly((v) => !v)}
              aria-label="Toggle yearly billing"
            >
              <span className="c3-toggle-knob" />
            </button>
          </div>
        </section>

        {/* ===== Section 9 — FinalCTA ===== */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)', opacity: 0.3 }}
            />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
                Close the tabs. <br /> Open your day.
              </h2>
              <p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
                Join thousands of builders, founders, and operators who treat email like a tool —
                not an obligation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <AppleButton />
                <button className="rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition inline-flex items-center gap-2">
                  Talk to sales <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
