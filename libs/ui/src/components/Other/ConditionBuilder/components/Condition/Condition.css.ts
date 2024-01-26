import { globalStyle, style } from '@bync/style';

export const inlineStyles = style({
  display: 'inline',
});

export const ifStyles = style([inlineStyles, { fontWeight: 600 }]);

export const focusContainerStyles = style({
  wordBreak: 'break-word',
  overflow: 'hidden',
  display: 'inline',
});

export const editorStyles = style({
  marginLeft: '8px',
  marginRight: '8px',
  display: 'inline',
  cursor: 'text',
});

export const rightValueStyles = style({
  display: 'inline-block',
});

globalStyle(`${editorStyles} > [data-slate-node='element']`, {
  display: 'inline',
});

export const operatorTypeStyles = style({
  whiteSpace: 'nowrap',
  display: 'inline',
});

globalStyle(`${operatorTypeStyles} > p:first-of-type`, {
  display: 'inline',
});

globalStyle(`${editorStyles} div[data-slate-placeholder="true"]`, {
  display: 'inline !important',
  minWidth: 'max-content !important',
  top: '-3px !important',
});
