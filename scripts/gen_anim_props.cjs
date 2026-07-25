const fs = require('fs');
const path = require('path');
const dir = 'src/bits/Animations';
const comps = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).sort();
const out = {};
const propRe = /^\s*([A-Za-z_][\w]*)\s*(\?)?\s*:\s*([^=;]+?)(?:\s*=\s*([^;]+))?\s*;?\s*$/gm;

for (const f of comps) {
  const name = f.replace(/\.tsx$/, '');
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const blockRe = new RegExp(
    '(?:interface\\s+' + name + 'Props\\s*(?:extends[^\\{]*?)?|type\\s+' + name + 'Props\\s*=\\s*)\\{([\\s\\S]*?)\\n\\}',
    'g'
  );
  const types = {};
  let bm;
  while ((bm = blockRe.exec(t))) {
    const body = bm[1];
    let pm;
    propRe.lastIndex = 0;
    while ((pm = propRe.exec(body))) {
      types[pm[1]] = { optional: !!pm[2], type: pm[3].trim(), def: pm[4] ? pm[4].trim() : undefined };
    }
  }
  // 默认值从主函数解构
  // 额外：捕获泛型主块 type Props / interface Props / type Config（当组件用 :Props 时）
  const genericRe = /(?:interface|type)\s+(Props|Config|Options)\s*(?:=|\s*extends[^\{]*?)?\s*\{([\s\S]*?)\n\}/g;
  let gm;
  while ((gm = genericRe.exec(t))) {
    const body = gm[2] || gm[1];
    let pm;
    propRe.lastIndex = 0;
    while ((pm = propRe.exec(body))) {
      if (!types[pm[1]]) types[pm[1]] = { optional: !!pm[2], type: pm[3].trim(), def: pm[4] ? pm[4].trim() : undefined };
    }
  }
  const defRe = new RegExp(
    'function\\s+' + name + '\\s*\\(\\s*\\{([\\s\\S]*?)\\}\\s*(?::\\s*[\\w\\s,<>]*Props)?\\s*\\)|' +
    name + '\\s*:\\s*(?:React\\.)?FC<[^>]*>\\s*=\\s*\\(\\s*\\{([\\s\\S]*?)\\}'
  );
  const dm = defRe.exec(t);
  const defaults = {};
  if (dm) {
    const body = dm[1] || dm[2] || '';
    const dre = /([A-Za-z_][\w]*)\s*(?::\s*[^=]+)?\s*=\s*([^,}\n]+)/g;
    let d;
    while ((d = dre.exec(body))) {
      defaults[d[1]] = d[2].trim();
    }
  }
  out[name] = { types, defaults };
}

out['GradualBlur'] = {
  types: {
    position: { optional: true, type: 'top | bottom | left | right', def: 'top' },
    strength: { optional: true, type: 'number', def: '1' },
    divCount: { optional: true, type: 'number', def: '10' },
    exponential: { optional: true, type: 'boolean', def: 'false' },
    animated: { optional: true, type: 'boolean | scroll', def: 'true' },
    duration: { optional: true, type: 'string', def: '0.3s' },
    easing: { optional: true, type: 'string', def: 'ease-out' },
    opacity: { optional: true, type: 'number', def: '1' },
    curve: { optional: true, type: 'linear | bezier | ease-in | ease-out | ease-in-out', def: 'ease-out' },
    preset: { optional: true, type: 'top | bottom | left | right | subtle | intense', def: undefined }
  },
  defaults: { position: 'top', strength: 1, divCount: 10, exponential: false, animated: true, duration: '0.3s', easing: 'ease-out', opacity: 1, curve: 'ease-out' }
};
out['StarBorder'] = {
  types: { color: { optional: true, type: 'string', def: 'white' }, speed: { optional: true, type: 'string', def: '6s' } },
  defaults: { color: 'white', speed: '6s' }
};

fs.writeFileSync('/tmp/anim_props.json', JSON.stringify(out, null, 1));

const EXCLUDE = new Set(['children', 'className', 'style', 'containerRef', 'renderItem', 'ariaLabel', 'filterId', 'id', 'ref', 'onChange', 'onClick', 'onMouseMove', 'glProps', 'canvasProps', 'wrapperClassName', 'innerClassName']);
const REQUIRED_DATA = new Set(['images', 'logos', 'firstContent', 'secondContent', 'imageSrc', 'items', 'customPath', 'centerContent']);
const tunable = {};
const allProps = new Set();
for (const [k, v] of Object.entries(out)) {
  const t = {};
  for (const [p, info] of Object.entries(v.types)) {
    if (EXCLUDE.has(p) || REQUIRED_DATA.has(p)) continue;
    t[p] = info;
    allProps.add(p);
  }
  tunable[k] = t;
}
fs.writeFileSync('/tmp/anim_tunable.json', JSON.stringify(tunable, null, 1));

console.log('组件数:', Object.keys(tunable).length);
console.log('可调 prop 去重:', allProps.size);
console.log([...allProps].sort().join(', '));
