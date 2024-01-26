import { recipe, style, styleVariants } from '@bync/style';

import { transition } from '@/styles/theme';
import { tabTokens } from '@/styles/theme/components';

import { tabWrapperStyles } from '../TabGroup.css';

const tabContainerStyles = style({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 12px',
  minWidth: '55px',
  whiteSpace: 'nowrap',
  transition: transition(['box-shadow']),
  userSelect: 'none',
  boxSizing: 'content-box',
});

export const tabContainerVariants = styleVariants({
  hug: [tabContainerStyles],
  fill: [
    tabContainerStyles,
    {
      width: '100%',
    },
  ],
});

const textBaseStyles = style({
  color: tabTokens.color.text.default,
  transition: transition(['color']),
  paddingTop: '1px',
  lineHeight: 0,
  selectors: {
    [`${tabWrapperStyles}:hover &`]: {
      color: tabTokens.color.text.hover,
    },
  },
});

export const textStyles = recipe({
  base: textBaseStyles,
  variants: {
    isActive: {
      true: {
        color: tabTokens.color.text.active,
      },
    },
  },
});

const iconStyles = style({
  height: '16px',
  fontSize: '16px',
  width: '16px',
  filter: 'grayscale(1)',
  transition: transition(['filter', 'opacity']),
});

export const iconVariants = styleVariants({
  isActive: [iconStyles, { filter: 'grayscale(0)' }],
  default: [
    iconStyles,
    {
      selectors: {
        [`${tabWrapperStyles}:hover &`]: {
          filter: `grayscale(0)`,
          opacity: '.75',
        },
      },
    },
  ],
});
