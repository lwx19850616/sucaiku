import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base 路径要与 GitHub 仓库名一致（部署到 https://用户名.github.io/sucaiku/）
// 如果你把仓库改名，这里也要一起改。
export default defineConfig({
  base: '/sucaiku/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
})
