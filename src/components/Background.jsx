import Starfield from './Starfield'

// 复刻 nareshkhatri.dev 的固定背景：
// 1) 全屏对角渐变（暗：接近原站深空黑；亮：浅灰渐变）
// 2) 星空层（Canvas 2D，还原原站 Three.js 粒子星点云 —— 缓慢漂移 + 闪烁 + 偶发流星）
// 3) 品牌色光晕（太空星云感）
// 4) 顶部细光，呼应导航
// 5) 底部渐隐，保证文字清晰
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 1. 基础底色：暗色为极深冷黑，亮色为浅灰白 */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-[#050508]" />

      {/* 2. 深蓝/紫 subtle 星云渐变（还原太空深邃感，不会发灰） */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 44, 128, 0.22), transparent), ' +
            'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(22, 44, 88, 0.18), transparent), ' +
            'radial-gradient(ellipse 50% 35% at 20% 80%, rgba(88, 32, 64, 0.12), transparent)',
        }}
      />

      {/* 3. 星空层（核心：还原原站太空星点背景） */}
      <Starfield />

      {/* 4. 顶部极淡的冷光，呼应导航 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent" />

      {/* 5. 暗角：让中心内容聚焦，四周更深邃 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-80"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* 6. 底部渐隐（保证文字清晰） */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050508] to-transparent" />
    </div>
  )
}
