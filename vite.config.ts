import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// Use relative base so the site works on GitHub Pages (under /repo-name/),
// surge.sh, plain static hosts, and opened via `file://` if needed.
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3033,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 3033,
    strictPort: true,
  },
  assetsInclude: ['**/*.md'],
})
