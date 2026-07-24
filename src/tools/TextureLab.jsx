import { useRef, useEffect, useState, useCallback } from 'react';

const EFFECTS = [
  { id: 'none', label: '原图', icon: '🖼️' },
  { id: 'noise', label: '噪点', icon: '📊' },
  { id: 'dither', label: '抖动', icon: '⚡' },
  { id: 'pixelate', label: '像素化', icon: '🎮' },
  { id: 'scanlines', label: '扫描线', icon: '📺' },
  { id: 'halftone', label: '半调', icon: '🔘' },
  { id: 'glitch', label: '故障', icon: '💥' },
  { id: 'vignette', label: '暗角', icon: '🌑' },
];

const rand = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
};

export default function TextureLab() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [effect, setEffect] = useState('noise');
  const [intensity, setIntensity] = useState(50);
  const [scale, setScale] = useState(100);
  const [seed, setSeed] = useState(42);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const origImageRef = useRef(null);

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

    // 绘制原图
    ctx.drawImage(img, 0, 0, w, h);

    if (effect === 'none') return;

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
    if (image) { setProcessing(true); process(); setProcessing(false); }
  }, [image, process]);

  const exportPNG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `texture-${effect}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex h-full">
      {/* 左侧：效果选择 */}
      <div className="w-44 shrink-0 overflow-y-auto border-r border-white/10 bg-black/20 py-4">
        <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">效果</div>
        <div className="space-y-1 px-2">
          {EFFECTS.map((e) => (
            <button
              key={e.id}
              onClick={() => setEffect(e.id)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                effect === e.id ? 'bg-cyan-400/20 text-cyan-300' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              {e.icon} {e.label}
            </button>
          ))}
        </div>
      </div>

      {/* 中间：画布 */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center overflow-auto bg-black p-4">
          {image ? (
            <canvas ref={canvasRef} className="max-w-full rounded-lg border border-white/10" style={{ imageRendering: effect === 'pixelate' ? 'pixelated' : 'auto' }} />
          ) : (
            <div className="text-center">
              <div className="mb-4 text-6xl">🧪</div>
              <p className="mb-4 text-white/60">上传图片或加载示例图</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400">📁 上传图片</button>
                <button onClick={loadSample} className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20">🖼️ 加载示例</button>
              </div>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>

        {image && (
          <div className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-2">
            <button onClick={() => fileInputRef.current?.click()} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20">换图</button>
            <button onClick={loadSample} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20">🎲 换示例</button>
            <div className="mx-2 h-5 w-px bg-white/20" />
            <button onClick={exportPNG} className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-black hover:bg-cyan-400">📷 导出 PNG</button>
          </div>
        )}
      </div>

      {/* 右侧：参数 */}
      {image && (
        <div className="w-52 shrink-0 border-l border-white/10 bg-black/20 py-4">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">参数</div>
          <div className="space-y-4 px-3">
            <div>
              <div className="mb-1 flex justify-between"><span className="text-sm text-white/80">强度</span><span className="text-xs text-white/50">{intensity}%</span></div>
              <input type="range" min={0} max={100} value={intensity} onChange={(e) => setIntensity(+e.target.value)} className="w-full accent-cyan-400" />
            </div>
            <div>
              <div className="mb-1 flex justify-between"><span className="text-sm text-white/80">缩放</span><span className="text-xs text-white/50">{scale}%</span></div>
              <input type="range" min={10} max={100} value={scale} onChange={(e) => setScale(+e.target.value)} className="w-full accent-cyan-400" />
            </div>
            <div>
              <div className="mb-1 flex justify-between"><span className="text-sm text-white/80">随机种子</span><span className="text-xs text-white/50">{seed}</span></div>
              <input type="range" min={1} max={100} value={seed} onChange={(e) => setSeed(+e.target.value)} className="w-full accent-cyan-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
