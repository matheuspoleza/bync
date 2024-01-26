import { globalStyle, recipe, style } from '@bync/style';

import { Theme } from '@/styles';
import { colors } from '@/styles/theme';

export const dividerContainer = recipe({
  base: {
    width: '100%',
    padding: '4px 0',
  },
  variants: {
    fullWidth: {
      false: {
        paddingLeft: '20px',
      },
    },
    noPadding: {
      true: {
        padding: '0',
      },
    },
  },
});

export const baseDivider = style({
  display: 'block',
  width: '100%',
});

export const dividerStyle = recipe({
  base: baseDivider,
  variants: {
    line: {
      true: {
        borderTop: `1px solid ${colors.neutralLight.neutralsLight50}`,
      },
      false: {
        borderTop: '1px solid transparent',
      },
    },
    centeredLabel: {
      true: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },

    dashed: {
      true: {
        borderTop: 'none',
        selectors: {
          '&::before': {
            minWidth: '0',
            height: '1px',
            flex: '1 1 auto',
            display: 'block',
            order: '1',
            content: '',
            backgroundImage: `linear-gradient(to right, ${colors.neutralLight.neutralsLight200} 40%, rgba(255, 255, 255, 0) 0%)`,
            backgroundPosition: 'left',
            backgroundRepeat: 'repeat-x',
            backgroundSize: '5px 1px',
          },
        },
      },
    },
    breakDivider: {
      true: {
        borderTop: 'none',
        selectors: {
          '&::before': {
            minWidth: '0',
            height: '1px',
            flex: '1 1 auto',
            display: 'block',
            order: '1',
            content: '',
            backgroundImage: `linear-gradient(to right, ${colors.secondary.secondary400} 40%, rgba(255, 255, 255, 0) 0%)`,
            backgroundPosition: 'left',
            backgroundRepeat: 'repeat-x',
            backgroundSize: '5px 1px',
          },
        },
      },
    },
    thick: {
      true: {
        borderTop: `2px solid ${colors.neutralDark.neutralsDark600}`,
      },
    },
    dark: {
      true: {
        borderTop: `1px solid ${colors.neutralDark.neutralsDark600}`,
      },
    },
  },
});

export const baseLabelStyles = style({
  lineHeight: Theme.vars.font.lineHeight.caption,
  whiteSpace: 'nowrap',
  paddingRight: '8px',
});

export const labelStyles = recipe({
  base: {
    color: colors.neutralDark.neutralsDark200,
  },
  variants: {
    centeredLabel: {
      true: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
      false: {
        paddingRight: '8px',
      },
    },

    breakDivider: {
      true: {
        color: colors.secondary.secondary600,
      },
    },
  },
});

export const linkContainer = style({});

// NOTE: avoids additional variants in link for a 1-off use case.
globalStyle(`${linkContainer} p`, {
  lineHeight: '17px',
});

export const closeButtonStyles = style({
  fontSize: '24px',
  paddingLeft: '6px',
});
