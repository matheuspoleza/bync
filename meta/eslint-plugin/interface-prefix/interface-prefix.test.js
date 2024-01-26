const { RuleTester } = require('eslint');
const rule = require('./interface-prefix.rule');

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('interface-prefix', rule, {
  valid: [
    {
      code: 'interface IMyInterface {}',
    },
    {
      code: 'interface IMyOtherInterface {}',
    },
  ],
  invalid: [
    {
      code: 'interface MyInterface {}',
      errors: [
        {
          message: "TypeScript interface name 'MyInterface' should start with the letter 'I'",
        },
      ],
      output: 'interface MyInterface {}',
    },
    {
      code: 'interface AnotherInterface {}',
      errors: [
        {
          message: "TypeScript interface name 'AnotherInterface' should start with the letter 'I'",
        },
      ],
      output: 'interface AnotherInterface {}',
    },
  ],
});
