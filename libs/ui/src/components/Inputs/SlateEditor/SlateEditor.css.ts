import { globalStyle, recipe, style } from '@bync/style';

import { Theme, Tokens } from '@/styles';
import { transition } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

const selectionStyle = {
  backgroundColor: Tokens.colors.accent.accent100,
};

const baseEditorStyle = style({
  width: '100%',
  color: inputTokens.colors.text.default.text,
  fontFamily: Theme.vars.font.family.default,
  fontSize: Theme.vars.font.size.default,
  lineHeight: Theme.vars.font.lineHeight.basic,
  fontWeight: Theme.vars.font.weight.regular,
  transition: transition(['opacity']),

  '::selection': selectionStyle,

  '::-moz-selection': selectionStyle,

  ':focus-visible': {
    outline: 'none',
  },

  selectors: {
    '&[disabled]': {
      cursor: 'not-allowed',
      opacity: inputTokens.opacity.disabled,
    },
  },
});

export const editorStyle = recipe({
  base: baseEditorStyle,

  variants: {
    nowrap: {
      true: {
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'pre !important' as any,
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
    ellipsis: {
      true: {
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        selectors: {
          '&:focus': {
            overflow: 'hidden',
            display: 'block',
            whiteSpace: 'pre  !important' as any,
            WebkitLineClamp: 'initial',
            WebkitBoxOrient: 'initial',
          },
        },
      },
    },
  },
});

globalStyle(`${baseEditorStyle} *::selection`, selectionStyle);
globalStyle(`${baseEditorStyle} *::-moz-selection`, selectionStyle);
globalStyle(`${baseEditorStyle}[disabled] *`, { pointerEvents: 'none' });
