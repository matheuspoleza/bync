import { dirname, join } from "path";

/** @type { import('@storybook/builder-vite').StorybookConfig } */
module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-essentials"), getAbsolutePath("@storybook/addon-interactions")],
  staticDirs: ['../public'],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  core: {
    builder: getAbsolutePath("@storybook/builder-vite")
  },
  exclude: ['**/node_modules/**'],
  previewBody: (body) => `
    ${process.env.IS_CHROMATIC === 'true' ? '<link href="storybook.css" rel="stylesheet" />' : ''}
    ${body}
  `
};
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
