import { recipe, style, styleVariants } from '@bync/style';

import { colors, transition } from '@/styles/theme';

export const captionStyles = style({
  marginRight: '8px',
});

const headerStyleBase = style({
  cursor: 'pointer',
  paddingTop: '11px',
  paddingRight: '16px',
  paddingLeft: '24px',
  paddingBottom: '11px',
  height: 36,
  boxSizing: 'content-box',
  transition: transition(['color']),
});

export const headerStyles = {
  base: headerStyleBase,
  variants: {
    isSection: {
      true: {},
    },
    isOpen: {
      true: {
        paddingBottom: '7px',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        isSection: true,
        isOpen: true,
      },
      style: {
        paddingBottom: '0px',
      },
    },
  ],
};

const disabledVariant = styleVariants({
  true: {
    color: colors.neutralLight.neutralsLight600,
    pointerEvents: 'none',
    transition: transition(['color']),
  },
});

export const headerRecipe = recipe({
  base: headerStyleBase,
  variants: {
    isDisabled: disabledVariant,
    isSection: {
      true: {},
    },
    isOpen: {
      true: {
        paddingBottom: '7px',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        isSection: true,
        isOpen: true,
      },
      style: {
        paddingBottom: '0px',
      },
    },
  ],
});

export const headerChildrenStyles = recipe({
  variants: {
    isDisabled: disabledVariant,
    isEmpty: {
      true: {
        color: colors.neutralDark.neutralsDark200,
        selectors: {
          [`${headerStyleBase}:hover &`]: {
            color: colors.neutralDark.neutralsDark300,
          },
        },
      },
    },
  },
});

export const labelModifier = recipe({
  variants: {
    isDisabled: disabledVariant,
    isEmpty: {
      true: {
        transition: transition(['color']),
        color: colors.neutralDark.neutralsDark200,
        selectors: {
          [`${headerStyleBase}:hover &`]: {
            transition: transition(['color']),
            color: colors.neutralDark.neutralsDark600,
          },
        },
      },
    },
  },
});
