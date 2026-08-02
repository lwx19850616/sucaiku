// ============================================================
//  站点内容数据 —— 想改名字 / 项目 / 经历，只改这个文件即可
// ============================================================

export const profile = {
  name: 'lwx19850616',          // 你的名字 / 昵称（可改成真实姓名）
  role: '全栈开发工程师',         // 主标题下方角色
  roleEn: 'Full-Stack Developer',
  tagline:
    '我用代码把想法变成产品。专注 Web 全栈开发，喜欢打磨细节与流畅的交互体验。',
  location: '中国',
  email: '1530711713@qq.com',
  github: 'https://github.com/lwx19850616',
  githubUser: 'lwx19850616',
};

export const nav = [
  { id: 'home', label: '首页' },
  { id: 'skills', label: '技术栈' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '作品' },
  { id: 'ai-tools', label: 'AI工具' },
  { id: 'showcase', label: '演示' },
  { id: 'contact', label: '联系' },
];

// AI 工具箱（首页板块 + 独立子页面）
// type: 'tutorial' = 教程页（ToolTutorial） | 'demo' = 可交互功能页
// github 用搜索 URL，避免编造具体仓库地址导致 404
export const aiTools = [
  {
    id: 'cc-switch',
    icon: '🎛️',
    name: 'cc-switch',
    tagline: '开源 AI 供应商切换器',
    desc: '一键切换多家 AI 供应商，统一管理 Skills 与 MCP，团队配置可共享。',
    type: 'tutorial',
    github: 'https://github.com/search?q=cc-switch+ai+provider&type=repositories',
  },
  {
    id: 'open-design',
    icon: '🎨',
    name: 'open-design',
    tagline: 'AI 设计稿生成',
    desc: '用自然语言生成可编辑的设计稿，支持 BYOK 接入你自己的模型。',
    type: 'tutorial',
    github: 'https://github.com/search?q=open-design+ai&type=repositories',
  },
  {
    id: 'page-agent',
    icon: '🤖',
    name: 'page-agent',
    tagline: '自然语言操控网页',
    desc: '用一句话筛选、排序、高亮页面元素，把网页变成可被语言指挥的界面。',
    type: 'demo',
    github: 'https://github.com/search?q=page-agent&type=repositories',
  },
  {
    id: 'ai-website-cloner',
    icon: '📋',
    name: 'ai-website-cloner',
    tagline: 'AI 克隆网站',
    desc: '输入一个网址，自动抓取结构并生成可部署的本地项目。',
    type: 'tutorial',
    github: 'https://github.com/search?q=ai-website-cloner&type=repositories',
  },
  {
    id: 'shannon',
    icon: '🔒',
    name: 'shannon',
    tagline: '安全渗透扫描',
    desc: 'Docker 一键部署的渗透测试与漏洞扫描工具，报告可读、可接 CI。',
    type: 'tutorial',
    github: 'https://github.com/search?q=shannon+security+scanner&type=repositories',
  },
  {
    id: 'frontend-slides',
    icon: '📊',
    name: 'frontend-slides',
    tagline: '前端幻灯片',
    desc: '用前端组件写演示文稿，三套精美幻灯片可在线翻页体验。',
    type: 'demo',
    github: 'https://github.com/search?q=frontend-slides&type=repositories',
  },
];

// 技术栈（按分类展示）
export const skills = [
  {
    category: '前端',
    items: [
      { name: 'React', color: '#61dafb' },
      { name: 'Vue', color: '#42b883' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Tailwind CSS', color: '#38bdf8' },
      { name: 'Framer Motion', color: '#e879f9' },
    ],
  },
  {
    category: '后端',
    items: [
      { name: 'Node.js', color: '#3c873a' },
      { name: 'Express', color: '#888888' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'MongoDB', color: '#4db33d' },
      { name: 'Docker', color: '#2496ed' },
    ],
  },
  {
    category: '工具 & 其他',
    items: [
      { name: 'Git', color: '#f1502f' },
      { name: 'Vite', color: '#646cff' },
      { name: 'Linux', color: '#f5c542' },
      { name: 'Figma', color: '#f24e1e' },
    ],
  },
];

// 工作经历（时间线）
export const experience = [
  {
    company: '某科技公司',
    role: '全栈开发工程师',
    period: '2024 — 至今',
    points: [
      '从需求到上线独立负责多个核心功能模块。',
      '搭建自动化构建与部署流程，显著缩短发布周期。',
      '优化前端加载性能，资源加载时间下降约 40%。',
    ],
  },
  {
    company: '自由职业 / 接单',
    role: '前端开发',
    period: '2022 — 2024',
    points: [
      '为多家客户把零散的 Excel 流程改造为内部工具。',
      '交付可视化看板与内容管理系统，贴合客户工作流。',
      '坚持干净、可维护的代码与易用的界面。',
    ],
  },
];

// 作品集（卡片轮播）
export const projects = [
  {
    title: 'StoreKit',
    desc: '轻量级电商交易平台，支持商品管理与结算流程。',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Coding Ducks',
    desc: '实时编程练习平台，边写边运行，即时反馈。',
    tags: ['Vue', 'WebSocket', 'MongoDB'],
    link: '#',
  },
  {
    title: 'Gumbalup',
    desc: '实时在线答题平台，支持多人同屏竞答。',
    tags: ['React', 'Socket.io'],
    link: '#',
  },
  {
    title: 'PeakPosts',
    desc: 'AI 驱动的社交媒体内容创作 SaaS。',
    tags: ['Next.js', 'OpenAI', 'Tailwind'],
    link: '#',
  },
  {
    title: 'Kanbi',
    desc: '实时项目协作看板，任务流转一目了然。',
    tags: ['React', 'DnD', 'Express'],
    link: '#',
  },
];

// 演示实验室（点击预览卡片进入全屏演示）
// preview 决定卡片缩略图样式；详情区由 Showcase.jsx 按 id 渲染
export const showcase = [
  {
    id: 'fonts',
    title: '文字组件',
    en: 'Text',
    desc: 'React Bits 全部 23 个文字动效组件，逐个实时预览：故障、解密、环形、渐变、压力感应……',
    accent: '#a78bfa',
    preview: 'fonts',
  },
  {
    id: 'components',
    title: '组件动画',
    en: 'Components',
    desc: 'React Bits 全部 31 个动画组件，逐个实时预览：Dock、Aurora、Particles、Magnet、Tilted Card……',
    accent: '#f472b6',
    preview: 'components',
  },
  {
    id: 'backgrounds',
    title: '背景特效',
    en: 'Backgrounds',
    desc: '星空、星云、网格与极光等多种太空背景，随手切换。',
    accent: '#38bdf8',
    preview: 'backgrounds',
  },
];
