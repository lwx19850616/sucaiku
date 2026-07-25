import { useRef, useEffect, useState, useCallback } from 'react';

const EFFECTS = [
  { id: 'none', label: '原图', icon: '🖼️' },
  { id: 'noise', label: '噪点', icon: '📊' },
  { id: 'dither', label: '抖动', icon: '⚡' },
  { id: 'pixelate', label: '像素化', icon: '🎮' },
  { id: 'scanlines', label: '扫描线', icon: '📺' },
  { id: 'halftone', label: '半调', icon: '🔘' },
  { id: 'ascii', label: 'ASCII 字符', icon: '🔤' },
  { id: 'glitch', label: '故障', icon: '💥' },
  { id: 'vignette', label: '暗角', icon: '🌑' },
];

const rand = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
};

const STORAGE_KEY = 'sucaiku-texture-presets';

export default function TextureLab() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const origImageRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [effect, setEffect] = useState('noise');
  const [intensity, setIntensity] = useState(50);
  const [scale, setScale] = useState(100);
  const [seed, setSeed] = useState(42);
  const [presets, setPresets] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  });

  const loadImage = (src) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { setImage(img); origImageRef.current = img; setImageSrc(src); };
    img.onerror = () => alert('图片加载失败，请重试');
    img.src = src;
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => loadImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const loadSample = () => loadImage(`https://picsum.photos/seed/texture${seed}/800/600`);

  const process = useCallback(() => {
    const canvas = canvasRef.current;
    const img = origImageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    const maxW = 800;
    const ratio = img.width / img.height;
    const w = Math.min(maxW, img.width) * (scale / 100);
    const h = w / ratio;
    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img, 0, 0, w, h);

    if (effect === 'none') return;
    if (effect === 'ascii') { renderAscii(ctx, w, h, intensity); return; }

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const rng = rand(seed);
    const t = intensity / 100;

    if (effect === 'noise') {
      const noiseAmt = t * 80;
      for (let i = 0; i < data.length; i += 4) {
        const n = (rng() - 0.5) * noiseAmt;
        data[i] = Math.max(0, Math.min(255, data[i] + n));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
      }
    } else if (effect === 'dither') {
      const bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
      const cell = Math.max(2, Math.floor(4 * t) + 1);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const lum = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          const bx = Math.floor(x / cell) % 4, by = Math.floor(y / cell) % 4;
          const threshold = (bayer[by][bx] / 16) * 255;
          const val = lum > threshold ? 255 : 0;
          const blend = t;
          data[idx] = data[idx] * (1 - blend) + val * blend;
          data[idx + 1] = data[idx + 1] * (1 - blend) + val * blend;
          data[idx + 2] = data[idx + 2] * (1 - blend) + val * blend;
        }
      }
    } else if (effect === 'pixelate') {
      const px = Math.max(2, Math.floor(16 * t));
      for (let y = 0; y < h; y += px) {
        for (let x = 0; x < w; x += px) {
          let r = 0, g = 0, b = 0, count = 0;
          for (let dy = 0; dy < px && y + dy < h; dy++) {
            for (let dx = 0; dx < px && x + dx < w; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              r += data[idx]; g += data[idx + 1]; b += data[idx + 2]; count++;
            }
          }
          r /= count; g /= count; b /= count;
          for (let dy = 0; dy < px && y + dy < h; dy++) {
            for (let dx = 0; dx < px && x + dx < w; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              data[idx] = r; data[idx + 1] = g; data[idx + 2] = b;
            }
          }
        }
      }
    } else if (effect === 'scanlines') {
      const gap = Math.max(2, Math.floor(6 * t));
      for (let y = 0; y < h; y++) {
        if (y % (gap * 2) < gap) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            data[idx] *= 0.3; data[idx + 1] *= 0.3; data[idx + 2] *= 0.3;
          }
        }
      }
    } else if (effect === 'halftone') {
      const cell = Math.max(4, Math.floor(10 * t));
      const newData = new Uint8ClampedArray(data.length);
      newData.fill(255);
      for (let y = 0; y < h; y += cell) {
        for (let x = 0; x < w; x += cell) {
          let r = 0, g = 0, b = 0, count = 0;
          for (let dy = 0; dy < cell && y + dy < h; dy++) {
            for (let dx = 0; dx < cell && x + dx < w; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              r += data[idx]; g += data[idx + 1]; b += data[idx + 2]; count++;
            }
          }
          r /= count; g /= count; b /= count;
          const lum = (r + g + b) / 3;
          const radius = (lum / 255) * (cell / 2) * 1.2;
          const cx = x + cell / 2, cy = y + cell / 2;
          for (let dy = 0; dy < cell && y + dy < h; dy++) {
            for (let dx = 0; dx < cell && x + dx < w; dx++) {
              const dist = Math.hypot(dx + x - cx, dy + y - cy);
              if (dist < radius) {
                const idx = ((y + dy) * w + (x + dx)) * 4;
                newData[idx] = r; newData[idx + 1] = g; newData[idx + 2] = b;
              }
            }
          }
        }
      }
      data.set(newData);
    } else if (effect === 'glitch') {
      const shift = Math.floor(t * 20);
      const slices = Math.floor(t * 10);
      for (let i = 0; i < slices; i++) {
        const y0 = Math.floor(rng() * h);
        const sliceH = Math.floor(rng() * h * 0.05) + 2;
        const offset = Math.floor((rng() - 0.5) * shift);
        for (let y = y0; y < Math.min(y0 + sliceH, h); y++) {
          const row = new Uint8ClampedArray(w * 4);
          for (let x = 0; x < w; x++) {
            const srcIdx = (y * w + x) * 4;
            const dstX = Math.max(0, Math.min(w - 1, x + offset));
            row[dstX * 4] = data[srcIdx];
            row[dstX * 4 + 1] = data[srcIdx + 1];
            row[dstX * 4 + 2] = data[srcIdx + 2];
            row[dstX * 4 + 3] = 255;
          }
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            data[idx] = row[x * 4]; data[idx + 1] = row[x * 4 + 1]; data[idx + 2] = row[x * 4 + 2];
          }
        }
      }
    } else if (effect === 'vignette') {
      const cx = w / 2, cy = h / 2;
      const maxDist = Math.hypot(cx, cy);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const dist = Math.hypot(x - cx, y - cy) / maxDist;
          const vignette = 1 - dist * t * 1.2;
          data[idx] *= vignette; data[idx + 1] *= vignette; data[idx + 2] *= vignette;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [effect, intensity, scale, seed]);

  useEffect(() => {
    if (image) process();
  }, [image, process]);

  const renderAscii = (ctx, w, h, intensity) => {
    const t = intensity / 100;
    const chars = '@%#*+=-:. ';
    const cell = Math.max(4, Math.floor(8 * t) + 3);
    const cols = Math.floor(w / cell);
    const rows = Math.floor(h / cell);
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#e5e7eb';
    ctx.font = `${cell}px monospace`;
    ctx.textBaseline = 'top';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x0 = c * cell, y0 = r * cell;
        let sum = 0, cnt = 0;
        for (let yy = 0; yy < cell && y0 + yy < h; yy += 2) {
          for (let xx = 0; xx < cell && x0 + xx < w; xx += 2) {
            const idx = ((y0 + yy) * w + (x0 + xx)) * 4;
            sum += (data[idx] + data[idx + 1] + data[idx + 2]) / 3; cnt++;
          }
        }
        const lum = cnt ? sum / cnt : 0;
        const ch = chars[Math.floor((1 - lum / 255) * (chars.length - 1))];
        ctx.fillText(ch, x0, y0);
      }
    }
  };

  const exportPNG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `texture-${effect}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const savePreset = () => {
    const name = window.prompt('预设名称', `${EFFECTS.find((e) => e.id === effect)?.label || effect} ${intensity}%`);
    if (!name) return;
    const next = [...presets, { name, effect, intensity, scale, seed }];
    setPresets(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const applyPreset = (p) => {
    setEffect(p.effect); setIntensity(p.intensity); setScale(p.scale); setSeed(p.seed);
  };

  const deletePreset = (i) => {
    const next = presets.filter((_, idx) => idx !== i);
    setPresets(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="flex h-full">
      {/* 左侧：设置 */}
      <aside className="w-60 shrink-0 overflow-y-auto border-r border-white/10 bg-black/20 py-4 text-sm">
        <Section title="效果">
          <div className="space-y-1 px-2">
            {EFFECTS.map((e) => (
              <button
                key={e.id}
                onClick={() => setEffect(e.id)}
                className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${effect === e.id ? 'bg-cyan-400/20 text-cyan-300' : 'text-white/70 hover:bg-white/10'}`}
              >
                {e.icon} {e.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="参数">
          <div className="space-y-4 px-3">
            <Range label="强度" value={intensity} min={0} max={100} suffix="%" onChange={setIntensity} />
            <Range label="缩放" value={scale} min={10} max={100} suffix="%" onChange={setScale} />
            <Range label="随机种子" value={seed} min={1} max={100} onChange={setSeed} />
          </div>
        </Section>

        <Section title="预设">
          <div className="space-y-2 px-2">
            <button onClick={savePreset} className="w-full rounded-lg bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-cyan-400">＋ 保存当前为预设</button>
            {presets.length === 0 && <p className="px-1 text-xs text-white/30">暂无预设</p>}
            {presets.map((p, i) => (
              <div key={i} className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1">
                <button onClick={() => applyPreset(p)} className="flex-1 truncate text-left text-xs text-white/80 hover:text-cyan-300">{p.name}</button>
                <button onClick={() => deletePreset(i)} className="text-xs text-red-300 hover:text-red-200">✕</button>
              </div>
            ))}
          </div>
        </Section>
      </aside>

      {/* 中间：画布 */}
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center overflow-auto bg-black p-4">
          {image ? (
            <canvas ref={canvasRef} className="max-w-full rounded-lg border border-white/10" style={{ imageRendering: effect === 'pixelate' ? 'pixelated' : 'auto' }} />
          ) : (
            <div className="text-center">
              <div className="mb-4 text-6xl">🧪</div>
              <p className="mb-4 text-white/60">上传图片或加载示例图，然后套用特效</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400">📁 上传图片</button>
                <button onClick={loadSample} className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20">🖼️ 加载示例</button>
              </div>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>

        {image && (
          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-2">
            <button onClick={() => fileInputRef.current?.click()} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20">换图</button>
            <button onClick={loadSample} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20">🎲 换示例</button>
            <div className="mx-2 h-5 w-px bg-white/20" />
            <button onClick={exportPNG} className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-black hover:bg-cyan-400">📷 导出 PNG</button>
          </div>
        )}
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-3">
      <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">{title}</div>
      {children}
    </div>
  );
}

function Range({ label, value, min, max, step = 1, suffix = '', onChange }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-white/80"><span>{label}</span><span className="text-white/50">{value}{suffix}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-cyan-400" />
    </div>
  );
}
