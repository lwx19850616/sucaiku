# 个人作品集网站（中文 · React Bits 风格）

一个用 **Vite + React + Tailwind CSS + Framer Motion** 搭的单页作品集，
动画组件（文字模糊入场、炫光背景、3D 倾斜卡片、磁吸按钮、滚动进场）
都是参考 [React Bits](https://www.reactbits.dev) 风格自己实现的。

## 本地预览

```bash
npm install
npm run dev      # 打开终端里给出的本地地址
```

## 改成你自己的内容

所有文字都是占位中文，直接改这几个文件即可，不需要懂代码逻辑：

| 想改什么 | 改哪个文件 |
|---------|-----------|
| 名字、导航 | `src/components/Navbar.jsx` |
| 首屏大标题/按钮 | `src/components/Hero.jsx` |
| 关于我介绍 | `src/components/About.jsx` |
| 作品项目（标题/描述/链接） | `src/components/Works.jsx` 顶部的 `PROJECTS` 数组 |
| 技能标签 | `src/components/Skills.jsx` 顶部的 `SKILLS` 数组 |
| 邮箱 / 社交链接 | `src/components/Contact.jsx` |
| 页脚版权 | `src/components/Footer.jsx` |
| 网页标题 | `index.html` 里的 `<title>` |

> 动画组件在 `src/bits/` 里，一般不用动。

## 部署到 GitHub Pages

1. 本项目已经推送到你的 **`sucaiku`** 公开仓库（仓库名即访问路径）。
2. 仓库 → **Settings → Pages**，Source 选 **GitHub Actions**。
3. 等 Actions 跑完（几分钟），就能在 `https://你的用户名.github.io/sucaiku/` 打开。

### 关于「密码推代码」

GitHub 从 2021 年起**不允许用账号密码直接推代码**，必须用
**Personal Access Token (PAT)**。生成一个（勾选 `repo` 权限），
推送时 Username 填用户名、Password 填 PAT 即可。

### 如果改了仓库名

如果仓库不叫 `sucaiku`，需要同步改两处：
- `vite.config.js` 里的 `base: '/你的仓库名/'`
- `index.html` 里的 favicon 路径 `/你的仓库名/favicon.svg`
然后重新 `npm run build` 再推送。
