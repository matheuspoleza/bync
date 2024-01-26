import { recipe, style } from '@bync/style';

export const container = style({
  width: '100%',
});

export const contentWrapperStyles = style({
  width: '100%',
  padding: '0 24px 0 24px',
});

export const headerWrapperStyles = recipe({
  variants: {
    isDisabled: {
      true: {
        pointerEvents: 'none',
      },
    },
  },
});

export const dividerModifier = recipe({
  variants: {
    noBottomPadding: {
      true: {
        paddingBottom: '0',
      },
    },
    isOpen: {
      true: {
        paddingTop: '24px',
      },
      false: {
        paddingTop: '0',
      },
    },
    isSection: {
      true: {
        paddingBottom: '0px',
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        isOpen: true,
        isSection: true,
      },
      style: {
        paddingTop: '11px',
      },
    },
    {
      variants: {
        isOpen: false,
        isSection: true,
      },
      style: {
        paddingTop: '0px',
      },
    },
  ],
});

export const containerRecipe = recipe({
  base: container,
  variants: {
    isDisabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});
