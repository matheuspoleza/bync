module.exports = {
  typescript: true,
  outDir: './src/components/monochrome',
  srcDir: './src/svgs/monochrome',
  prettier: '@bync-meta/prettier-config',
  icon: '16px',
  replaceAttrValues: {
    '#656D75': '{props.fill}',
  },
};
