import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';
const SPOTLIGHT_R = 260;

/**
 * RevealLayer — draws a radial-gradient mask on a hidden canvas and applies it
 * to the reveal <div> so the second image only shows inside the soft circle
 * that trails the cursor.
 *
 * Coordinate mapping is computed from the div's own bounding rect, so the
 * spotlight stays pixel-aligned with the cursor even though this page sits
 * inside the app shell (sidebar offset on the left). The spec sized the canvas
 * to window.innerWidth/Height; we size it to the div instead for correctness.
 */
function RevealLayer({ image, cursorX, cursorY }) {
  const canvasRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const div = revealRef.current;
    if (!canvas || !div) return;
    const resize = () => {
      const r = div.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const div = revealRef.current;
    if (!canvas || !div) return;
    const r = div.getBoundingClientRect();
    const lx = cursorX - r.left;
    const ly = cursorY - r.top;
    canvas.width = r.width;
    canvas.height = r.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, SPOTLIGHT_R);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(lx, ly, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();
    const url = canvas.toDataURL();
    div.style.webkitMaskImage = `url(${url})`;
    div.style.maskImage = `url(${url})`;
  }, [cursorX, cursorY, image]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" style={{ display: 'none' }} />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
      />
    </>
  );
}

export default function Lithos() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);
    const loop = () => {
      const nx = smooth.current.x + (mouse.current.x - smooth.current.x) * 0.1;
      const ny = smooth.current.y + (mouse.current.y - smooth.current.y) * 0.1;
      const dx = Math.abs(nx - smooth.current.x);
      const dy = Math.abs(ny - smooth.current.y);
      smooth.current.x = nx;
      smooth.current.y = ny;
      // Only push a state update while the eased value is still moving, so the
      // canvas mask stops regenerating once the cursor comes to rest (perf).
      if (dx > 0.4 || dy > 0.4) setCursorPos({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        @keyframes heroReveal { 0%{opacity:0;transform:translateY(28px);filter:blur(12px)} 100%{opacity:1;transform:translateY(0);filter:blur(0)} }
        @keyframes heroFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }
        .hero-anim { opacity:0; animation-fill-mode:forwards; animation-timing-function:cubic-bezier(0.16,1,0.3,1); }
        .hero-reveal { animation-name:heroReveal; animation-duration:1.1s; }
        .hero-fade { animation-name:heroFadeUp; animation-duration:1s; }
        .hero-zoom { animation:heroZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }
        @media (prefers-reduced-motion: reduce){ .hero-anim,.hero-zoom{ animation:none; opacity:1; } }
      `}</style>

      <section className="relative h-screen w-full overflow-hidden bg-black" style={{ height: '100dvh' }}>
        {/* 1. Base image */}
        <div
          className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* 2. Reveal layer (cursor spotlight) */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* 3. Heading */}
        <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
          <h1 className="leading-[0.95] text-white">
            <span
              className="hero-anim hero-reveal block font-playfair font-normal italic text-5xl sm:text-7xl md:text-8xl"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Layers hold
            </span>
            <span
              className="hero-anim hero-reveal -mt-1 block font-normal text-5xl sm:text-7xl md:text-8xl"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        {/* 4. Bottom-left paragraph */}
        <div
          className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[260px] sm:block"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm leading-relaxed text-white/80">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered
            across millions of years beneath us.
          </p>
        </div>

        {/* 5. Bottom-right block */}
        <div
          className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to
            shape the ground beneath your feet.
          </p>
          <button className="rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95">
            Start Digging
          </button>
        </div>

        {/* Navigation — rendered absolute (not fixed) so it sits inside the app
            shell and does not cover the global top nav bar */}
        <nav className="absolute left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
            </svg>
            <span className="font-playfair text-2xl italic text-white">Lithos</span>
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
            <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white">Course</button>
            <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
              Field Guides
            </button>
            <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
              Geology
            </button>
            <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
              Plans
            </button>
            <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
              Live Tour
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 md:block">
              Sign Up
            </button>
            <button className="text-white md:hidden" aria-label="Menu">
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </section>
    </div>
  );
}
