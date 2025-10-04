import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Se o app for servido em https://dominio/Portal-dos-Agentes
  // mantém esse base. Se for na raiz, troque para '/'
  base: '/',

  plugins: [
    vue(),
    tailwindcss(),
    // Só ativa o devtools em ambiente de desenvolvimento
    mode === 'development' && vueDevTools()
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  build: {
    // Mantém o build no próprio projeto frontend
    outDir: 'dist',
    emptyOutDir: true
  }
}))