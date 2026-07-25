import { useRef, useEffect, useState, useCallback } from 'react';

const SIZE = 600;

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

const hexToRgba = (hex, a) => {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v.slice(0, 6), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export default function ShapeMagic() {
  const canvasRef = useRef(null);
  const shapeCv = useRef(typeof document !== 'undefined' ? document.createElement('canvas') : null);
  const blobCv = useRef(typeof document !== 'undefined' ? document.createElement('canvas') : null);
  const ringCv = useRef(typeof document !== 'undefined' ? document.createElement('canvas') : null);

  const [shapes, setShapes] = useState(PRESETS[0].shapes);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [dragIdx, setDragIdx] = useState(null);

  // 填充
  const [fillType, setFillType] = useState('solid');
  const [color, setColor] = useState('#0ea5e9');
  const [gradientColor, setGradientColor] = useState('#a855f7');
  const [opacity, setOpacity] = useState(100);

  // 描边
  const [strokeOn, setStrokeOn] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState(4);

  // 阴影
  const [shadowOn, setShadowOn] = useState(false);
  const [shadowColor, setShadowColor] = useState('#0ea5e9');
  const [shadowBlur, setShadowBlur] = useState(24);
  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(14);
  const [shadowStrength, setShadowStrength] = useState(35);

  // 形状
  const [radius, setRadius] = useState(32);
  const [bridgeOn, setBridgeOn] = useState(true);
  const [bridgeFit, setBridgeFit] = useState(100);

  // 画布
  const [bgEnabled, setBgEnabled] = useState(false);
  const [bg, setBg] = useState('#0b0b12');
  const [showGrid, setShowGrid] = useState(true);
  const [snapGrid, setSnapGrid] = useState(true);
  const [gridSize, setGridSize] = useState(10);

  // 导出
  const [bakeBg, setBakeBg] = useState(false);
  const [padding, setPadding] = useState(16);
  const [raster2x, setRaster2x] = useState(false);

  const drawShapePath = (ctx, s, size) => {
    const x = s.x * size;
    const y = s.y * size;
    ctx.beginPath();
    if (s.type === 'circle') {
      const r = (s.r || 0.15) * size;
      ctx.arc(x, y, r, 0, Math.PI * 2);
    } else if (s.type === 'triangle') {
      const r = (s.r || 0.15) * size;
      ctx.moveTo(x, y - r);
      ctx.lineTo(x - r * 0.866, y + r * 0.5);
      ctx.lineTo(x + r * 0.866, y + r * 0.5);
      ctx.closePath();
    } else {
      const w = (s.w || 0.2) * size;
      const h = (s.h || 0.2) * size;
      const rx = s.type === 'pill' ? w / 2 : Math.min(radius, w / 2, h / 2);
      if (ctx.roundRect) ctx.roundRect(x - w / 2, y - h / 2, w, h, rx);
      else ctx.rect(x - w / 2, y - h / 2, w, h);
    }
  };

  const getShapeBounds = (s, size) => {
    const x = s.x * size;
    const y = s.y * size;
    if (s.type === 'circle' || s.type === 'triangle') {
      const r = (s.r || 0.15) * size;
      return { x: x - r, y: y - r, w: r * 2, h: r * 2 };
    }
    const w = (s.w || 0.2) * size;
    const h = (s.h || 0.2) * size;
    return { x: x - w / 2, y: y - h / 2, w, h };
  };

  const renderScene = useCallback((tctx, size, scale, opts) => {
    const W = size * scale;
    tctx.setTransform(scale, 0, 0, scale, 0, 0);
    tctx.clearRect(0, 0, size, size);

    if (opts.includeBg && bgEnabled) {
      tctx.fillStyle = bg;
      tctx.fillRect(0, 0, size, size);
    }

    // 1) 形状离屏画布（白色实心）
    const sc = shapeCv.current;
    sc.width = W; sc.height = W;
    const sx = sc.getContext('2d');
    sx.setTransform(scale, 0, 0, scale, 0, 0);
    sx.clearRect(0, 0, size, size);
    sx.fillStyle = '#fff';
    shapes.forEach((s) => { drawShapePath(sx, s, size); sx.fill(); });

    // 2) 黏合（桥接）：模糊 + 高对比，把邻近形状融合成圆润大色块
    const bc = blobCv.current;
    bc.width = W; bc.height = W;
    const bx = bc.getContext('2d');
    bx.setTransform(1, 0, 0, 1, 0, 0);
    bx.clearRect(0, 0, W, W);
    if (bridgeOn) {
      const b = (1 + (bridgeFit / 100) * 22) * scale;
      bx.filter = `blur(${b}px) contrast(18)`;
    } else {
      bx.filter = 'none';
    }
    bx.drawImage(sc, 0, 0);
    bx.filter = 'none';

    // 3) 填充颜色 / 渐变 + 不透明度
    bx.globalCompositeOperation = 'source-in';
    if (fillType === 'gradient') {
      const g = bx.createLinearGradient(0, 0, W, W);
      g.addColorStop(0, color);
      g.addColorStop(1, gradientColor);
      bx.fillStyle = g;
    } else {
      bx.fillStyle = color;
    }
    bx.globalAlpha = opacity / 100;
    bx.fillRect(0, 0, W, W);
    bx.globalAlpha = 1;
    bx.globalCompositeOperation = 'source-over';

    // 4) 阴影
    if (opts.includeShadow && shadowOn) {
      tctx.save();
      tctx.shadowColor = hexToRgba(shadowColor, shadowStrength / 100);
      tctx.shadowBlur = shadowBlur * scale;
      tctx.shadowOffsetX = shadowOffsetX * scale;
      tctx.shadowOffsetY = shadowOffsetY * scale;
      tctx.drawImage(bc, 0, 0);
      tctx.restore();
    }

    // 5) 主体
    tctx.drawImage(bc, 0, 0);

    // 6) 描边（由融合轮廓外扩得到环）
    if (opts.includeStroke && strokeOn) {
      const rc = ringCv.current;
      rc.width = W; rc.height = W;
      const rx = rc.getContext('2d');
      rx.setTransform(1, 0, 0, 1, 0, 0);
      rx.clearRect(0, 0, W, W);
      rx.filter = `blur(${Math.max(1, strokeWidth / 2) * scale}px)`;
      rx.drawImage(bc, 0, 0);
      rx.filter = 'none';
      rx.globalCompositeOperation = 'destination-out';
      rx.drawImage(bc, 0, 0);
      rx.globalCompositeOperation = 'source-in';
      rx.fillStyle = strokeColor;
      rx.fillRect(0, 0, W, W);
      rx.globalCompositeOperation = 'source-over';
      tctx.drawImage(rc, 0, 0);
    }

    // 7) 选中高亮
    if (opts.showSelection && selectedIdx != null && shapes[selectedIdx]) {
      const b = getShapeBounds(shapes[selectedIdx], size);
      tctx.save();
      tctx.strokeStyle = 'rgba(34,211,238,0.7)';
      tctx.lineWidth = 2 / scale;
      tctx.setLineDash([4 / scale, 4 / scale]);
      tctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
      tctx.restore();
    }
  }, [shapes, selectedIdx, fillType, color, gradientColor, opacity, strokeOn, strokeColor, strokeWidth, shadowOn, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY, shadowStrength, radius, bridgeOn, bridgeFit, bgEnabled, bg]);

  const drawGrid = (ctx, size, scale) => {
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= size; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke(); }
    for (let y = 0; y <= size; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke(); }
    ctx.restore();
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    renderScene(ctx, SIZE, dpr, { includeBg: bgEnabled, includeShadow: true, includeStroke: true, showSelection: true });
    if (showGrid) drawGrid(ctx, SIZE, dpr);
  }, [renderScene, bgEnabled, showGrid, gridSize]);

  useEffect(() => { draw(); }, [draw]);

  // ---------- 交互 ----------
  const snap = (v) => (snapGrid ? Math.round((v * SIZE) / gridSize) * gridSize / SIZE : v);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = SIZE / rect.width;
    return { x: (e.clientX - rect.left) * scale / SIZE, y: (e.clientY - rect.top) * scale / SIZE };
  };

  const onMouseDown = (e) => {
    const pos = getPos(e);
    for (let i = shapes.length - 1; i >= 0; i--) {
      const b = getShapeBounds(shapes[i], SIZE);
      const px = pos.x * SIZE;
      const py = pos.y * SIZE;
      if (px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) {
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
    setShapes((prev) => prev.map((s, i) => (i === dragIdx ? { ...s, x: snap(pos.x), y: snap(pos.y) } : s)));
  };

  const onMouseUp = () => setDragIdx(null);

  const addShape = (type) => {
    const base = { type, x: 0.5, y: 0.5 };
    if (type === 'circle' || type === 'triangle') base.r = 0.12;
    else { base.w = 0.15; base.h = type === 'pill' ? 0.35 : 0.15; }
    setShapes((prev) => [...prev, base]);
    setSelectedIdx(shapes.length);
  };

  const deleteSelected = () => {
    if (selectedIdx !== null) {
      setShapes((prev) => prev.filter((_, i) => i !== selectedIdx));
      setSelectedIdx(null);
    }
  };

  const duplicateSelected = () => {
    if (selectedIdx !== null) {
      setShapes((prev) => [...prev, { ...prev[selectedIdx], x: Math.min(prev[selectedIdx].x + 0.1, 0.9) }]);
    }
  };

  const resetAll = () => { setShapes(PRESETS[0].shapes); setSelectedIdx(0); };

  const applyPreset = (preset) => { setShapes(preset.shapes.map((s) => ({ ...s }))); setSelectedIdx(null); };

  const fitToCanvas = () => {
    // 把当前形状整体缩放并居中到画布内
    const bs = shapes.map((s) => getShapeBounds(s, SIZE));
    const minX = Math.min(...bs.map((b) => b.x));
    const minY = Math.min(...bs.map((b) => b.y));
    const maxX = Math.max(...bs.map((b) => b.x + b.w));
    const maxY = Math.max(...bs.map((b) => b.y + b.h));
    const bw = maxX - minX;
    const bh = maxY - minY;
    const margin = 0.12;
    const scale = Math.min((1 - margin * 2) / (bw / SIZE), (1 - margin * 2) / (bh / SIZE));
    const offX = (0.5 - (minX + bw / 2) / SIZE) * scale;
    const offY = (0.5 - (minY + bh / 2) / SIZE) * scale;
    setShapes((prev) => prev.map((s) => ({ ...s, x: s.x * scale + offX, y: s.y * scale + offY })));
  };

  // ---------- 导出 ----------
  const buildSVG = () => {
    const pad = padding;
    let body = '';
    shapes.forEach((s) => {
      const x = s.x * SIZE;
      const y = s.y * SIZE;
      if (s.type === 'circle') {
        const r = (s.r || 0.15) * SIZE;
        body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>`;
      } else if (s.type === 'triangle') {
        const r = (s.r || 0.15) * SIZE;
        body += `<polygon points="${x.toFixed(1)},${(y - r).toFixed(1)} ${(x - r * 0.866).toFixed(1)},${(y + r * 0.5).toFixed(1)} ${(x + r * 0.866).toFixed(1)},${(y + r * 0.5).toFixed(1)}"/>`;
      } else {
        const w = (s.w || 0.2) * SIZE;
        const h = (s.h || 0.2) * SIZE;
        const rx = s.type === 'pill' ? w / 2 : Math.min(radius, w / 2, h / 2);
        body += `<rect x="${(x - w / 2).toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${rx.toFixed(1)}"/>`;
      }
    });
    const fillAttr = fillType === 'gradient' ? 'fill="url(#g)"' : `fill="${color}"`;
    const grad = fillType === 'gradient'
      ? '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + color + '"/><stop offset="1" stop-color="' + gradientColor + '"/></linearGradient></defs>'
      : '';
    const strokeAttr = strokeOn ? ` stroke="${strokeColor}" stroke-width="${strokeWidth}"` : '';
    const bgAttr = (bakeBg && bgEnabled) ? `<rect width="${SIZE}" height="${SIZE}" fill="${bg}"/>` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE + pad * 2}" height="${SIZE + pad * 2}" viewBox="${-pad} ${-pad} ${SIZE} ${SIZE}">${grad}${bgAttr}<g ${fillAttr} fill-opacity="${(opacity / 100).toFixed(2)}"${strokeAttr}>${body}</g></svg>`;
  };

  const copyText = (text, msg) => {
    navigator.clipboard?.writeText(text).then(() => alert(msg));
  };

  const exportRaster = (mime, ext) => {
    const sc = raster2x ? 2 : 1;
    const pad = padding;
    const full = (SIZE + pad * 2) * sc;
    const tmp = document.createElement('canvas');
    tmp.width = full; tmp.height = full;
    const tctx = tmp.getContext('2d');
    tctx.translate(pad * sc, pad * sc);
    renderScene(tctx, SIZE, sc, {
      includeBg: bakeBg ? (bgEnabled ? bg : '#000000') : false,
      includeShadow: shadowOn,
      includeStroke: strokeOn,
      showSelection: false,
    });
    const link = document.createElement('a');
    link.download = `shape-magic-${Date.now()}.${ext}`;
    link.href = tmp.toDataURL(mime, 0.92);
    link.click();
  };

  return (
    <div className="flex h-full">
      {/* 左侧：设置面板 */}
      <aside className="w-72 shrink-0 overflow-y-auto border-r border-white/10 bg-black/20 py-4 text-sm">
        {/* 预设 */}
        <Section title="预设">
          <div className="flex flex-wrap gap-1 px-2">
            {PRESETS.map((p) => (
              <button key={p.label} onClick={() => applyPreset(p)} className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/15 hover:text-white">
                {p.label}
              </button>
            ))}
          </div>
        </Section>

        {/* 工具 */}
        <Section title="工具">
          <div className="space-y-2 px-2">
            <div className="grid grid-cols-5 gap-1">
              {SHAPES.map((s) => (
                <button key={s.id} onClick={() => addShape(s.id)} title={s.label} className="rounded-md bg-white/5 py-1.5 text-center text-base hover:bg-cyan-400/20">
                  {s.icon}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button onClick={deleteSelected} disabled={selectedIdx === null} className="flex-1 rounded-md bg-red-500/20 px-2 py-1 text-red-300 hover:bg-red-500/30 disabled:opacity-30">删除</button>
              <button onClick={duplicateSelected} disabled={selectedIdx === null} className="flex-1 rounded-md bg-white/10 px-2 py-1 text-white/80 hover:bg-white/20 disabled:opacity-30">复制</button>
            </div>
            <div className="flex gap-1">
              <button onClick={fitToCanvas} className="flex-1 rounded-md bg-white/10 px-2 py-1 text-white/80 hover:bg-white/20">适应画布</button>
              <button onClick={resetAll} className="flex-1 rounded-md bg-white/10 px-2 py-1 text-white/80 hover:bg-white/20">重置</button>
            </div>
          </div>
        </Section>

        {/* 填充 */}
        <Section title="填充">
          <div className="space-y-3 px-3">
            <div>
              <label className="mb-1 block text-xs text-white/60">类型</label>
              <div className="flex gap-1">
                {[['solid', '纯色'], ['gradient', '渐变']].map(([v, l]) => (
                  <button key={v} onClick={() => setFillType(v)} className={`flex-1 rounded-md px-2 py-1 text-xs ${fillType === v ? 'bg-cyan-400/25 text-cyan-200' : 'bg-white/5 text-white/60 hover:bg-white/15'}`}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">颜色</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
            </div>
            {fillType === 'gradient' && (
              <div>
                <label className="mb-1 block text-xs text-white/60">渐变副色</label>
                <input type="color" value={gradientColor} onChange={(e) => setGradientColor(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
              </div>
            )}
            <Range label="不透明度" value={opacity} min={0} max={100} suffix="%" onChange={setOpacity} />
          </div>
        </Section>

        {/* 描边 */}
        <Section title="描边">
          <div className="space-y-3 px-3">
            <Toggle label="启用描边" checked={strokeOn} onChange={setStrokeOn} />
            {strokeOn && (
              <>
                <div>
                  <label className="mb-1 block text-xs text-white/60">颜色</label>
                  <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
                </div>
                <Range label="宽度" value={strokeWidth} min={0.5} max={20} step={0.5} suffix="px" onChange={setStrokeWidth} />
              </>
            )}
          </div>
        </Section>

        {/* 阴影 */}
        <Section title="阴影">
          <div className="space-y-3 px-3">
            <Toggle label="启用阴影" checked={shadowOn} onChange={setShadowOn} />
            {shadowOn && (
              <>
                <div>
                  <label className="mb-1 block text-xs text-white/60">颜色</label>
                  <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
                </div>
                <Range label="模糊" value={shadowBlur} min={0} max={80} suffix="px" onChange={setShadowBlur} />
                <Range label="偏移 X" value={shadowOffsetX} min={-50} max={50} suffix="px" onChange={setShadowOffsetX} />
                <Range label="偏移 Y" value={shadowOffsetY} min={-50} max={50} suffix="px" onChange={setShadowOffsetY} />
                <Range label="强度" value={shadowStrength} min={0} max={100} suffix="%" onChange={setShadowStrength} />
              </>
            )}
          </div>
        </Section>

        {/* 形状 */}
        <Section title="形状">
          <div className="space-y-3 px-3">
            <Range label="全局圆角" value={radius} min={0} max={100} suffix="px" onChange={setRadius} />
            <Toggle label="启用桥接（融合）" checked={bridgeOn} onChange={setBridgeOn} />
            {bridgeOn && <Range label="桥接贴合 (Fit)" value={bridgeFit} min={0} max={100} suffix="%" onChange={setBridgeFit} />}
          </div>
        </Section>

        {/* 画布 */}
        <Section title="画布">
          <div className="space-y-3 px-3">
            <Toggle label="背景" checked={bgEnabled} onChange={setBgEnabled} />
            {bgEnabled && (
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-full cursor-pointer rounded" />
            )}
            <Toggle label="显示网格" checked={showGrid} onChange={setShowGrid} />
            <Toggle label="对齐网格" checked={snapGrid} onChange={setSnapGrid} />
            {snapGrid && <Range label="网格大小" value={gridSize} min={5} max={50} suffix="px" onChange={setGridSize} />}
          </div>
        </Section>

        {/* 导出 */}
        <Section title="导出">
          <div className="space-y-3 px-3">
            <Toggle label="烘焙背景" checked={bakeBg} onChange={setBakeBg} />
            <Range label="内边距" value={padding} min={0} max={80} suffix="px" onChange={setPadding} />
            <Toggle label="栅格 2x" checked={raster2x} onChange={setRaster2x} />
            <div className="grid grid-cols-2 gap-1 pt-1">
              <ExportBtn onClick={() => copyText(buildSVG(), 'SVG 已复制到剪贴板')}>复制 SVG</ExportBtn>
              <ExportBtn onClick={() => copyText(`export default function Shape() {\n  return (\n    ${buildSVG().split('\n').join('\n    ')}\n  );\n}`, 'React 代码已复制')}>复制 React</ExportBtn>
              <ExportBtn onClick={() => copyText(`.shape{\n  width:${SIZE}px;height:${SIZE}px;\n  background:url("data:image/svg+xml,${encodeURIComponent(buildSVG())}") center/contain no-repeat;\n}`, 'CSS clip-path 已复制')}>复制 CSS</ExportBtn>
              <ExportBtn onClick={() => copyText(buildSVG(), '已合并并复制（Mask-Ready）')}>合并并复制</ExportBtn>
              <ExportBtn onClick={() => exportRaster('image/svg+xml', 'svg')}>SVG</ExportBtn>
              <ExportBtn onClick={() => exportRaster('image/png', 'png')}>PNG</ExportBtn>
              <ExportBtn onClick={() => exportRaster('image/jpeg', 'jpg')}>JPG</ExportBtn>
            </div>
          </div>
        </Section>
      </aside>

      {/* 中间：画布 */}
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center bg-black p-4">
          <canvas
            ref={canvasRef}
            className="cursor-crosshair rounded-lg border border-white/10"
            style={{ width: SIZE, height: SIZE, maxWidth: '100%', maxHeight: '100%' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          />
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-2 text-xs text-white/40">
          <span>提示：拖动形状移动 · 选中后可删除/复制 · 开启「桥接」邻近形状会自动融合成圆润大色块</span>
        </div>
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
      <div className="mb-1 flex justify-between text-xs text-white/60"><span>{label}</span><span>{value}{suffix}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-cyan-400" />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-white/80">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-cyan-400" />{label}
    </label>
  );
}

function ExportBtn({ onClick, children }) {
  return (
    <button onClick={onClick} className="rounded-md bg-white/10 px-2 py-1.5 text-xs text-white/80 hover:bg-cyan-400 hover:text-black">
      {children}
    </button>
  );
}
