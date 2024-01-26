import { recipe, style, styleVariants } from '@bync/style';

import { button } from '@/styles/theme/components';
import { border } from '@/styles/theme/tokens';

import { baseButtonActiveStyles, baseButtonHoverStyles, baseButtonStyles } from './Base';
import { tertiaryActiveStyle, tertiaryButtonStyles, tertiaryHoveringStyle } from './TertiaryButton';
import { tertiaryDarkActiveStyle, tertiaryDarkButtonStyles, tertiaryDarkHoveringStyle } from './TertiaryDarkButton';

export const baseStyles = style(baseButtonStyles);

export const buttonSizes = styleVariants({
  small: {
    height: button.size.small.height,
    borderRadius: border.radius[6],
    padding: '1px 8px 0',
  },
  medium: {
    height: button.size.medium.height,
    padding: '7px 16px 5px',
    borderRadius: border.radius[7],
  },
  large: {
    height: button.size.large.height,
    borderRadius: border.radius[10],
    padding: '11px 20px 9px',
  },
});

export const buttonVariants = styleVariants({
  primary: {},
  secondary: {},
  tertiary: tertiaryButtonStyles,
  secondaryDark: {},
  tertiaryDark: tertiaryDarkButtonStyles,
  alert: {},
  themedDefault: {},
  themedAlert: {},
  themedSuccess: {},
});

export const widthVariants = styleVariants({
  true: {
    width: '100%',
  },
});

export const hoveringVariants = styleVariants({
  true: {
    selectors: {
      '&:enabled': baseButtonHoverStyles,
    },
  },
});

export const activeVariants = styleVariants({
  true: {
    selectors: {
      '&:enabled': baseButtonActiveStyles,
      '&:enabled:hover': baseButtonActiveStyles,
    },
  },
});

export const buttonRecipe = recipe({
  base: baseStyles,
  variants: {
    size: buttonSizes,
    isActive: activeVariants,
    variant: buttonVariants,
    isHovering: hoveringVariants,
    fullWidth: widthVariants,
    noLabel: {
      true: {},
    },
  },

  compoundVariants: [
    {
      variants: { isActive: true, isHovering: true },
      style: activeVariants.true,
    },

    {
      variants: { variant: 'tertiary', isHovering: true },
      style: {
        selectors: {
          '&:enabled': tertiaryHoveringStyle,
        },
      },
    },
    {
      variants: { variant: 'tertiary', noLabel: true, size: 'small' },
      style: {
        padding: '1px 4px 0',
      },
    },
    {
      variants: { variant: 'tertiary', isActive: true },
      style: {
        selectors: {
          '&:enabled': tertiaryActiveStyle,
          '&:enabled:hover': tertiaryActiveStyle,
        },
      },
    },

    {
      variants: { variant: 'tertiaryDark', isHovering: true },
      style: {
        selectors: {
          '&:enabled': tertiaryDarkHoveringStyle,
        },
      },
    },
    {
      variants: { variant: 'tertiaryDark', isActive: true },
      style: {
        selectors: {
          '&:enabled': tertiaryDarkActiveStyle,
          '&:enabled:hover': tertiaryDarkActiveStyle,
        },
      },
    },
  ],
});

export const loadingSpinnerStyle = style({
  width: '16px',
  color: 'black',
  height: '16px',
});

export const labelLoadingModifier = recipe({
  variants: {
    isLoading: {
      true: {
        visibility: 'hidden',
      },
    },
  },
});
