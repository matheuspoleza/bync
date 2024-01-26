import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './config/test/setup.js',
    exclude: [...configDefaults.exclude, 'build'],
    coverage: {
      exclude: [...configDefaults.exclude, 'build', '*.js'],
    },
  },
});
