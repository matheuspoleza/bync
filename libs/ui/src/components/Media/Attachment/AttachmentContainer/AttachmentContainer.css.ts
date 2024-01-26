import type { StyleRule } from '@bync/style';
import { recipe, style, styleVariants } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';

const activeStyle: StyleRule = {
  backgroundColor: colors.accent.accent500,

  selectors: {
    '&:hover': {
      backgroundColor: colors.accent.accent500,
    },
  },
};

export const activeAttachmentContainerStyles = styleVariants({
  true: activeStyle,
  false: {
    backgroundColor: 'unset',

    selectors: {
      '&:hover': {
        backgroundColor: colors.neutralDark.neutralsDark900_6,
      },
    },
  },
});

export const baseAttachmentContainerStyles = style({
  transition: transition(['background-color']),
  border: 'unset',
  textAlign: 'unset',
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  flexGrow: 1,
  gap: 12,
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: border.radius[10],
  overflow: 'hidden',
});

export const attachmentContainerStyles = recipe({
  base: baseAttachmentContainerStyles,

  variants: {
    active: activeAttachmentContainerStyles,
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {
        selectors: {
          '&:active': activeStyle,
        },
      },
    },
  },
});
