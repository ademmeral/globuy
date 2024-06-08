import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './client'),
      '@assets' : path.resolve(__dirname, './assets'),
      '@src' : path.resolve(__dirname, './src'),
      '@components' : path.resolve(__dirname, './components'),
      '@pages' : path.resolve(__dirname, './pages'),
      '@utils' : path.resolve(__dirname, './utils'),
      '@routes' : path.resolve(__dirname, './routes'),
      '@hooks' : path.resolve(__dirname, './hooks'),
      '@api' : path.resolve(__dirname, './api'),
      '@styles' : path.resolve(__dirname, './styles'),
      '@contexts' : path.resolve(__dirname, './contexts'),
      '@handlers' : path.resolve(__dirname, './handlers'),
      '@constants' : path.resolve(__dirname, './constants'),
    },
  },
  server : {
    port : 3000,
    // proxy : {
    //   '/' : 'http://localhost:3001',
    // }
  }
})
