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
      {/* 基础对角渐变 */}
      <div className="absolute inset-0 dark:bg-gradient-to-tl from-black via-zinc-900/60 to-black bg-gradient-to-br from-zinc-100 via-white to-zinc-200" />

      {/* 星空层（核心：还原原站太空星点背景） */}
      <Starfield />

      {/* 品牌色光晕（太空星云感） */}
      <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-brand/15 blur-[140px] animate-float" />
      <div
        className="absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-brand/10 blur-[140px] animate-float"
        style={{ animationDelay: '2.5s' }}
      />

      {/* 顶部细光，呼应导航 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      {/* 底部渐隐 */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
