import { globalStyle, recipe, style, styleVariants } from '@bync/style';

import * as CodeEditorTheme from './CodeEditorTheme.css';

export const inlineVariableEntityStyles = style({
  display: 'inline-flex',
  transform: 'translateY(3px)',
});

export const codeEditorStyles = style({
  backgroundColor: CodeEditorTheme.vars.color.background,
  margin: '0 4px',
  overflow: 'scroll',
  overflowX: 'auto',
});

const readOnlyVariant = styleVariants({
  true: {},
});

globalStyle(`${codeEditorStyles} .cm-gutters`, {
  backgroundColor: 'transparent',
  fontSize: '12px',
  borderRight: 'none',
});

globalStyle(`${codeEditorStyles} .cm-gutter`, {
  backgroundColor: CodeEditorTheme.vars.color.background,
  color: CodeEditorTheme.vars.color.gutter.text.default,
});

globalStyle(`${codeEditorStyles} .cm-focused > .cm-activeLineGutter .cm-activeLineGutter--focused`, {
  color: 'red',
});

globalStyle(`${codeEditorStyles} .cm-activeLineGutter`, {
  backgroundColor: 'transparent',
});

globalStyle(`${codeEditorStyles} .cm-focused`, {
  outline: 'none',
});

globalStyle(`${codeEditorStyles} .cm-line`, {
  fontSize: '12px',
  lineHeight: '18px',
  height: '18px',
});

globalStyle(`${codeEditorStyles} .cm-placeholder`, {
  color: CodeEditorTheme.vars.color.placeholder.default,
});

// focused
globalStyle(`${codeEditorStyles} .cm-focused .cm-activeLine > .cm-placeholder`, {
  color: CodeEditorTheme.vars.color.placeholder.focused,
});

globalStyle(`${codeEditorStyles} .cm-line:has(${inlineVariableEntityStyles})`, {
  transform: 'translateY(-3px)',
  backgroundColor: 'transparent !important',
});

globalStyle(`${codeEditorStyles} .cm-gutterElement`, {
  display: 'flex',
  width: '40px',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

globalStyle(`${readOnlyVariant.true} .cm-gutterElement`, {
  width: '35px',
});

globalStyle(`${codeEditorStyles} .cm-layer`, {
  top: '1px',
});
globalStyle(`${codeEditorStyles} .cm-focused > .cm-scroller > .cm-selectionLayer > .cm-selectionBackground`, {
  backgroundColor: CodeEditorTheme.vars.color.activeLine,
});

globalStyle(`${codeEditorStyles} .cm-focused > .cm-scroller`, {
  overflowX: 'visible',
});

// handle active line when editor is not focused
globalStyle(`${codeEditorStyles} .cm-activeLine`, {
  backgroundColor: 'transparent',
});

globalStyle(`${codeEditorStyles} .cm-focused .cm-activeLine`, {
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
  backgroundColor: CodeEditorTheme.vars.color.activeLine,
});

globalStyle(`${codeEditorStyles} .cm-focused .cm-activeLine:has(code)::after`, {
  height: '100%',
  width: '100%',
  content: '""',
  position: 'absolute',
  left: '0',
  top: '3px',
  backgroundColor: CodeEditorTheme.vars.color.activeLine,
  zIndex: '-1',
});

globalStyle(`${codeEditorStyles} .cm-focused .cm-activeLineGutter`, {
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
  backgroundColor: CodeEditorTheme.vars.color.activeLine,
  color: CodeEditorTheme.vars.color.gutter.text.focused,
});

globalStyle(`${codeEditorStyles}  .cm-foldGutter > .cm-activeLineGutter`, {
  borderTopLeftRadius: '0px',
});

globalStyle(`${codeEditorStyles} .cm-focused .cm-matchingBracket`, {
  borderRadius: '2px',
  transform: 'translateY(-4px)',
  color: CodeEditorTheme.vars.color.matchingBracketBackground,
  backgroundColor: CodeEditorTheme.vars.color.matchingBracketHighlight,
});

export const codeEditorRecipe = recipe({
  base: codeEditorStyles,
  variants: {
    disabled: {
      true: {
        opacity: 0.65,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        selectors: {
          '&:hover': {
            cursor: 'not-allowed',
            pointerEvents: 'none',
          },
        },
      },
    },
    readOnly: readOnlyVariant,
  },
});
