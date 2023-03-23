import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      include: ['src'],
      reporter: ['text', 'json', 'html'],
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100
    }
  }
});
