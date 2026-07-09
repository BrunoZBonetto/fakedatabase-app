/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Fake Database',
      short_name: 'FakeDB',
      description: 'Generate realistic fake data for testing — export to CSV, Excel, JSON, SQL, XML and YAML',
      theme_color: '#7c5cfc',
      background_color: '#0f0f14',
      display: 'standalone',
      icons: [
        { src: '/icons/icon.svg', sizes: '512x512', type: 'image/svg+xml' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,json,svg}'],
    },
  })],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
