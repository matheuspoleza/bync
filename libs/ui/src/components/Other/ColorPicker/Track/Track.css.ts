import { createVar, recipe, style } from '@bync/style';

import { border, colors } from '@/styles/theme';

const radius = border.radius[8];

export const opacityColorVar = createVar();
export const hueSliderContainerStyles = style({
  position: 'relative',
  width: '100%',
});

export const baseTrackStyles = style({
  width: '164px',
  height: '12px',
  borderRadius: radius,
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '12px',
      borderRadius: radius,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: `1px solid ${colors.black[4]}`,
    },
  },
});

export const hueTrackRecipe = recipe({
  base: baseTrackStyles,
  variants: {
    variant: {
      hue: { background: colors.hueSelector.gradient },
      opacity: {
        vars: { [opacityColorVar]: colors.hueSelector.gradient },
        position: 'relative',
        background: `linear-gradient(270deg, ${opacityColorVar} 6.25%, rgba(57, 125, 255, 0.00) 100%)`,
        selectors: {
          '&::before': {
            content: '""',
            zIndex: -1,
            position: 'absolute',
            width: '100%',
            height: '12px',
            top: 0,
            left: 0,
            borderRadius: radius,
            // eslint-disable-next-line xss/no-mixed-html
            background:
              'url(\'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="12" height="12" fill="black"/><rect x="12" width="12" height="12" fill="white"/><rect y="12" width="12" height="12" fill="white"/><rect x="12" y="12" width="12" height="12" fill="black"/></svg>\')',
            backgroundSize: '12px 12px',
            opacity: 0.38,
          },
        },
      },
    },
  },
});

export const overrideStyles = style({
  height: '12px',
  width: '100%',
  selectors: {
    '&.track-1': { display: 'none !important' },
  },
});

export const shift = style({ top: '-4px' });
