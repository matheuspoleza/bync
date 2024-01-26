module.exports = {
  meta: {
    fixable: 'code',
  },
  create: (context) => ({
    TSInterfaceDeclaration(node) {
      const interfaceName = node.id.name;
      if (!interfaceName.startsWith('I')) {
        context.report({
          node,
          message: `TypeScript interface name '${interfaceName}' should start with the letter 'I'`,
          // NOTE: Currently disabled until we can modify to fix the declaration and usages, not just the declaration.
          // fix: (fixer) => {
          //   const fixedName = `I${interfaceName}`;
          //   return fixer.replaceText(node.id, fixedName);
          // },
        });
      }
    },
  }),
};
