import { useRef, useEffect, useState, useCallback } from 'react';

const SHAPES = [
  { id: 'circle', label: '圆形', icon: '●' },
  { id: 'rect', label: '矩形', icon: '▮' },
  { id: 'rounded', label: '圆角矩形', icon: '▢' },
  { id: 'triangle', label: '三角形', icon: '▲' },
  { id: 'pill', label: '胶囊', icon: '⬭' },
];

const PRESETS = [
  { label: '一对', shapes: [{ type: 'circle', x: 0.3, y: 0.5, r: 0.15 }, { type: 'circle', x: 0.7, y: 0.5, r: 0.15 }] },
  { label: 'L形', shapes: [{ type: 'rect', x: 0.2, y: 0.5, w: 0.15, h: 0.5 }, { type: 'rect', x: 0.35, y: 0.7, w: 0.4, h: 0.15 }] },
  { label: 'T形', shapes: [{ type: 'rect', x: 0.5, y: 0.2, w: 0.6, h: 0.12 }, { type: 'rect', x: 0.5, y: 0.55, w: 0.15, h: 0.5 }] },
  { label: '加号', shapes: [{ type: 'rect', x: 0.5, y: 0.5, w: 0.15, h: 0.7 }, { type: 'rect', x: 0.5, y: 0.5, w: 0.7, h: 0.15 }] },
  { label: '阶梯', shapes: [{ type: 'rect', x: 0.2, y: 0.75, w: 0.2, h: 0.25 }, { type: 'rect', x: 0.4, y: 0.55, w: 0.2, h: 0.45 }, { type: 'rect', x: 0.6, y: 0.35, w: 0.2, h: 0.65 }] },
  { label: '锯齿', shapes: [{ type: 'rect', x: 0.2, y: 0.75, w: 0.15, h: 0.25 }, { type: 'rect', x: 0.5, y: 0.55, w: 0.15, h: 0.45 }, { type: 'rect', x: 0.8, y: 0.75, w: 0.15, h: 0.25 }] },
  { label: '药丸', shapes: [{ type: 'pill', x: 0.2, y: 0.5, w: 0.15, h: 0.4 }, { type: 'pill', x: 0.5, y: 0.5, w: 0.15, h: 0.4 }, { type: 'pill', x: 0.8, y: 0.5, w: 0.15, h: 0.4 }] },
];

export default function ShapeMagic() {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState(PRESETS[0].shapes);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [color, setColor] = useState('#0ea5e9');
  const [opacity, setOpacity] = useState(100);
  const [stroke, setStroke] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [shadow, setShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState('#0ea5e9');
  const [shadowBlur, setShadowBlur] = useState(24);
  const [radius, setRadius] = useState(16);
  const [smoothness, setSmoothness] = useState(60);
  const [gridSize, setGridSize] = useState(20);
  const [showGrid, setShowGrid] = useState(true);
  const [snapGrid, setSnapGrid] = useState(true);

  const canvasSize = 600;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 网格
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= canvasSize; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvasSize); ctx.stroke(); }
      for (let y = 0; y <= canvasSize; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvasSize, y); ctx.stroke(); }
    }

    // 绘制形状
    const hexToRgb = (hex) => {
      const h = hex.replace('#', '');
      const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
      const n = parseInt(v.slice(0, 6), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    shapes.forEach((s, idx) => {
      const x = s.x * canvasSize, y = s.y * canvasSize;
      ctx.save();
      ctx.globalAlpha = opacity / 100;
      if (shadow) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = shadowBlur * 0.6;
      }
      ctx.fillStyle = color;
      ctx.beginPath();

      if (s.type === 'circle') {
        ctx.arc(x, y, (s.r || 0.15) * canvasSize, 0, Math.PI * 2);
      } else if (s.type === 'rect') {
        const w = (s.w || 0.2) * canvasSize, h = (s.h || 0.2) * canvasSize;
        ctx.rect(x - w / 2, y - h / 2, w, h);
      } else if (s.type === 'rounded') {
        const w = (s.w || 0.2) * canvasSize, h = (s.h || 0.2) * canvasSize;
        const r = Math.min(radius, w / 2, h / 2);
        ctx.roundRect(x - w / 2, y - h / 2, w, h, r);
      } else if (s.type === 'triangle') {
        const size = (s.r || 0.15) * canvasSize;
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size * 0.866, y + size * 0.5);
        ctx.lineTo(x + size * 0.866, y + size * 0.5);
        ctx.closePath();
      } else if (s.type === 'pill') {
        const w = (s.w || 0.15) * canvasSize, h = (s.h || 0.4) * canvasSize;
        const r = w / 2;
        ctx.roundRect(x - w / 2, y - h / 2, w, h, r);
      }
      ctx.fill();
      if (stroke) { ctx.strokeStyle = strokeColor; ctx.lineWidth = strokeWidth; ctx.stroke(); }
      ctx.restore();

      // 选中高亮
      if (selectedIdx === idx) {
        ctx.strokeStyle = 'rgba(34,211,238,0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        const bounds = getShapeBounds(s);
        ctx.strokeRect(bounds.x - 5, bounds.y - 5, bounds.w + 10, bounds.h + 10);
        ctx.setLineDash([]);
      }
    });
  }, [shapes, color, opacity, stroke, strokeColor, strokeWidth, shadow, shadowColor, shadowBlur, radius, showGrid, gridSize, selectedIdx]);

  const getShapeBounds = (s) => {
    const x = s.x * canvasSize, y = s.y * canvasSize;
    if (s.type === 'circle') { const r = (s.r || 0.15) * canvasSize; return { x: x - r, y: y - r, w: r * 2, h: r * 2 }; }
    if (s.type === 'triangle') { const r = (s.r || 0.15) * canvasSize; return { x: x - r, y: y - r, w: r * 2, h: r * 2 }; }
    const w = (s.w || 0.2) * canvasSize, h = (s.h || 0.2) * canvasSize;
    return { x: x - w / 2, y: y - h / 2, w, h };
  };

  useEffect(() => { draw(); }, [draw]);

  const snap = (v) => snapGrid ? Math.round(v / gridSize) * gridSize / canvasSize : v;

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = canvasSize / rect.width;
    return { x: (e.clientX - rect.left) * scale / canvasSize, y: (e.clientY - rect.top) * scale / canvasSize };
  };

  const onMouseDown = (e) => {
    const pos = getPos(e);
    for (let i = shapes.length - 1; i >= 0; i--) {
      const b = getShapeBounds(shapes[i]);
      if (pos.x * canvasSize >= b.x && pos.x * canvasSize <= b.x + b.w && pos.y * canvasSize >= b.y && pos.y * canvasSize <= b.y + b.h) {
        setSelectedIdx(i);
        setDragIdx(i);
        return;
      }
    }
    setSelectedIdx(null);
  };

  const onMouseMove = (e) => {
    if (dragIdx === null) return;
    const pos = getPos(e);
    setShapes((prev) => prev.map((s, i) => i === dragIdx ? { ...s, x: snap(pos.x), y: snap(pos.y) } : s));
  };

  const onMouseUp = () => setDragIdx(null);

  const addShape = (type) => {
    const base = { type, x: 0.5, y: 0.5 };
    if (type === 'circle') base.r = 0.12;
    else if (type === 'triangle') base.r = 0.12;
    else { base.w = 0.15; base.h = type === 'pill' ? 0.35 : 0.15; }
    setShapes([...shapes, base]);
  };

  const deleteSelected = () => {
    if (selectedIdx !== null) { setShapes(shapes.filter((_, i) => i !== selectedIdx)); setSelectedIdx(null); }
  };

  const duplicateSelected = () => {
    if (selectedIdx !== null) { setShapes([...shapes, { ...shapes[selectedIdx], x: Math.min(shapes[selectedIdx].x + 0.1, 0.9) }]); }
  };

  const applyPreset = (preset) => { setShapes(preset.shapes.map((s) => ({ ...s }))); setSelectedIdx(null); };

  const exportSVG = () => {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">\n`;
    shapes.forEach((s) => {
      const x = s.x * canvasSize, y = s.y * canvasSize;
      const a = opacity / 100;
      const fill = color;
      const strokeAttr = stroke ? ` stroke="${strokeColor}" stroke-width="${strokeWidth}"` : '';
      if (s.type === 'circle') {
        svg += `  <circle cx="${x}" cy="${y}" r="${(s.r || 0.15) * canvasSize}" fill="${fill}" fill-opacity="${a}"${strokeAttr}/>\n`;
      } else if (s.type === 'rect') {
        const w = (s.w || 0.2) * canvasSize, h = (s.h || 0.2) * canvasSize;
        svg += `  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${a}"${strokeAttr}/>\n`;
      } else if (s.type === 'rounded') {
        const w = (s.w || 0.2) * canvasSize, h = (s.h || 0.2) * canvasSize;
        const r = Math.min(radius, w / 2, h / 2);
        svg += `  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${r}" fill="${fill}" fill-opacity="${a}"${strokeAttr}/>\n`;
      } else if (s.type === 'triangle') {
        const sz = (s.r || 0.15) * canvasSize;
        svg += `  <polygon points="${x},${y - sz} ${x - sz * 0.866},${y + sz * 0.5} ${x + sz * 0.866},${y + sz * 0.5}" fill="${fill}" fill-opacity="${a}"${strokeAttr}/>\n`;
      } else if (s.type === 'pill') {
        const w = (s.w || 0.15) * canvasSize, h = (s.h || 0.4) * canvasSize;
        const r = w / 2;
        svg += `  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${r}" fill="${fill}" fill-opacity="${a}"${strokeAttr}/>\n`;
      }
    });
    svg += '</svg>';
    navigator.clipboard?.writeText(svg).then(() => alert('SVG 已复制到剪贴板'));
  };

  const exportPNG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `shape-magic-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex h-full">
      {/* 左侧：形状选择 + 预设 */}
      <div className="w-48 shrink-0 overflow-y-auto border-r border-white/10 bg-black/20 py-4">
        <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">添加形状</div>
        <div className="space-y-1 px-2">
          {SHAPES.map((s) => (
            <button key={s.id} onClick={() => addShape(s.id)} className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10">
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        <div className="mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">预设</div>
        <div className="space-y-1 px-2">
          {PRESETS.map((p, i) => (
            <button key={i} onClick={() => applyPreset(p)} className="w-full rounded-lg px-3 py-1.5 text-left text-sm text-white/60 hover:bg-white/10 hover:text-white">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 中间：画布 */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center bg-black p-4">
          <canvas
            ref={canvasRef}
            className="cursor-crosshair rounded-lg border border-white/10"
            style={{ width: canvasSize, height: canvasSize, maxWidth: '100%', maxHeight: '100%' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          />
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-2">
          <button onClick={deleteSelected} disabled={selectedIdx === null} className="rounded-lg bg-red-500/20 px-3 py-1 text-sm text-red-300 hover:bg-red-500/30 disabled:opacity-30">删除</button>
          <button onClick={duplicateSelected} disabled={selectedIdx === null} className="rounded-lg bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/20 disabled:opacity-30">复制</button>
          <div className="mx-2 h-5 w-px bg-white/20" />
          <button onClick={exportSVG} className="rounded-lg bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/20">复制 SVG</button>
          <button onClick={exportPNG} className="rounded-lg bg-cyan-500 px-3 py-1 text-sm font-semibold text-black hover:bg-cyan-400">导出 PNG</button>
        </div>
      </div>

      {/* 右侧：参数 */}
      <div className="w-52 shrink-0 overflow-y-auto border-l border-white/10 bg-black/20 py-4">
        <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">填充</div>
        <div className="space-y-3 px-3">
          <div>
            <label className="mb-1 block text-xs text-white/60">颜色</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs text-white/60"><span>不透明度</span><span>{opacity}%</span></div>
            <input type="range" min={0} max={100} value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-full accent-cyan-400" />
          </div>
        </div>
        <div className="mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">描边</div>
        <div className="space-y-3 px-3">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={stroke} onChange={(e) => setStroke(e.target.checked)} className="accent-cyan-400" />启用描边
          </label>
          {stroke && (
            <>
              <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
              <div>
                <div className="mb-1 flex justify-between text-xs text-white/60"><span>宽度</span><span>{strokeWidth}px</span></div>
                <input type="range" min={0.5} max={10} step={0.5} value={strokeWidth} onChange={(e) => setStrokeWidth(+e.target.value)} className="w-full accent-cyan-400" />
              </div>
            </>
          )}
        </div>
        <div className="mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">阴影</div>
        <div className="space-y-3 px-3">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={shadow} onChange={(e) => setShadow(e.target.checked)} className="accent-cyan-400" />启用阴影
          </label>
          {shadow && (
            <>
              <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
              <div>
                <div className="mb-1 flex justify-between text-xs text-white/60"><span>模糊</span><span>{shadowBlur}px</span></div>
                <input type="range" min={0} max={60} value={shadowBlur} onChange={(e) => setShadowBlur(+e.target.value)} className="w-full accent-cyan-400" />
              </div>
            </>
          )}
        </div>
        <div className="mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">形状</div>
        <div className="space-y-3 px-3">
          <div>
            <div className="mb-1 flex justify-between text-xs text-white/60"><span>全局圆角</span><span>{radius}px</span></div>
            <input type="range" min={0} max={100} value={radius} onChange={(e) => setRadius(+e.target.value)} className="w-full accent-cyan-400" />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs text-white/60"><span>桥接平滑度</span><span>{smoothness}%</span></div>
            <input type="range" min={0} max={100} value={smoothness} onChange={(e) => setSmoothness(+e.target.value)} className="w-full accent-cyan-400" />
          </div>
        </div>
        <div className="mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">画布</div>
        <div className="space-y-3 px-3">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} className="accent-cyan-400" />显示网格
          </label>
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={snapGrid} onChange={(e) => setSnapGrid(e.target.checked)} className="accent-cyan-400" />对齐网格
          </label>
          {snapGrid && (
            <div>
              <div className="mb-1 flex justify-between text-xs text-white/60"><span>网格大小</span><span>{gridSize}px</span></div>
              <input type="range" min={5} max={50} value={gridSize} onChange={(e) => setGridSize(+e.target.value)} className="w-full accent-cyan-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
