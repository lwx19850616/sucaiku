import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 项目站点部署在 /sucaiku/ 子路径下，必须设置 base
export default defineConfig({
  plugins: [react()],
  base: '/sucaiku/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
