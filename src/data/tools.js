// 工作室工具数据：三个 1:1 复刻自 React Bits 的工具
// 每个工具有一个路由路径和对应的页面组件
export const TOOLS = [
  {
    slug: 'background-studio',
    en: 'Background Studio',
    zh: '背景工作室',
    icon: '🎨',
    desc: '探索动画背景，自定义参数，导出为图片/视频/代码',
  },
  {
    slug: 'shape-magic',
    en: 'Shape Magic',
    zh: '形状魔法',
    icon: '🔷',
    desc: '组合形状、创建内圆角，导出 SVG/React/CSS',
  },
  {
    slug: 'texture-lab',
    en: 'Texture Lab',
    zh: '纹理实验室',
    icon: '🧪',
    desc: '对图片应用噪点/抖动/ASCII 等效果，高质量导出',
  },
];

export const TOOLS_BY_SLUG = TOOLS.reduce((map, t) => ({ ...map, [t.slug]: t }), {});
