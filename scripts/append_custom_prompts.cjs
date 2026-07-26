const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', 'src', 'data', 'motionsitesPrompts.json');
const data = JSON.parse(fs.readFileSync(out, 'utf8'));

const auraPrompt = `Build a premium, AI-native email client landing page called "Aura" using **React 18 + TypeScript + Vite + Tailwind CSS + motion/react (framer motion) + lucide-react**. The aesthetic is dark (bg \`#0c0c0c\`), cinematic, glassy, with a looping fullscreen background video, a shiny gradient headline, a macOS-style menu bar, a realistic inbox mockup, and a custom "liquid-glass" card treatment.

## Stack / setup

- \`package.json\` dependencies: \`react\`, \`react-dom\`, \`@supabase/supabase-js\`, \`motion\` (v12+, import from \`motion/react\`), \`lucide-react\`.
- Tailwind config extends colors with \`brand: '#3D81E3'\` and fontFamily sans with \`['Inter','system-ui','sans-serif']\`.
- Font: Google Fonts Inter weights 400, 500, 600, 700, 800, 900. Import in \`index.css\` via \`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');\`.
- \`html,body { font-family: 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }\`.
- Background color base \`#0c0c0c\`, text white, selection \`bg-brand/30\`.

## Global background video (fixed, behind everything)

Inside the root wrapper (\`relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white\`), render a fixed full-screen video:

\`\`\`
<div className="fixed inset-0 z-0 pointer-events-none">
  <video autoPlay loop muted playsInline
    className="w-full h-full object-cover pointer-events-none"
    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" />
</div>
\`\`\`

Also render two hidden-on-mobile fixed vertical guide lines at the 36rem container edges.

## Global SVG noise filters (two)

Root filter with \`id="c3-noise"\` and pricing filter with \`id="c3-noise"\` (multiply vs overlay blend).

## Shared primitives

**AppleLogo**, **LogoMark**, **AppleButton**, **SectionEyebrow**, **gradientStyle** for the shiny headline word "Revitalized", and \`.animate-shiny\` keyframes.

## Liquid-glass utility

Custom \`.liquid-glass\` class with gradient border mask.

## Sections

1. Navbar — LogoMark only, centered links, AppleButton download.
2. Hero — "Your email." / "Revitalized" shiny gradient headline, subtitle, CTA.
3. macOS menu bar strip — full-width blur bar.
4. Inbox mockup — realistic 3-column email client with AI summary.
5. FeatureTriage — AI-native triage with liquid-glass cards.
6. LogoCloud — trusted-by logos.
7. Testimonials — 3 glass cards.
8. Pricing — cinematic custom CSS pricing with yearly toggle, watermark headline.
9. FinalCTA — radial glow glass card.

Reproduce exactly — fonts, gradient stops, noise filters, copy strings, animation delays, and the CloudFront video URL.`;

const lithosPrompt = `Build a full-screen, dark-themed hero section for a geology brand called **Lithos**, using **React 18 + TypeScript + Vite + Tailwind CSS** and **lucide-react** for icons. The signature feature is a **cursor-following spotlight that reveals a second image** through a soft circular mask on top of a base image.

### Fonts
Add this to the top of \`src/index.css\`:
\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');
* { font-family: 'Inter', sans-serif; }
.font-playfair { font-family: 'Playfair Display', serif; }
\`\`\`

### Asset URLs
- Base image: \`https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85\`
- Reveal image: \`https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85\`

### Layout
Root wrapper: \`min-h-screen bg-white tracking-[-0.02em]\`.
Section: \`relative w-full overflow-hidden h-screen bg-black\` with \`100dvh\`.
Layers: base image (z-10), reveal layer (z-30), heading (z-50), bottom-left paragraph (z-50), bottom-right block (z-50).

### Cursor spotlight reveal
\`SPOTLIGHT_R = 260\`. Track mouse with refs and RAF lerp (0.1). \`RevealLayer\` uses a hidden canvas to draw a radial gradient mask, then applies it via \`maskImage\` on the reveal div.

### Navigation
Fixed top nav with SVG logo + wordmark "Lithos", center pill menu (Course active + Field Guides, Geology, Plans, Live Tour), right Sign Up button.

### Animations
\`heroReveal\`, \`heroFadeUp\`, \`heroZoom\` keyframes. Apply to base image, heading lines, bottom paragraphs with delays 0.25s / 0.42s / 0.7s / 0.85s. Respect prefers-reduced-motion.

### Responsiveness
Heading scales 5xl→7xl→8xl. Center nav and desktop Sign Up hidden below md. Bottom-left hidden on mobile. Use 100dvh.`;

const custom = [
  {
    id: 'aura-email-client',
    title: 'Aura',
    category: 'Email Client Landing Page',
    image_preview_url: null,
    video_preview_url: null,
    is_free: false,
    type: 'landing',
    page_type: 'landing',
    types: null,
    sort_order: -10,
    row_span: 1,
    has_assets: false,
    prompt_text: auraPrompt,
    replicated: true,
    route: '/pages/aura',
  },
  {
    id: 'lithos-geology-hero',
    title: 'Lithos',
    category: 'Geology Hero Section',
    image_preview_url: null,
    video_preview_url: null,
    is_free: false,
    type: 'hero',
    page_type: 'hero',
    types: null,
    sort_order: -20,
    row_span: 1,
    has_assets: false,
    prompt_text: lithosPrompt,
    replicated: true,
    route: '/pages/lithos',
  },
];

// remove duplicates if re-running
const filtered = data.filter(d => !custom.find(c => c.id === d.id));
const combined = [...custom, ...filtered];

fs.writeFileSync(out, JSON.stringify(combined, null, 2));
console.log(`appended ${custom.length} custom prompts, total ${combined.length}`);
