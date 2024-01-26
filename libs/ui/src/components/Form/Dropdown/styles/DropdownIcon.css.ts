import { recipe } from '@bync/style';

import { colors } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

import { dropdownBaseStyle } from './Dropdown.css';
import * as DropdownTheme from './DropdownTheme.css';

export const iconStyleRecipe = recipe({
  base: {
    height: '24px',
    width: '24px',
    color: DropdownTheme.contract.icon.color.default,
    position: 'absolute',
    zIndex: 2,
    pointerEvents: 'none',
    cursor: 'pointer',
    top: '5.25px',
    transition: inputTokens.animations.transition,
  },
  variants: {
    variant: {
      primary: {},
      dark: {
        selectors: {
          [`${dropdownBaseStyle}:disabled ~ &`]: {
            color: colors.neutralDark.neutralsDark200,
          },
        },
      },
    },
    clickable: {
      true: {
        pointerEvents: 'all',
      },
    },
    isOpen: {
      true: {},
    },
    bordered: {
      true: {},
      false: {},
    },
    isError: {
      true: {
        color: colors.alert.alert700,
      },
    },
    alignment: {
      left: {
        left: '12px',
      },
      right: {
        right: '9px',
      },
    },
    isSmall: {
      true: {
        top: '-.5px',
        right: '4px',
      },
    },
    isDisabled: {
      true: {
        color: colors.neutralLight.neutralsLight500,
        cursor: 'not-allowed',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        alignment: 'left',
        isSmall: true,
      },
      style: {
        display: 'none',
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: true,
      },
      style: {
        selectors: {
          [`${dropdownBaseStyle}:focus ~ &`]: {
            color: colors.accent.accent500,
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: true,
        isOpen: true,
      },
      style: {
        color: colors.accent.accent500,
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: true,
        isOpen: true,
        isError: true,
      },
      style: {
        color: colors.accent.accent500,
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: true,
        clickable: true,
        isDisabled: false,
      },
      style: {
        pointerEvents: 'all',
        selectors: {
          '&:hover': {
            color: colors.neutralDark.neutralsDark600,
          },
          '&:active': {
            color: colors.accent.accent500,
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: false,
      },
      style: {
        selectors: {
          [`${dropdownBaseStyle}:enabled:not(:focus):hover ~ &`]: {
            color: colors.accent.accent500,
          },
          [`${dropdownBaseStyle}:focus ~ &`]: {
            color: colors.accent.accent600,
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: false,
        isOpen: true,
      },
      style: {
        color: colors.accent.accent600,
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: false,
      },
      style: {
        selectors: {
          [`${dropdownBaseStyle}:enabled:not(:focus):hover ~ &`]: {
            color: colors.accent.accent200,
          },
          [`${dropdownBaseStyle}:focus ~ &`]: {
            color: colors.accent.accent300,
          },
        },
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: false,
        isOpen: true,
      },
      style: {
        color: colors.accent.accent300,
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: true,
      },
      style: {
        top: '.5px',
        selectors: {
          [`${dropdownBaseStyle}:enabled:not(:focus):hover ~ &`]: {
            color: colors.neutralLight.neutralsLight300,
          },
          [`${dropdownBaseStyle}:focus ~ &`]: {
            color: colors.neutralLight.neutralsLight50,
          },
        },
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: true,
        isOpen: true,
      },
      style: {
        color: colors.neutralLight.neutralsLight50,
      },
    },
  ],
});
