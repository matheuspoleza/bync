import { tags as t } from '@lezer/highlight';
import type { CreateThemeOptions } from '@uiw/codemirror-themes';

import { Theme } from '@/styles';

import * as CodeEditorTheme from './CodeEditorTheme.css';

export const codeSyntaxHighlightingTheme: CreateThemeOptions = {
  theme: 'light',
  settings: {
    background: CodeEditorTheme.vars.color.background,
    backgroundImage: '',
    foreground: CodeEditorTheme.vars.color.base,
    caret: CodeEditorTheme.vars.color.caret,
    gutterForeground: CodeEditorTheme.vars.color.lineNumber,
    fontFamily: Theme.theme.font.family.code,
    gutterBorder: 'transparent',
  },
  styles: [
    { tag: t.name, color: CodeEditorTheme.vars.color.name },
    { tag: t.string, color: CodeEditorTheme.vars.color.string },
    { tag: t.number, color: CodeEditorTheme.vars.color.number },
    { tag: t.comment, color: CodeEditorTheme.vars.color.comment },
    { tag: t.keyword, color: CodeEditorTheme.vars.color.keyword },
    { tag: t.bool, color: CodeEditorTheme.vars.color.boolean },
    { tag: t.propertyName, color: CodeEditorTheme.vars.color.propertyName },
    { tag: t.function(t.propertyName), color: CodeEditorTheme.vars.color.functionDeclaration },
  ],
};
