#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract default props + generate control schema from src/bits/Backgrounds/*.tsx
Run from repo root: python scripts/extract_bg_props.py
Outputs a JSON file at src/data/bgProps.json for ComponentPage to consume.
"""
import json, re
from pathlib import Path
from collections import OrderedDict

BG_DIR = Path('src/bits/Backgrounds')
OUT = Path('src/data/bgProps.json')

# Known enum props (string propName -> [options])
KNOWN_ENUMS = {
    'direction': ['forward', 'reverse', 'pingpong'],
    'blendMode': ['normal', 'screen', 'overlay', 'multiply', 'lighten'],
    'shineDirection': ['left', 'right'],
    'flowDirection': ['up', 'down', 'left', 'right'],
    'quality': ['low', 'medium', 'high'],
    'animationType': ['rotate', 'rotate3d', 'none'],
    'shape': ['square', 'circle'],
    'variant': ['square', 'circle'],
    'raysOrigin': ['top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right', 'left-center', 'right-center'],
    'origin': ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    'lineStyle': ['solid', 'dashed', 'dotted'],
    'scanDirection': ['forward', 'reverse', 'pingpong'],
}

# Manual overrides for components whose defaults can't be parsed statically
MANUAL_OVERRIDES = {
    'GridScan': {
        'defaults': {
            'enableWebcam': False,
            'showPreview': False,
            'modelsPath': '/assets/3d/',
            'lineThickness': 1,
            'linesColor': '#2F293A',
            'scanColor': '#FF9FFC',
            'scanOpacity': 0.4,
            'gridScale': 0.1,
            'lineStyle': 'solid',
            'lineJitter': 0.1,
            'scanDirection': 'pingpong',
            'enablePost': True,
            'bloomIntensity': 0,
            'bloomThreshold': 0,
            'bloomSmoothing': 0,
            'chromaticAberration': 0.002,
            'noiseIntensity': 0.01,
            'scanGlow': 0.5,
            'scanSoftness': 2,
            'scanPhaseTaper': 0.9,
            'scanDuration': 2.0,
            'scanDelay': 2.0,
            'enableGyro': False,
            'scanOnClick': False,
            'snapBackDelay': 250,
        },
        'controls': {}
    },
    'LiquidEther': {
        'defaults': {
            'colors': ['#A6C8FF', '#5227FF', '#FF9FFC'],
            'speed': 1.0,
            'scale': 1.0,
            'opacity': 1.0,
            'className': '',
        },
        'controls': {}
    },
    'LightRays': {
        'defaults': {
            'raysOrigin': 'top-center',
            'raysColor': '#ffffff',
            'raysSpeed': 1,
            'lightSpread': 1,
            'rayLength': 2,
            'pulsating': False,
            'fadeDistance': 1.0,
            'saturation': 1.0,
            'followMouse': True,
            'mouseInfluence': 0.1,
            'noiseAmount': 0.0,
            'distortion': 0.0,
            'className': '',
        },
        'controls': {}
    },
    'Hyperspeed': {
        'defaults': {
            'distortion': 'none',
            'length': 400,
            'roadWidth': 10,
            'islandWidth': 2,
            'lanesPerRoad': 4,
            'fogColor': 0xffffff,
            'fogDensity': 0.02,
            'fov': 90,
            'fogNear': 1,
            'fogFar': 500,
            'speedUp': 0,
            'slowDown': 0,
        },
        'controls': {}
    },
}


def parse_literal(s: str):
    s = s.strip()
    if s.startswith('"') and s.endswith('"'):
        return s[1:-1]
    if s.startswith("'") and s.endswith("'"):
        return s[1:-1]
    if s == 'true':
        return True
    if s == 'false':
        return False
    if s == 'undefined' or s == 'null':
        return None
    # number
    try:
        if '.' in s or 'e' in s.lower():
            return float(s)
        return int(s)
    except ValueError:
        pass
    # array of string literals
    if s.startswith('[') and s.endswith(']'):
        inner = s[1:-1].strip()
        if not inner:
            return []
        parts = []
        cur = ''
        in_quotes = False
        quote_char = None
        for ch in inner:
            if ch in ('"', "'"):
                if not in_quotes:
                    in_quotes = True
                    quote_char = ch
                elif quote_char == ch:
                    in_quotes = False
                    quote_char = None
                cur += ch
            elif ch == ',' and not in_quotes:
                parts.append(cur.strip())
                cur = ''
            else:
                cur += ch
        if cur.strip():
            parts.append(cur.strip())
        arr = []
        for p in parts:
            v = parse_literal(p)
            arr.append(v)
        return arr
    # fallback: expression string
    return s


def infer_control(name: str, default):
    """Return a control definition dict from prop name + default value."""
    lowered = name.lower()

    # Colors array
    if isinstance(default, list) and all(isinstance(x, str) and re.match(r'^#[0-9a-fA-F]{6}$', str(x)) for x in default):
        return {'type': 'colors', 'label': prop_label(name), 'default': default, 'max': 8}

    # Single color
    if isinstance(default, str) and re.match(r'^#[0-9a-fA-F]{6}$', default):
        return {'type': 'color', 'label': prop_label(name), 'default': default}

    # Boolean
    if isinstance(default, bool):
        return {'type': 'boolean', 'label': prop_label(name), 'default': default}

    # Enum / known string select
    if name in KNOWN_ENUMS and isinstance(default, str):
        return {'type': 'select', 'label': prop_label(name), 'default': default, 'options': KNOWN_ENUMS[name]}

    # Number ranges
    if isinstance(default, (int, float)):
        if 'speed' in lowered or 'fps' in lowered or 'damp' in lowered:
            return {'type': 'range', 'label': prop_label(name), 'default': default, 'min': 0, 'max': 5, 'step': 0.05}
        if any(x in lowered for x in ['opacity', 'alpha', 'intensity', 'glow', 'noise', 'contrast', 'brightness', 'blend', 'spread', 'amp', 'taper']):
            return {'type': 'range', 'label': prop_label(name), 'default': default, 'min': 0, 'max': 2, 'step': 0.01}
        if any(x in lowered for x in ['count', 'size', 'iterations', 'segments', 'rings', 'layers', 'samples', 'points', 'particles', 'width', 'length', 'grid', 'square', 'dot', 'thickness', 'delay', 'duration']):
            max_val = max(100, int(default * 2) if default else 100)
            return {'type': 'range', 'label': prop_label(name), 'default': default, 'min': 0, 'max': max_val, 'step': 1}
        if any(x in lowered for x in ['scale', 'zoom', 'density', 'radius', 'amplitude', 'jitter', 'distance', 'influence', 'amount']):
            return {'type': 'range', 'label': prop_label(name), 'default': default, 'min': 0.1, 'max': 10, 'step': 0.05}
        if any(x in lowered for x in ['rotation', 'angle']):
            return {'type': 'range', 'label': prop_label(name), 'default': default, 'min': -180, 'max': 180, 'step': 1}
        return {'type': 'range', 'label': prop_label(name), 'default': default, 'min': 0, 'max': max(10, default * 2 if default else 10), 'step': 0.1}

    if isinstance(default, str):
        return {'type': 'text', 'label': prop_label(name), 'default': default}

    return {'type': 'text', 'label': prop_label(name), 'default': default}


def prop_label(name: str) -> str:
    s = re.sub(r'([A-Z])', r' \1', name).strip().lower()
    mapping = {
        'color': '颜色',
        'colors': '颜色组',
        'background color': '背景色',
        'bg color': '背景色',
        'speed': '速度',
        'scale': '缩放',
        'opacity': '不透明度',
        'rotation': '旋转',
        'angle': '角度',
        'direction': '方向',
        'zoom': '缩放',
        'density': '密度',
        'intensity': '强度',
        'glow': '辉光',
        'twinkle': '闪烁',
        'mouse interaction': '鼠标交互',
        'mouse strength': '鼠标强度',
        'mouse radius': '鼠标半径',
        'mouse dampening': '鼠标阻尼',
        'mix blend mode': '混合模式',
        'dpr': '像素比',
        'paused': '暂停',
        'iterations': '迭代次数',
        'render scale': '渲染缩放',
        'max dpr': '最大像素比',
        'target fps': '目标帧率',
        'streak count': '光线数量',
        'streak width': '光线宽度',
        'streak length': '光线长度',
        'background glow': '背景辉光',
        'particle count': '粒子数量',
        'particle color': '粒子颜色',
        'light spread': '光线扩散',
        'rays color': '光线颜色',
        'rays speed': '光线速度',
        'rotation speed': '旋转速度',
        'grid size': '网格大小',
        'grid color': '网格颜色',
        'ripple intensity': '涟漪强度',
        'square size': '方块大小',
        'dot size': '点大小',
        'dot spacing': '点间距',
        'blind count': '百叶数量',
        'noise': '噪点',
        'gradient color': '渐变颜色',
        'base color': '基础颜色',
        'line color': '线条颜色',
        'spin speed': '旋转速度',
        'spin rotation': '旋转角度',
        'wave speed x': 'X 波速',
        'wave amp x': 'X 波幅',
        'glitch speed': '故障速度',
        'amplitude': '振幅',
        'blend': '混合',
    }
    for en, zh in mapping.items():
        if s == en:
            return zh
    return ' '.join([w.capitalize() for w in s.split()])


def _add_prop(props: dict, chunk: str):
    m = re.match(r"^([A-Za-z_$][\w$]*)\s*(?:\?:\s*[^=]+)?\s*=\s*(.+)$", chunk, re.DOTALL)
    if not m:
        return
    name = m.group(1)
    val_str = m.group(2).strip()
    val_str = re.sub(r'\s+as\s+.*$', '', val_str)
    val = parse_literal(val_str)
    props[name] = val


def split_body(body: str):
    props = OrderedDict()
    i = 0
    n = len(body)
    depth = 0
    start = 0
    while i < n:
        ch = body[i]
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        elif ch == ',' and depth == 0:
            chunk = body[start:i].strip()
            if chunk:
                _add_prop(props, chunk)
            start = i + 1
        i += 1
    chunk = body[start:].strip()
    if chunk:
        _add_prop(props, chunk)
    return props


def extract_defaults(tsx: str, name: str):
    """Extract prop defaults from a TSX functional component named `name`."""
    body = None

    # Pattern 1: export default function Name({...}: Type) {
    # Pattern 2: function Name({...}: Type) {
    p = re.compile(
        rf'(?:export\s+default\s+)?function\s+{name}\s*\(\s*\{{([^}}]*(?:\{{[^}}]*\}}[^}}]*)*)\}}\s*(?::\s*[^)]+)?\s*\)',
        re.DOTALL
    )
    m = p.search(tsx)
    if m:
        body = m.group(1)
    else:
        # Pattern 3: const Name: FC<...> = ({...}: Type) => {
        # Pattern 4: const Name = memo(({...}: Type) => {
        # Pattern 5: const Name = forwardRef(({...}: Type) => {
        p2 = re.compile(
            rf'(?:export\s+)?const\s+{name}\s*(?::\s*(?:React\.)?FC<[^>]+>)?\s*=\s*(?:memo\s*\(\s*)?(?:forwardRef\s*\(\s*)?\(\s*\{{([^}}]*(?:\{{[^}}]*\}}[^}}]*)*)\}}\s*(?::\s*[^)]+)?\s*\)',
            re.DOTALL
        )
        m2 = p2.search(tsx)
        if m2:
            body = m2.group(1)
        else:
            # Pattern 6: function Name(props: Props) { const { defaults } = props;
            # Pattern 7: const Name = (props: Props) => { const { defaults } = props;
            p3 = re.compile(
                rf'(?:export\s+default\s+)?(?:function|const)\s+{name}\s*(?:<[^>]+>)?\s*\(\s*props\s*(?::\s*[^)]+)?\s*\)\s*(?:=>\s*)?\{{',
                re.DOTALL
            )
            m3 = p3.search(tsx)
            if m3:
                inner = tsx[m3.end():]
                dm = re.search(r'const\s*\{\s*([^}]*(?:\{[^}]*\}[^}]*)*)\}\s*=\s*props\s*;?', inner)
                if dm:
                    body = dm.group(1)

    if body is None:
        return {}

    body = re.sub(r'/\*.*?\*/', '', body, flags=re.DOTALL)
    body = re.sub(r'//.*$', '', body, flags=re.MULTILINE)
    return split_body(body)


def main():
    result = OrderedDict()
    for fpath in sorted(BG_DIR.glob('*.tsx')):
        name = fpath.stem
        tsx = fpath.read_text(encoding='utf-8')

        if name in MANUAL_OVERRIDES:
            defaults = MANUAL_OVERRIDES[name]['defaults']
        else:
            defaults = extract_defaults(tsx, name)

        controls = OrderedDict()
        for prop, default in defaults.items():
            controls[prop] = infer_control(prop, default)

        result[name] = {
            'defaults': defaults,
            'controls': controls,
        }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Wrote {len(result)} background prop configs to {OUT}')
    empty = [k for k, v in result.items() if not v['defaults']]
    if empty:
        print('empty defaults:', empty)


if __name__ == '__main__':
    main()
