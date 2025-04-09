import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // Habilita APIs globales como describe, it, expect
    environment: 'jsdom', // Simula un entorno de navegador
    setupFiles: ['./tests/setup.ts'], // Archivo de configuración global
  },
});