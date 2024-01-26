import type { StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { spacing, transition } from '@/styles/theme';
import { button } from '@/styles/theme/components';

import { activeVariants, baseStyles, buttonSizes, buttonVariants, hoveringVariants } from './Button.css';
import * as ButtonTheme from './ButtonTheme.css';

const hoverStyle: StyleRule = {
  color: ButtonTheme.contract.icon.color.hover,
};

const activeStyle: StyleRule = {
  color: ButtonTheme.contract.icon.color.active,
};

export const buttonIconStyle = style({
  marginTop: '-1px',
  color: ButtonTheme.contract.icon.color.default,
  width: '24px',
  height: '24px',
  marginLeft: '-4px',
  transition: transition(button.animations.properties),

  selectors: {
    // Icon + Text padding
    [`${buttonSizes.small} > &`]: {
      marginRight: spacing.spacing[4],
    },
    [`${buttonSizes.medium} > &`]: {
      marginRight: spacing.spacing[8],
      marginLeft: '-4px',
    },
    [`${buttonSizes.large} > &`]: {
      marginLeft: '-4px',
      marginRight: spacing.spacing[8],
    },
    [`${baseStyles} &:only-child`]: {
      marginRight: '0',
      marginLeft: '0',
    },
    [`${baseStyles}:hover > &`]: hoverStyle,
    [`${hoveringVariants.true} > &`]: hoverStyle,
    [`${baseStyles}:active > &`]: activeStyle,
    [`${activeVariants.true} > &`]: activeStyle,
    [`${activeVariants.true}:hover > &`]: activeStyle,
    [`${baseStyles}:disabled > &`]: {
      color: ButtonTheme.contract.icon.color.disabled,
    },
    [`${buttonVariants.primary} > &`]: {
      stroke: '#00000014',
      strokeLinejoin: 'round',
      strokeWidth: '2px',
    },
    [`${buttonVariants.primary}:disabled > &`]: {
      stroke: 'none',
    },
  },
});

export const spinnerStyle = style([
  ...buttonIconStyle,
  {
    width: 16,
    height: 'auto',
    position: 'absolute',
    selectors: {
      [`${buttonSizes.small} > &`]: {
        marginLeft: 0,
        marginRight: 0,
      },
      [`${buttonSizes.medium} > &`]: {
        marginLeft: 0,
        marginRight: 0,
      },
      [`${buttonSizes.large} > &`]: {
        marginLeft: 0,
        marginRight: 0,
      },
      [`${baseStyles} &:only-child`]: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
]);
