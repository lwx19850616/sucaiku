/**
 * AuroraBackground —— 炫光流动背景（React Bits 风格）
 * 放在区块最外层，子内容会浮在背景之上。
 */
export default function AuroraBackground({ children, className = '' }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>
      {children}
    </div>
  )
}
