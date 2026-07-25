// 将 /tmp/anim_knob_configs.json 转换为 src/demos/animKnobConfigs.js
// 应用少量「组件级特例覆盖」以保证 1:1 还原（如 ImageTrail 的 variant 应为 1–8 选择）。
const fs = require('fs');

const src = JSON.parse(fs.readFileSync('/tmp/anim_knob_configs.json', 'utf8'));
const { KNOB_CONFIGS, DEFAULTS } = src;

// ── 组件级特例覆盖 ──
// 每个条目：{ 组件名: { prop名: 部分覆盖字段 } }
const OVERRIDES = {
  ImageTrail: {
    variant: {
      type: 'select',
      default: 1,
      options: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ value: n, label: String(n) })),
    },
  },
  PixelTrail: {
    interpolate: { type: 'number', default: 0.1, min: 0, max: 1, step: 0.01 },
  },
};

function applyOverride(comp, knob) {
  const ov = OVERRIDES[comp] && OVERRIDES[comp][knob.prop];
  if (!ov) return knob;
  const merged = { ...knob, ...ov };
  // 同步默认值到 DEFAULTS
  return merged;
}

const finalKnobs = {};
const finalDefaults = {};
for (const comp of Object.keys(KNOB_CONFIGS)) {
  const knobs = KNOB_CONFIGS[comp].map((k) => applyOverride(comp, k));
  finalKnobs[comp] = knobs;
  const defs = {};
  for (const k of knobs) defs[k.prop] = k.default;
  finalDefaults[comp] = defs;
  // 用覆盖默认值回填 DEFAULTS（若 OVERRIDES 改了 default）
  if (OVERRIDES[comp]) {
    for (const [prop, ov] of Object.entries(OVERRIDES[comp])) {
      if (ov.default !== undefined) finalDefaults[comp][prop] = ov.default;
    }
  }
}

function serializeKnobs(arr) {
  return arr
    .map((k) => {
      const parts = [`prop: ${JSON.stringify(k.prop)}`, `label: ${JSON.stringify(k.label)}`, `type: ${JSON.stringify(k.type)}`, `default: ${JSON.stringify(k.default)}`];
      if (k.min !== undefined) parts.push(`min: ${k.min}`);
      if (k.max !== undefined) parts.push(`max: ${k.max}`);
      if (k.step !== undefined) parts.push(`step: ${k.step}`);
      if (k.options) parts.push(`options: ${JSON.stringify(k.options)}`);
      return '    {\n      ' + parts.join(',\n      ') + '\n    }';
    })
    .join(',\n');
}

function serializeDefaults(obj) {
  const inner = Object.entries(obj)
    .map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
    .join(',\n');
  return '{\n' + inner + '\n  }';
}

let out = '// 自动生成：动画组件 Customize 旋钮配置（基于各组件真实对外 prop API 1:1 提取）\n';
out += '// 生成脚本：scripts/gen_anim_props.cjs + scripts/gen_anim_knobs.cjs + scripts/build_anim_knob_configs.cjs\n';
out += '// 共 ' + Object.keys(finalKnobs).length + ' 个组件，' + Object.values(finalKnobs).reduce((a, b) => a + b.length, 0) + ' 个旋钮\n\n';
out += 'export const ANIM_KNOB_CONFIGS = {\n';
for (const comp of Object.keys(finalKnobs)) {
  out += '  "' + comp + '": [\n' + serializeKnobs(finalKnobs[comp]) + '\n  ],\n';
}
out += '};\n\n';
out += 'export const ANIM_DEFAULTS = {\n';
for (const comp of Object.keys(finalDefaults)) {
  out += '  "' + comp + '": ' + serializeDefaults(finalDefaults[comp]) + ',\n';
}
out += '};\n';

fs.writeFileSync('src/demos/animKnobConfigs.js', out);
console.log('已写入 src/demos/animKnobConfigs.js');
console.log('组件:', Object.keys(finalKnobs).length, '旋钮:', Object.values(finalKnobs).reduce((a, b) => a + b.length, 0));
