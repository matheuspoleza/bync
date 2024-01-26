import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    vanillaExtractPlugin({
      // vfui is used as a namespace for all css modules
      identifiers: ({ hash }) => `vfui_${hash}`,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './config/test/setup.js',
    exclude: [...configDefaults.exclude, 'build'],
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      exclude: ['build', '*.js'],
    },
  },
});
