const fs = require('fs');

// 读取已提取的（按组件名精确匹配）props
const data = JSON.parse(fs.readFileSync('/tmp/anim_props.json', 'utf8'));
const fs2 = require('fs');
const path = require('path');
const dir = 'src/bits/Animations';

// 重新扫描每个文件，补全默认值（接口里的 = default，以及函数体内的 prop = value）
function captureDefaults(name) {
  const f = path.join(dir, name + '.tsx');
  const t = fs2.readFileSync(f, 'utf8');
  const result = {};
  // 1) 接口/类型里的 prop?: type = default
  const ifaceRe = new RegExp('(?:interface\\s+' + name + 'Props\\s*(?:extends[^\\{]*?)?|type\\s+' + name + 'Props\\s*=\\s*)\\{([\\s\\S]*?)\\n\\}', 'g');
  let bm;
  while ((bm = ifaceRe.exec(t))) {
    const body = bm[1];
    const re = /^\s*([A-Za-z_][\w]*)\s*\??\s*:\s*([^=;]+?)\s*=\s*([^;]+?)\s*;?\s*$/gm;
    let m;
    while ((m = re.exec(body))) result[m[1]] = m[3].trim();
  }
  // 2) 函数体里的 prop = value（处理多行解构默认值）
  const fnRe = new RegExp('function\\s+' + name + '\\s*\\([\\s\\S]*?\\{|' + name + '\\s*:\\s*(?:React\\.)?FC<[^>]*>\\s*=\\s*\\(', 'g');
  const fm = fnRe.exec(t);
  if (fm) {
    // 从匹配位置取到函数结尾（粗略：取接下来 4000 字符）
    const start = fm.index;
    const chunk = t.slice(start, start + 6000);
    const assignRe = /([A-Za-z_][\w]*)\s*=\s*('[^']*'|"[^"]*"|\[[^\]]*\]|true|false|-?\d+\.?\d*)/g;
    let a;
    while ((a = assignRe.exec(chunk))) {
      if (result[a[1]] === undefined) result[a[1]] = a[2].trim();
    }
  }
  return result;
}

const tunableRaw = JSON.parse(fs2.readFileSync('/tmp/anim_tunable.json', 'utf8'));

// ── 过滤 ──
// 仅否定「确实不是公开可调 API」的参数：
//  1) SplashCursor 流体模拟内部常量（暴露无意义且会破坏组件）
//  2) 通用 DOM/canvas 透传 props
//  3) 事件回调
// 注意：其它如 enableMouseInteraction / animationSize / clumpFactor / maxAge /
//       interpolate / hoverSmoothness / disable 等都是各组件的【真实公开 prop】，
//       必须保留为旋钮，否则会显得「不完整 / 像模拟的」。
const DENY = new Set([
  // SplashCursor 流体模拟内部常量
  'CURL', 'PRESSURE', 'PRESSURE_ITERATIONS', 'SIM_RESOLUTION', 'DYE_RESOLUTION',
  'VELOCITY_DISSIPATION', 'DENSITY_DISSIPATION', 'COLOR_UPDATE_SPEED', 'RAINBOW_MODE',
  'SHADING', 'CAPTURE_RESOLUTION', 'BACK_COLOR', 'SPLAT_FORCE', 'SPLAT_RADIUS', 'TRANSPARENT',
  // 通用 DOM / canvas 透传（非可调参数）
  'glProps', 'canvasProps', 'container', 'maxDevicePixelRatio', 'dpr', 'pixelRatioProp',
  'wrapperClassName', 'innerClassName', 'targetPixels',
  // 事件回调（非可视化参数）
  'onClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave', 'onChange',
  'onComplete', 'onDisappearanceComplete',
]);

// 中文标签字典（同前，略精简）
const EXACT = {
  color: '颜色', colorTwo: '辅助颜色', colors: '颜色组', backgroundColor: '背景颜色',
  background: '背景', borderColor: '边框颜色', fillColor: '填充颜色', innerColor: '内层颜色',
  darkColor: '暗部颜色', lightColor: '亮部颜色', tintColor: '色调颜色', glareColor: '高光颜色',
  shadowColor: '阴影颜色', rippleColor: '波纹颜色', cursorColor: '光标颜色',
  cursorColorOnTarget: '目标光标颜色', cursorBallColor: '光标球颜色', pathColor: '路径颜色',
  fadeOutColor: '淡出颜色', pixelColor: '像素颜色',
  speed: '速度', speedMultiplier: '速度倍率', flowSpeed: '流动速度', flowStrength: '流动强度',
  waveSpeed: '波动速度', hoverSpeed: '悬停速度',
  size: '尺寸', cubeSize: '方块尺寸', itemSize: '项尺寸', gridSize: '网格尺寸',
  shapeSize: '形状尺寸', circleSize: '圆形尺寸', trailSize: '拖尾尺寸', cursorBallSize: '光标球尺寸',
  glassSize: '玻璃尺寸', logoHeight: '标志高度', pixelSize: '像素尺寸',
  radius: '半径', radiusX: '横向半径', radiusY: '纵向半径', baseRadius: '基础半径',
  radiusStep: '半径步长', ringRadius: '环半径', cellRadius: '单元圆角', cornerRadius: '圆角',
  maxRadius: '最大半径',
  width: '宽度', height: '高度', baseWidth: '基础宽度', maxWidth: '最大宽度',
  cellSize: '单元尺寸', lineWidth: '线宽', lineHeight: '线高', borderSize: '边框尺寸',
  borderWidth: '边框宽度', thickness: '厚度', lineThickness: '线厚', baseThickness: '基础厚度',
  gap: '间距', lineGap: '线间距', cellGap: '单元间距', starInnerRatio: '星形内比',
  opacity: '不透明度', maxOpacity: '最大不透明度', fillOpacity: '填充不透明度',
  gridOpacity: '网格不透明度',
  angle: '角度', glareAngle: '高光角度', rotate: '旋转角', rotation: '旋转', rotationSpeed: '旋转速度',
  duration: '时长', transitionDuration: '过渡时长', fadeDuration: '淡出时长',
  fadeDurationMs: '淡出时长(ms)', fadeDelayMs: '淡出延迟(ms)', holdTime: '停留时长',
  spinDuration: '自转时长', slowDuration: '慢速时长', fastDuration: '快速时长',
  scale: '缩放', scaleRate: '缩放速率', hoverScale: '悬停缩放', mouseInfluence: '鼠标影响',
  parallax: '视差', strength: '强度', fieldStrength: '场强', magnetStrength: '磁吸强度',
  magnetRadius: '磁吸半径', particleSize: '粒子尺寸', particleVariance: '粒子方差',
  particleShape: '粒子形状', particleCount: '粒子数量', count: '数量',
  amplitude: '幅度', waveAmplitude: '波动幅度', effectAmplitude: '效果幅度',
  blur: '模糊', shadowBlur: '阴影模糊', chromaticSpread: '色散扩散',
  brightness: '亮度', contrast: '对比度', sharpness: '锐度', patternSharpness: '图案锐度',
  distortion: '扭曲', refraction: '折射', fresnel: '菲涅尔', liquid: '液态',
  noiseAmount: '噪点强度', noiseScale: '噪点缩放', patternScaleX: '横向图案缩放',
  patternScaleY: '纵向图案缩放', patternSize: '图案尺寸', patternAlpha: '图案不透明度',
  patternRefreshInterval: '图案刷新间隔',
  intensity: '强度', shadowIntensity: '阴影强度',
  ringCount: '环数量', ringGap: '环间隙', attenuation: '衰减', lineColor: '线条颜色',
  lineCount: '线条数量', rows: '行数', columns: '列数', containerSize: '容器尺寸',
  baseAngle: '基础角度', followMouse: '跟随鼠标', clickBurst: '点击爆发', clickPulse: '点击脉冲',
  pulseSpeed: '脉冲速度',
  sparkColor: '火花颜色', sparkSize: '火花尺寸', sparkCount: '火花数量', sparkRadius: '火花半径',
  trailLength: '拖尾长度', trailCount: '拖尾数量',
  blobType: '团块类型', trailColor: '拖尾颜色', starPoints: '星形点数',
  chaos: '混沌', ease: '缓动', easing: '缓动', easingFunction: '缓动函数',
  curve: '曲线', disappearEase: '消失缓动', peelEasing: '剥落缓动',
  fadeIn: '淡入', fadeOut: '淡出', enableFade: '启用淡出',
  position: '位置', shape: '形状', direction: '方向', playOnce: '仅播放一次',
  paused: '暂停', pauseOnHover: '悬停暂停', autoAnimate: '自动播放',
  showPath: '显示路径', pathWidth: '路径宽度', customPath: '自定义路径',
  seed: '随机种子', dispersion: '色散', borderRadius: '圆角', borderStyle: '边框样式',
  depthFactor: '深度系数', lerpSpeed: '插值速度', shadowOffsetX: '阴影偏移X',
  shadowOffsetY: '阴影偏移Y', zIndex: '层级', useFilter: '使用滤镜',
  filterStdDeviation: '滤镜标准差', shadow: '阴影',
  altPrefix: '替代文本前缀', once: '仅一次',
  mixBlendMode: '混合模式',
  COLOR: '颜色', aspectRatio: '宽高比',
  peelBackHoverPct: '剥回悬停百分比', peelBackActivePct: '剥回激活百分比',
  shadowOffsetX: '阴影水平偏移', shadowOffsetY: '阴影垂直偏移',
  rippleOnClick: '点击波纹',
};
const SUFFIX = [
  ['Color', '颜色'], ['Opacity', '不透明度'], ['Alpha', '透明度'], ['Speed', '速度'],
  ['Rate', '速率'], ['Size', '尺寸'], ['Radius', '半径'], ['Width', '宽度'], ['Height', '高度'],
  ['Angle', '角度'], ['Rotation', '旋转'], ['Duration', '时长'], ['Scale', '缩放'],
  ['Strength', '强度'], ['Intensity', '强度'], ['Amplitude', '幅度'], ['Thickness', '厚度'],
  ['Gap', '间距'], ['Blur', '模糊'], ['Brightness', '亮度'], ['Contrast', '对比度'],
  ['Count', '数量'], ['Number', '数量'], ['Factor', '系数'], ['Frequency', '频率'],
  ['Offset', '偏移'], ['Delay', '延迟'], ['Step', '步长'], ['Variance', '方差'],
  ['Variation', '变化'], ['Direction', '方向'], ['Shape', '形状'], ['Mode', '模式'],
  ['Ease', '缓动'], ['Shadow', '阴影'], ['Glow', '辉光'], ['Noise', '噪点'], ['Grid', '网格'],
  ['Line', '线条'], ['Wave', '波浪'], ['Pulse', '脉冲'], ['Ring', '环'], ['Ball', '球'],
  ['Pixel', '像素'], ['Spark', '火花'], ['Trail', '拖尾'], ['Cursor', '光标'],
  ['Ribbon', '丝带'], ['Star', '星形'], ['Blob', '团块'], ['Magic', '魔法'], ['Meta', '元'],
  ['Click', '点击'], ['Hover', '悬停'], ['Mouse', '鼠标'], ['Auto', '自动'], ['Enable', '启用'],
  ['Show', '显示'], ['Hide', '隐藏'], ['Reverse', '反转'], ['Play', '播放'], ['Once', '单次'],
  ['Smooth', '平滑'], ['Sharp', '锐利'], ['Soft', '柔和'], ['Light', '光'], ['Dark', '暗'],
  ['Inner', '内层'], ['Outer', '外层'], ['Base', '基础'], ['Max', '最大'], ['Min', '最小'],
  ['Initial', '初始'], ['Target', '目标'], ['Follow', '跟随'], ['Influence', '影响'],
  ['Parallax', '视差'], ['Distortion', '扭曲'], ['Refraction', '折射'], ['Chromatic', '色散'],
  ['Fresnel', '菲涅尔'], ['Liquid', '液态'], ['Metallic', '金属'], ['Pattern', '图案'],
  ['Seed', '随机种子'], ['Edge', '边缘'], ['Corner', '角'], ['Cell', '单元'], ['Item', '项'],
  ['Image', '图片'], ['Logo', '标志'], ['Text', '文字'], ['Content', '内容'],
  ['Transition', '过渡'], ['Animation', '动画'], ['Effect', '效果'], ['Force', '力'],
  ['Pressure', '压力'], ['Density', '密度'], ['Resolution', '分辨率'], ['Quality', '质量'],
  ['Iterations', '迭代'], ['Rainbow', '彩虹'], ['Hue', '色相'], ['Saturation', '饱和度'],
  ['Tint', '色调'], ['Glare', '高光'], ['Glass', '玻璃'], ['Particle', '粒子'], ['Strand', '细丝'],
  ['Field', '场'], ['Vector', '矢量'], ['Rotate', '旋转'], ['Orbit', '轨道'], ['Spin', '自转'],
  ['Spectrum', '光谱'], ['Shade', '明暗'], ['Depth', '深度'], ['Spread', '扩散'],
  ['Threshold', '阈值'], ['Curl', '卷曲'], ['Dissipation', '消散'], ['Grain', '颗粒'],
  ['Wisp', '薄雾'], ['Fog', '雾'], ['Bloom', '泛光'], ['Beam', '光束'], ['Horizontal', '水平'],
  ['Vertical', '垂直'], ['Sizing', '尺寸'], ['Spring', '弹性'], ['Friction', '摩擦'],
  ['Inertia', '惯性'], ['Interpolate', '插值'], ['Disperse', '弥散'], ['Waviness', '波动'],
  ['Taper', '锥形'], ['Clump', '聚团'], ['Point', '点'],
  ['Circle', '圆形'], ['Face', '面'], ['Matrix', '矩阵'], ['Selector', '选择器'],
  ['Default', '默认'], ['Interaction', '交互'], ['Shader', '着色器'], ['Transparency', '透明'],
  ['Age', '时长'], ['Pct', '百分比'], ['Shift', '偏移'], ['Fall', '降落'], ['Tilt', '倾斜'],
  ['Active', '激活'], ['Animate', '动画'], ['Disappear', '消失'], ['Fast', '快速'],
  ['Slow', '慢速'], ['Inactive', '非激活'], ['Lighting', '光照'], ['Blend', '混合'],
  ['Back', '回'], ['Smoothness', '平滑度'], ['Time', '时间'], ['Filter', '滤镜'],
  ['Values', '值'], ['Extra', '额外'], ['Div', '层'], ['Beam', '光束'],   ['Aspect', '宽高比'],
  ['Animated', '动画'], ['Contour', '轮廓'], ['Decay', '衰减'], ['Disable', '禁用'],
  ['Disabled', '禁用'], ['Distance', '距离'], ['Exponential', '指数'], ['Falloff', '衰减'],
  ['Start', '起始'], ['Fill', '填充'], ['Padding', '内边距'], ['Preset', '预设'],
  ['Responsive', '响应式'], ['Roundness', '圆度'], ['Ratio', '比例'],   ['Variant', '变体'], ['Peel', '剥落'], ['Easing', '缓动'], ['Ripple', '波纹'], ['After', '后'],
];
function labelFor(prop) {
  if (EXACT[prop]) return EXACT[prop];
  const words = prop.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
  return words.map(w => {
    if (w.toLowerCase() === 'on') return ''; // 跳过 "On"（如 scaleOnHover → 悬停缩放）
    const cap = w.charAt(0).toUpperCase() + w.slice(1);
    for (const [suf, zh] of SUFFIX) if (cap === suf || cap.endsWith(suf)) return zh;
    return w;
  }).join('');
}

// 类型别名 -> 下拉选项
const ALIAS_SELECT = {
  Falloff: ['linear', 'smooth', 'sharp'],
  OrbitShape: ['ellipse', 'circle', 'square', 'rectangle', 'triangle', 'star', 'heart', 'infinity', 'wave', 'custom'],
};
// 复杂对象类型 -> 跳过（不作为旋钮）
const SKIP_TYPE = new Set(['Duration', 'Gap']);

const COLOR_NAMES = /(color|colour|background|backgroundcolor|tint)$/i;
function isColorName(prop) { return COLOR_NAMES.test(prop) || prop === 'background' || prop === 'backgroundColor' || prop === 'tintColor'; }
const COLOR_DEFAULTS = {
  color: '#22d3ee', colorTwo: '#a855f7', colors: '#22d3ee', backgroundColor: '#000000',
  background: '#000000', borderColor: '#333333', fillColor: '#22d3ee', innerColor: '#22d3ee',
  darkColor: '#000000', lightColor: '#ffffff', tintColor: '#ffffff', glareColor: '#ffffff',
  shadowColor: '#000000', rippleColor: '#22d3ee', cursorColor: '#22d3ee',
  cursorColorOnTarget: '#ff5e5e', cursorBallColor: '#a855f7', pathColor: '#22d3ee',
  fadeOutColor: '#000000', pixelColor: '#ffffff',
};
function isHexOrNamed(v) {
  const s = String(v).trim().replace(/^['"]|['"]$/g, '');
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s) || ['white', 'black', 'red', 'blue', 'green', 'cyan', 'transparent', 'currentcolor'].includes(s.toLowerCase());
}
function rangeFor(prop, def) {
  const p = prop.toLowerCase();
  const d = parseFloat(def);
  let r;
  if (p.includes('opacity') || p.includes('alpha')) r = { min: 0, max: 1, step: 0.01 };
  else if (p.includes('angle') || p === 'rotation' || p.includes('rotate')) r = { min: 0, max: 360, step: 1 };
  else if (p.includes('duration') || (p.includes('speed') && p.includes('ms'))) r = { min: 0, max: 5000, step: 50 };
  else if (p.includes('speed') || p.includes('rate')) r = { min: 0, max: 20, step: 0.1 };
  else if (p.includes('count') || p.includes('number')) r = { min: 0, max: 50, step: 1 };
  else if (p.includes('scale') || p.includes('strength') || p.includes('intensity') || p.includes('amplitude') || p.includes('factor')) r = { min: 0, max: 10, step: 0.1 };
  else if (p.includes('blur')) r = { min: 0, max: 30, step: 0.5 };
  else if (p.includes('brightness') || p.includes('contrast')) r = { min: 0, max: 5, step: 0.1 };
  else if (p.includes('radius') || p.includes('size') || p.includes('width') || p.includes('height') || p.includes('gap') || p.includes('thickness') || p.includes('length')) {
    const base = isNaN(d) ? 20 : d; r = { min: 0, max: Math.max(100, Math.round(base * 4)), step: 1 };
  } else if (p.includes('seed')) r = { min: 0, max: 100, step: 1 };
  else { const base = isNaN(d) ? 10 : d; r = { min: 0, max: Math.max(100, Math.round(base * 4)), step: 1 }; }
  // 让范围容纳默认值，并按默认值数量级设置合理步长
  if (!isNaN(d)) {
    if (d > r.max) r.max = Math.ceil(d * 1.5);
    if (d < r.min) r.min = Math.floor(d * 1.5);
    const ad = Math.abs(d);
    r.step = ad > 0 && ad < 1 ? 0.01 : (ad < 10 ? 0.1 : (ad < 100 ? 1 : Math.max(1, Math.round(r.max / 100))));
  }
  return r;
}

const KNOB_CONFIGS = {};
const DEFAULTS = {};
for (const comp of Object.keys(tunableRaw)) {
  const props = tunableRaw[comp];
  const captured = captureDefaults(comp);
  const knobs = [];
  const defs = {};
  for (const [prop, info] of Object.entries(props)) {
    if (DENY.has(prop)) continue;
    let def = info.def;
    if ((def === undefined || def === '') && captured[prop] !== undefined) def = captured[prop];
    const type = info.type;
    const t = type.trim();
    // 跳过复杂类型（对象 / 函数 / 数组 / JSX 节点）——这些不适合作为可视化旋钮
    if (/[{}]|=>|ReactNode|JSX|\(\)|\[\]|Array<|FC/.test(t)) continue;
    if (SKIP_TYPE.has(t)) continue;
    let knob;
    if (type.includes('boolean')) {
      knob = { prop, label: labelFor(prop), type: 'boolean', default: def === 'true' || def === true };
    } else if (isColorName(prop) && type.includes('string')) {
      const c = (def && isHexOrNamed(def)) ? String(def).replace(/^['"]|['"]$/g, '') : (COLOR_DEFAULTS[prop] || '#22d3ee');
      knob = { prop, label: labelFor(prop), type: 'color', default: c };
    } else if (isHexOrNamed(def) && type.includes('string')) {
      knob = { prop, label: labelFor(prop), type: 'color', default: String(def).replace(/^['"]|['"]$/g, '') };
    } else if (ALIAS_SELECT[t]) {
      const opts = ALIAS_SELECT[t];
      knob = { prop, label: labelFor(prop), type: 'select', default: (def ? String(def).replace(/^['"]|['"]$/g, '') : opts[0]), options: opts.map(o => ({ value: o, label: o })) };
    } else {
      const unionOpts = type.match(/'([^']+)'/g);
      const isPureUnion = unionOpts && unionOpts.length >= 2 && !type.includes('number') && !type.includes('boolean');
      if (isPureUnion) {
        const opts = unionOpts.map(s => s.replace(/'/g, ''));
        knob = { prop, label: labelFor(prop), type: 'select', default: (def ? String(def).replace(/^['"]|['"]$/g, '') : opts[0]), options: opts.map(o => ({ value: o, label: o })) };
      } else if (type.includes('number')) {
        const r = rangeFor(prop, def);
        const dv = parseFloat(def);
        const finalDefault = isNaN(dv) ? (r.min + (r.max - r.min) / 2) : dv;
        knob = { prop, label: labelFor(prop), type: 'number', default: finalDefault, ...r };
      } else {
        knob = { prop, label: labelFor(prop), type: 'text', default: def ? String(def).replace(/^['"]|['"]$/g, '') : '' };
      }
    }
    knobs.push(knob);
    defs[prop] = knob.default;
  }
  if (knobs.length) { KNOB_CONFIGS[comp] = knobs; DEFAULTS[comp] = defs; }
}
fs.writeFileSync('/tmp/anim_knob_configs.json', JSON.stringify({ KNOB_CONFIGS, DEFAULTS }, null, 1));
let total = 0;
for (const [k, v] of Object.entries(KNOB_CONFIGS)) { total += v.length; console.log(`${k}: ${v.length}`); }
console.log('总旋钮:', total, '组件:', Object.keys(KNOB_CONFIGS).length);
