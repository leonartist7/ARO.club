import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // jsdom gives the store a real localStorage, which it persists into.
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.test.{js,jsx}'],
    // e2e/ is Playwright and runs under `npm run test:e2e`.
    exclude: ['node_modules', 'dist', 'e2e'],
  },
});
