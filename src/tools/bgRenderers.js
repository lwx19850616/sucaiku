// 背景工作室 — 画布渲染器（支持多种背景效果，可调参数）
// 每种效果接收 { ctx, w, h, t, color, speed, scale, noise, rotation } 绘制一帧

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToStr = (rgb, a = 1) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

// 伪随机噪声
const rand = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
};

const smoothNoise = (x, y, t) => {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = Math.sin(ix * 12.9898 + iy * 78.233 + t * 0.1) * 43758.5453;
  const b = Math.sin((ix + 1) * 12.9898 + iy * 78.233 + t * 0.1) * 43758.5453;
  const c = Math.sin(ix * 12.9898 + (iy + 1) * 78.233 + t * 0.1) * 43758.5453;
  const d = Math.sin((ix + 1) * 12.9898 + (iy + 1) * 78.233 + t * 0.1) * 43758.5453;
  const v1 = a - Math.floor(a), v2 = b - Math.floor(b), v3 = c - Math.floor(c), v4 = d - Math.floor(d);
  return v1 + (v2 - v1) * ux + (v3 - v1) * uy + (v1 - v2 - v3 + v4) * ux * uy;
};

export const RENDERERS = {
  silk: {
    name: '丝绸', desc: '流动的丝绸波纹',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0005 * speed;
      const s = Math.max(scale, 0.1);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      const size = Math.max(w, h) * s;
      for (let i = 0; i < 5; i++) {
        const yOff = (i / 5) * h * 1.2 - h * 0.1;
        const grad = ctx.createLinearGradient(0, yOff, 0, yOff + h * 0.8);
        grad.addColorStop(0, rgbToStr([r, g, b], 0));
        grad.addColorStop(0.5, rgbToStr([r, g, b], 0.3 + i * 0.08));
        grad.addColorStop(1, rgbToStr([r, g, b], 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        const n = Math.floor(w / 8);
        for (let j = 0; j <= n; j++) {
          const x = (j / n) * w;
          const nVal = smoothNoise(x * 0.008 + i * 10, yOff * 0.01, time + i * 100) * 2 - 1;
          const y = yOff + nVal * h * 0.15 * noise + Math.sin(x * 0.01 + time * 2 + i * 3) * h * 0.03;
          if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h * 2); ctx.lineTo(0, h * 2);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    },
  },
  aurora: {
    name: '极光', desc: '渐变极光光带',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0003 * speed;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      const bands = 4;
      for (let i = 0; i < bands; i++) {
        const phase = time + (i / bands) * Math.PI * 2;
        const yBase = h * 0.15 + (i / bands) * h * 0.7;
        const amplitude = h * 0.06 * scale;
        const grad = ctx.createLinearGradient(0, yBase - amplitude * 3, 0, yBase + amplitude * 3);
        grad.addColorStop(0, rgbToStr([r, g, b], 0));
        grad.addColorStop(0.5, rgbToStr([r, g, b], 0.35 + i * 0.1));
        grad.addColorStop(1, rgbToStr([r, g, b], 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const n1 = smoothNoise(x * 0.006 + i * 20, i * 50, time * 0.5 + i * 50);
          const y = yBase + Math.sin(x * 0.012 + phase) * amplitude + n1 * amplitude * noise * 0.8;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        for (let x = w; x >= 0; x -= 4) {
          const n1 = smoothNoise(x * 0.006 + i * 20, i * 50 + 100, time * 0.5 + i * 50);
          const y = yBase + Math.sin(x * 0.012 + phase) * amplitude + n1 * amplitude * noise * 0.8 + amplitude * 2;
          ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    },
  },
  grid: {
    name: '网格', desc: '动态网格线条',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0005 * speed;
      const cellSize = Math.max(30, 60 * scale);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      ctx.lineWidth = 1;
      const n = noise * 0.5;
      for (let x = -cellSize; x < w + cellSize; x += cellSize) {
        const v = Math.sin(x * 0.01 + time) * n;
        ctx.strokeStyle = rgbToStr([r, g, b], 0.1 + Math.abs(v) * 0.15);
        ctx.beginPath(); ctx.moveTo(x, -h); ctx.lineTo(x, h * 2); ctx.stroke();
      }
      for (let y = -cellSize; y < h + cellSize; y += cellSize) {
        const v = Math.cos(y * 0.01 + time * 1.3) * n;
        ctx.strokeStyle = rgbToStr([r, g, b], 0.1 + Math.abs(v) * 0.15);
        ctx.beginPath(); ctx.moveTo(-w, y); ctx.lineTo(w * 2, y); ctx.stroke();
      }
      ctx.restore();
    },
  },
  dotGrid: {
    name: '点网格', desc: '流动的点阵',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0005 * speed;
      const gap = Math.max(15, 25 * scale);
      const cols = Math.ceil(w / gap) + 2, rows = Math.ceil(h / gap) + 2;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      for (let c = 0; c < cols; c++) {
        for (let r2 = 0; r2 < rows; r2++) {
          const x = c * gap, y = r2 * gap;
          const dist = Math.hypot(x - w / 2, y - h / 2);
          const n = smoothNoise(x * 0.01, y * 0.01, time + dist * 0.001) * 2 - 1;
          const alpha = 0.05 + Math.abs(n) * noise * 0.4 + Math.sin(dist * 0.005 + time * 2) * 0.1;
          const size = 1.5 + n * 1.5;
          ctx.fillStyle = rgbToStr([r, g, b], Math.max(0.02, alpha));
          ctx.beginPath(); ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.restore();
    },
  },
  waves: {
    name: '波浪', desc: '正弦波浪线条',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0004 * speed;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      const lines = 12;
      for (let i = 0; i < lines; i++) {
        const phase = time + (i / lines) * Math.PI * 2;
        const yBase = h * 0.1 + (i / lines) * h * 0.8;
        const amp = h * 0.04 * scale;
        ctx.strokeStyle = rgbToStr([r, g, b], 0.15 + (i / lines) * 0.15);
        ctx.lineWidth = 1.5 + (i / lines) * 1.5;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const n = smoothNoise(x * 0.008 + i * 15, i * 30, time * 0.3 + i * 30);
          const y = yBase + Math.sin(x * 0.015 + phase * 2) * amp + n * amp * noise * 0.6;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    },
  },
  particles: {
    name: '粒子', desc: '漂浮粒子场',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0002 * speed;
      const count = Math.floor(80 * scale);
      const seed = 42;
      const rng = rand(seed);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      for (let i = 0; i < count; i++) {
        const x0 = rng() * w, y0 = rng() * h, size0 = rng() * 3 + 1;
        const x = (x0 + Math.sin(time + i) * 30 + w) % w;
        const y = (y0 + Math.cos(time * 1.2 + i * 0.7) * 30 + h) % h;
        const n = smoothNoise(x * 0.005, y * 0.005, time * 0.5 + i * 50);
        const alpha = 0.1 + n * noise * 0.5 + Math.sin(time * 2 + i) * 0.15;
        const size = size0 * (0.5 + n * noise * 0.5);
        ctx.fillStyle = rgbToStr([r, g, b], Math.max(0.02, Math.min(alpha, 0.6)));
        ctx.beginPath(); ctx.arc(x, y, Math.max(0.3, size), 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  },
  plasma: {
    name: '等离子', desc: '等离子色彩波',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0003 * speed;
      const cell = Math.max(6, 12 / scale);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      for (let x = 0; x < w; x += cell) {
        for (let y = 0; y < h; y += cell) {
          const v1 = Math.sin(x * 0.01 + time * 2) * 2;
          const v2 = Math.sin(y * 0.008 + time * 1.5) * 2;
          const v3 = Math.sin((x + y) * 0.007 + time) * 2;
          const v4 = Math.sin(Math.hypot(x - w / 2, y - h / 2) * 0.015 + time) * 2;
          const val = (v1 + v2 + v3 + v4) / 8 + 0.5;
          const n = smoothNoise(x * 0.01, y * 0.01, time * 0.3);
          const alpha = Math.min(0.5, val * (0.3 + noise * 0.3 + n * 0.1));
          ctx.fillStyle = rgbToStr([r, g, b], alpha);
          ctx.fillRect(x, y, cell - 0.5, cell - 0.5);
        }
      }
      ctx.restore();
    },
  },
  gradientBlinds: {
    name: '渐变百叶', desc: '垂直渐变条纹',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0004 * speed;
      const barCount = Math.floor(15 * scale);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      const barW = w / barCount;
      for (let i = 0; i < barCount; i++) {
        const x = i * barW;
        const n = smoothNoise(i * 5, 0, time + i * 30);
        const alpha = 0.1 + n * noise * 0.5;
        const grad = ctx.createLinearGradient(x, 0, x + barW, 0);
        grad.addColorStop(0, rgbToStr([r, g, b], 0));
        grad.addColorStop(0.5, rgbToStr([r, g, b], alpha));
        grad.addColorStop(1, rgbToStr([r, g, b], 0));
        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, barW, h);
      }
      ctx.restore();
    },
  },
  noise: {
    name: '噪点', desc: '动态噪点场',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0003 * speed;
      const cell = Math.max(4, 8 / scale);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      for (let x = 0; x < w; x += cell) {
        for (let y = 0; y < h; y += cell) {
          const n = smoothNoise(x * 0.02, y * 0.02, time + x * 0.001 + y * 0.001);
          const alpha = n * noise * 0.8;
          if (alpha > 0.05) {
            ctx.fillStyle = rgbToStr([r, g, b], alpha);
            ctx.fillRect(x, y, cell - 0.5, cell - 0.5);
          }
        }
      }
      ctx.restore();
    },
  },
  radar: {
    name: '雷达', desc: '旋转雷达扫描',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0005 * speed;
      const cx = w / 2, cy = h / 2;
      const maxR = Math.min(w, h) * 0.4 * scale;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.clearRect(-w, -h, w * 2, h * 2);
      // 网格
      ctx.strokeStyle = rgbToStr([r, g, b], 0.1);
      ctx.lineWidth = 0.5;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath(); ctx.arc(0, 0, maxR * (i / 4), 0, Math.PI * 2); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(-maxR, 0); ctx.lineTo(maxR, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -maxR); ctx.lineTo(0, maxR); ctx.stroke();
      // 扫描扇形
      const sweepAngle = (time * 30) % (Math.PI * 2);
      const grad = ctx.createConicGradient(sweepAngle, 0, 0);
      grad.addColorStop(0, rgbToStr([r, g, b], 0.4));
      grad.addColorStop(0.25, rgbToStr([r, g, b], 0.1));
      grad.addColorStop(0.3, rgbToStr([r, g, b], 0));
      grad.addColorStop(1, rgbToStr([r, g, b], 0));
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, maxR, 0, Math.PI * 2); ctx.fill();
      // 光点
      for (let i = 0; i < 5; i++) {
        const a = time * 2 + (i * Math.PI * 2) / 5;
        const dist = maxR * (0.3 + (i % 3) * 0.2);
        const px = Math.cos(a) * dist, py = Math.sin(a) * dist;
        const pn = smoothNoise(px * 0.01, py * 0.01, time * 0.5);
        ctx.fillStyle = rgbToStr([r, g, b], 0.3 + pn * noise * 0.4);
        ctx.beginPath(); ctx.arc(px, py, 2 + pn * 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  },
  dither: {
    name: '抖动', desc: '有序抖动纹理',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0004 * speed;
      const cell = Math.max(3, 6 / scale);
      const bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      for (let x = 0; x < w; x += cell) {
        for (let y = 0; y < h; y += cell) {
          const bx = Math.floor(x / cell) % 4, by = Math.floor(y / cell) % 4;
          const threshold = bayer[by][bx] / 16;
          const n = smoothNoise(x * 0.01, y * 0.01, time * 0.5);
          const val = n + Math.sin(x * 0.01 + time) * 0.1;
          if (val > threshold * (0.5 + noise * 0.5)) {
            ctx.fillStyle = rgbToStr([r, g, b], 0.3);
            ctx.fillRect(x, y, cell - 0.5, cell - 0.5);
          }
        }
      }
      ctx.restore();
    },
  },
  lightning: {
    name: '闪电', desc: '随机闪电流',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0003 * speed;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      const bolts = 5;
      for (let i = 0; i < bolts; i++) {
        const x1 = (w * (i + 0.5)) / bolts + Math.sin(time * 5 + i * 100) * 30;
        const x2 = x1 + (smoothNoise(i * 100, 0, time * 3 + i * 200) - 0.5) * w * 0.3;
        const midX = (x1 + x2) / 2 + (smoothNoise(i * 50, 100, time * 4 + i * 300) - 0.5) * w * 0.2;
        const midY = h * 0.4 + (smoothNoise(i * 70, 200, time * 2 + i * 400) - 0.5) * h * 0.3;
        ctx.strokeStyle = rgbToStr([r, g, b], 0.3 + Math.sin(time * 8 + i) * 0.15 * noise);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, -10);
        ctx.lineTo(midX, midY);
        ctx.lineTo(x2, h + 10);
        ctx.stroke();
      }
      ctx.restore();
    },
  },
  lightRays: {
    name: '光线', desc: '放射光线',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0003 * speed;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.clearRect(-w, -h, w * 2, h * 2);
      const rays = 12;
      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2 + time;
        const n = smoothNoise(i * 20, 0, time * 0.5 + i * 50);
        const alpha = 0.05 + n * noise * 0.2;
        const len = Math.max(w, h) * scale;
        const grad = ctx.createLinearGradient(0, 0, Math.cos(angle) * len, Math.sin(angle) * len);
        grad.addColorStop(0, rgbToStr([r, g, b], alpha));
        grad.addColorStop(1, rgbToStr([r, g, b], 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, len, angle - 0.12, angle + 0.12);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    },
  },
  floatingLines: {
    name: '浮线', desc: '漂浮的线条',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0004 * speed;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.clearRect(-w, -h, w * 3, h * 3);
      const lines = 20;
      for (let i = 0; i < lines; i++) {
        const seed = i * 137.5;
        const x1 = w * (0.1 + (i % 5) * 0.2) + Math.sin(time + seed) * 40;
        const y1 = h * (0.1 + (i % 4) * 0.25) + Math.cos(time * 1.2 + seed) * 40;
        const x2 = x1 + (smoothNoise(seed, 0, time + seed * 50) - 0.5) * w * 0.4;
        const y2 = y1 + (smoothNoise(seed, 100, time * 1.3 + seed * 80) - 0.5) * h * 0.4;
        const n = smoothNoise(seed, 200, time * 0.3 + seed * 100);
        ctx.strokeStyle = rgbToStr([r, g, b], 0.1 + n * noise * 0.25);
        ctx.lineWidth = 1 + n * 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(
          (x1 + x2) / 2 + (smoothNoise(seed, 300, time * 0.5 + seed * 120) - 0.5) * 60,
          (y1 + y2) / 2 + (smoothNoise(seed, 400, time * 0.6 + seed * 150) - 0.5) * 60,
          x2, y2
        );
        ctx.stroke();
      }
      ctx.restore();
    },
  },
  galaxy: {
    name: '星系', desc: '旋转星系',
    render(ctx, w, h, t, { color, speed, scale, noise, rotation }) {
      const [r, g, b] = hexToRgb(color);
      const time = t * 0.0003 * speed;
      const cx = w / 2, cy = h / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.clearRect(-w, -h, w * 2, h * 2);
      const arms = 3;
      for (let i = 0; i < 200; i++) {
        const arm = i % arms;
        const angle = (i / 200) * Math.PI * 4 + time * (arm === 0 ? 1 : arm === 1 ? -0.8 : 0.9);
        const dist = (i / 200) * Math.min(w, h) * 0.4 * scale;
        const spread = 15 + (i / 200) * 30;
        const px = Math.cos(angle + (arm * Math.PI * 2) / arms) * dist + (Math.sin(time * 3 + i) * spread * noise) / 2;
        const py = Math.sin(angle + (arm * Math.PI * 2) / arms) * dist * 0.4 + (Math.cos(time * 2.5 + i) * spread * noise) / 2;
        const alpha = Math.max(0.02, 0.3 - (i / 200) * 0.25 + Math.sin(time * 4 + i) * 0.1);
        const size = 1.5 + Math.sin(time * 5 + i * 3) * 0.5;
        ctx.fillStyle = rgbToStr([r, g, b], alpha);
        ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
  },
};

// 参数定义（每个效果的通用可调参数）
export const PARAM_DEFS = [
  { key: 'speed', label: '速度', min: 0, max: 5, step: 0.1, default: 1.0 },
  { key: 'scale', label: '缩放', min: 0.1, max: 3, step: 0.05, default: 1.0 },
  { key: 'color', label: '颜色', type: 'color', default: '#0ea5e9' },
  { key: 'noise', label: '噪点强度', min: 0, max: 2, step: 0.05, default: 1.0 },
  { key: 'rotation', label: '旋转', min: -180, max: 180, step: 1, default: 0 },
];

export const BG_LIST = Object.keys(RENDERERS).map((key) => ({
  key,
  name: RENDERERS[key].name,
  desc: RENDERERS[key].desc,
}));
