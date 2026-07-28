// 复刻 nareshkhatri.dev 的固定背景：
// 1) 全屏对角渐变（暗：from-black via-zinc-600/20 to-black；亮：浅灰渐变）
// 2) 极淡的网格纹理缓慢漂移
// 3) 两团品牌色光晕（珊瑚橙）浮动
// 4) 底部渐隐，保证文字清晰
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 基础对角渐变 */}
      <div className="absolute inset-0 dark:bg-gradient-to-tl from-black via-zinc-600/20 to-black bg-gradient-to-br from-zinc-100 via-white to-zinc-200" />

      {/* 缓慢漂移的网格纹理（动画 background-position，无缝循环） */}
      <div
        className="absolute inset-0 bg-grid opacity-[0.35]"
        style={{ animation: 'grid-drift 22s linear infinite' }}
      />

      {/* 品牌色光晕 */}
      <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-brand/20 blur-[130px] animate-float" />
      <div
        className="absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-brand/10 blur-[130px] animate-float"
        style={{ animationDelay: '2.5s' }}
      />

      {/* 顶部细光，呼应导航 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      {/* 底部渐隐 */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
