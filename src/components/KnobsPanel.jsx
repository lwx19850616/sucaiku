// 通用交互控制面板 — 对应 React Bits 组件页下方的 Customize knobs
// 支持：滑块(number)、开关(boolean)、选择器(select)、颜色(color)
import { useState, useEffect } from 'react';

/**
 * @typedef {{ prop: string, label: string, type: 'number'|'boolean'|'select'|'color', default: any, min?: number, max?: number, step?: number, options?: {value:any,label:string}[] }} Knob
 */

/**
 * KnobsPanel — 根据 knob 配置数组动态生成控件，通过 onChange 将变更提升到父组件
 * @param {{ knobs: Knob[], values: object, onChange: (prop:string, val:any) => void }}
 */
export default function KnobsPanel({ knobs = [], values = {}, onChange }) {
  if (!knobs.length) return null;

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
        自定义 · Customize
      </h3>
      <div className="flex flex-wrap gap-4">
        {knobs.map((knob) => (
          <KnobControl
            key={knob.prop}
            knob={knob}
            value={values[knob.prop] ?? knob.default}
            onChange={(v) => onChange(knob.prop, v)}
          />
        ))}
      </div>
    </div>
  );
}

function KnobControl({ knob, value, onChange }) {
  const { label, type } = knob;

  switch (type) {
    case 'number':
      return <SliderKnob label={label} value={value} onChange={onChange} min={knob.min} max={knob.max} step={knob.step} />;
    case 'boolean':
      return <ToggleKnob label={label} value={value} onChange={onChange} />;
    case 'select':
      return <SelectKnob label={label} value={value} onChange={onChange} options={knob.options} />;
    case 'color':
      return <ColorKnob label={label} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

function SliderKnob({ label, value, onChange, min = 0, max = 100, step = 1 }) {
  return (
    <div className="flex flex-col gap-1 min-w-[100px] max-w-[180px] flex-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-white/50">{label}</span>
        <span className="text-[11px] font-mono text-white/70">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-cyan-400 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
      />
    </div>
  );
}

function ToggleKnob({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer rounded accent-cyan-400"
      />
      <span className="text-[12px] text-white/60">{label}</span>
    </label>
  );
}

function SelectKnob({ label, value, onChange, options = [] }) {
  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      <span className="text-[11px] text-white/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 outline-none focus:border-cyan-400/50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-800 text-white">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorKnob({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 min-w-[80px]">
      <span className="text-[11px] text-white/50">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-10 cursor-pointer rounded border border-white/10 bg-transparent p-0"
        />
        <span className="text-[10px] font-mono text-white/40">{value}</span>
      </div>
    </div>
  );
}
