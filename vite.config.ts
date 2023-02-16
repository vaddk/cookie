import { resolve } from 'path'
import { URL, fileURLToPath } from 'node:url'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ command }) => {
  const config: UserConfig = {
    plugins: [
      Vue(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      lib: {
        name: 'vaddk-cookie',
        entry: resolve(__dirname, './src/index.ts'),
        formats: ['es'],
        fileName: 'cookie',
      },
      rollupOptions: {
        external: ['vue'],
      },
    },
    define: { 'process.env.NODE_ENV': '"production"' },
  }
  if (command === 'build') config.publicDir = false
  return config
})
