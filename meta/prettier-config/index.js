  /** @type {import('prettier').Options} */
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 120,
  plugins: ["prettier-plugin-packagejson"],
};
