import { createTheme } from '@bync/style';

import { colors } from '@/styles/theme';

export const [javascriptLight, vars] = createTheme({
  color: {
    variable: colors.accent.accent400,
    caret: colors.neutralDark.neutralsDark900,
    boolean: colors.accent.accent800,
    base: colors.neutralDark.neutralsDark900,
    plain: colors.accent.accent600,
    comment: colors.secondary.secondary600,
    name: colors.fern.fern800,
    string: colors.fern.fern800,
    lineNumber: colors.neutralLight.neutralsLight600,
    number: colors.copper.copper700,
    background: colors.white[100],
    keyword: colors.accent.accent800,
    regex: colors.copper.copper700,
    propertyName: colors.neutralDark.neutralsDark900,
    parameter: colors.accent.accent400,
    activeLine: colors.shades.shades100,
    functionDeclaration: colors.success.success300,
    matchingBracketBackground: colors.neutralDark.neutralsDark900,
    matchingBracketHighlight: colors.neutralDark.neutralsDark900_12,
    gutter: {
      text: {
        default: colors.neutralDark.neutralsDark100,
        focused: colors.neutralDark.neutralsDark300,
      },
    },
    placeholder: {
      default: colors.neutralLight.neutralsLight700,
      focused: colors.neutralLight.neutralsLight900,
    },
  },
});

export const javascriptDark = createTheme(vars, {
  color: {
    variable: colors.success.success300,
    caret: colors.neutralLight.neutralsLight50,
    boolean: colors.accent.accent400,
    base: colors.neutralLight.neutralsLight50,
    plain: colors.success.success300,
    comment: colors.secondary.secondary400,
    string: colors.secondary.secondary200,
    lineNumber: colors.neutralLight.neutralsLight600,
    number: colors.copper.copper400,
    background: colors.neutralDark.neutralsDark600,
    keyword: colors.accent.accent400,
    name: colors.success.success300,
    regex: colors.copper.copper400,
    propertyName: colors.neutralLight.neutralsLight50,
    parameter: colors.accent.accent400,
    activeLine: colors.neutralDark.neutralsDark400,
    functionDeclaration: colors.success.success300,
    matchingBracketBackground: colors.neutralLight.neutralsLight50,
    matchingBracketHighlight: colors.neutralDark.neutralsDark100,
    gutter: {
      text: {
        default: colors.neutralLight.neutralsLight600,
        focused: colors.neutralLight.neutralsLight300,
      },
    },
    placeholder: {
      default: colors.neutralDark.neutralsDark100,
      focused: colors.neutralLight.neutralsLight700,
    },
  },
});

export const jsonLight = createTheme(vars, {
  color: {
    variable: colors.accent.accent400,
    caret: colors.neutralDark.neutralsDark900,
    boolean: colors.accent.accent800,
    base: colors.neutralDark.neutralsDark900,
    lineNumber: colors.neutralLight.neutralsLight600,
    plain: 'red',
    comment: 'red',
    string: colors.fern.fern800,
    number: colors.accent.accent800,
    background: colors.white[100],
    name: colors.secondary.secondary800,
    keyword: colors.accent.accent800,
    regex: colors.copper.copper700,
    propertyName: colors.neutralDark.neutralsDark900,
    parameter: colors.accent.accent400,
    activeLine: colors.shades.shades100,
    functionDeclaration: colors.success.success300,
    matchingBracketBackground: colors.neutralDark.neutralsDark900,
    matchingBracketHighlight: colors.neutralDark.neutralsDark900_12,
    gutter: {
      text: {
        default: colors.neutralDark.neutralsDark900,
        focused: colors.neutralDark.neutralsDark900,
      },
    },
    placeholder: {
      default: colors.neutralDark.neutralsDark900_12,
      focused: colors.neutralDark.neutralsDark900_12,
    },
  },
});

export const jsonDark = createTheme(vars, {
  color: {
    variable: colors.accent.accent400,
    caret: colors.neutralLight.neutralsLight50,
    boolean: colors.copper.copper400,
    base: colors.neutralLight.neutralsLight50,
    plain: 'green',
    comment: 'yellow',
    string: colors.secondary.secondary200,
    number: colors.copper.copper400,
    name: colors.success.success300,
    background: colors.neutralDark.neutralsDark600,
    keyword: colors.accent.accent800,
    regex: colors.copper.copper700,
    lineNumber: colors.neutralLight.neutralsLight600,
    propertyName: colors.success.success300,
    parameter: colors.accent.accent400,
    activeLine: colors.neutralDark.neutralsDark400,
    functionDeclaration: colors.success.success300,
    matchingBracketBackground: colors.neutralLight.neutralsLight50,
    matchingBracketHighlight: colors.neutralDark.neutralsDark100,
    gutter: {
      text: {
        default: colors.neutralLight.neutralsLight600,
        focused: colors.neutralLight.neutralsLight300,
      },
    },
    placeholder: {
      default: colors.neutralDark.neutralsDark900_12,
      focused: colors.neutralDark.neutralsDark900_12,
    },
  },
});

export const CodeEditorTheme = {
  javascript: {
    light: javascriptLight,
    dark: javascriptDark,
  },
  json: {
    light: jsonLight,
    dark: jsonDark,
  },
};
