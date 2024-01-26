import { recipe, style } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';

import { baseContainerStyle, disabledState, enabledState } from '../MenuItem.css';

export const relativeContainerBox = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
});

export const containerStyle = recipe({
  base: [
    baseContainerStyle,
    {
      display: 'inline-block',
      selectors: {
        [`${relativeContainerBox}:hover > &::before`]: {
          backgroundColor: colors.neutralLight.neutralsLight50,
        },
        '&:active::before': {
          backgroundColor: colors.neutralLight.neutralsLight100,
        },
      },
    },
  ],
  variants: {
    disabled: {
      true: disabledState,
    },

    isHovering: {
      true: {
        '::before': {
          backgroundColor: colors.neutralLight.neutralsLight50,
        },
      },
    },
  },

  compoundVariants: [
    {
      variants: { disabled: false, isHovering: undefined },
      style: enabledState,
    },
  ],
});

export const textContent = recipe({
  base: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  variants: {
    hasSuffixButton: {
      true: {
        selectors: {
          [`${relativeContainerBox}:hover  &`]: {
            width: 'calc(100% - 56px)',
          },
        },
      },
    },
  },
});

export const suffixButtonModifiersBase = style({
  borderRadius: border.radius[5],
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  right: 4,
  zIndex: 20,
  width: '46px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  opacity: 0,
  transition: transition(['all']),
  selectors: {
    [`${relativeContainerBox}:hover > &`]: {
      opacity: 1,
    },
    '&:hover': {
      opacity: 1,
    },
  },
});

export const suffixButtonModifiers = recipe({
  base: suffixButtonModifiersBase,
  variants: {
    isHovering: {
      true: {
        opacity: 1,
      },
    },
  },
});
