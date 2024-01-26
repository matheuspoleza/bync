import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import esbuild from 'rollup-plugin-esbuild';
import peerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';

/** @type {import('rollup').RollupOptions} */
export default {
  plugins: [
    peerDepsExternalPlugin(),
    tsConfigPaths(),
    esbuild({ tsconfig: 'tsconfig.build.json' }),
    // vfui is used as a namespace for all css modules
    vanillaExtractPlugin({ identifiers: ({ hash }) => `vfui_${hash}` }),
  ],

  input: ['src/main.ts', 'src/theme.css.ts', 'src/styles/index.ts', 'src/global.css.ts'],

  output: [
    {
      dir: 'build/cjs',
      format: 'cjs',
      entryFileNames: ({ name }) => `${name.replace(/\.css$/, '.css.vanilla')}.cjs`,
      assetFileNames: ({ name }) => name?.replace(/^src\//, '') ?? '',
      preserveModules: true,
    },
    {
      dir: 'build/esm',
      format: 'esm',
      entryFileNames: ({ name }) => `${name.replace(/\.css$/, '.css.vanilla')}.mjs`,
      assetFileNames: ({ name }) => name?.replace(/^src\//, '') ?? '',
      preserveModules: true,
    },
  ],
};
