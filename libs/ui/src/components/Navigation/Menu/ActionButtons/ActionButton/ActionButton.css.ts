import { recipe } from '@bync/style';

import { Theme } from '@/styles';
import { transition } from '@/styles/theme';
import { linkLightTokens } from '@/styles/theme/components/link';

const hoverStyle = {
  textDecorationColor: linkLightTokens.color.default,
};

export const actionButtonStyles = recipe({
  base: {
    color: linkLightTokens.color.default,
    cursor: 'pointer',
    position: 'relative',
    transition: transition(['color', 'text-decoration', 'text-decoration-color', 'opacity']),
    backgroundColor: 'transparent',
    border: 0,
    fontWeight: Theme.vars.font.weight.bold,
    textUnderlineOffset: '2px',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textDecorationColor: 'transparent',
    height: '100%',
    width: '100%',
    display: 'block',
    textAlign: 'center',

    ':hover': hoverStyle,
    ':active': {
      color: linkLightTokens.color.active,
      textDecorationColor: 'transparent',
      textAlign: 'center',
    },
  },

  variants: {
    isHovering: {
      true: hoverStyle,
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});
