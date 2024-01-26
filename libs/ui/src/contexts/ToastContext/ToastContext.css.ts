import { keyframes, style } from '@bync/style';

import { animation } from '@/styles/theme';

// the gap between the edge and the lowest toast must be equal 24px.
// We're achieving it with toast's margin 8px (from toastStyles) + bottom: 16px (from toastQueueContainerStyles)
const BOTTOM_GAP = 16;

// these importants are only needed on nextra build. Both the creator-app and storybook don't need them
export const toastStyles = style({
  border: '0',
  boxShadow: 'none',
  padding: '0',
  margin: '8px 0',
  background: 'transparent',
  flex: 'none',
  minHeight: '36px',
  overflow: 'visible',
});

export const toastBodyStyles = style({
  padding: 0,
  margin: 0,
});

export const toastQueueContainerStyles = style({
  width: 'auto',
  position: 'fixed',
  bottom: BOTTOM_GAP,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1100,
  padding: 0,
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
});

export const inAnimation = keyframes({
  '0%': {
    transform: 'translateY(100%)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

export const inAnimationClass = style({
  animation: `${inAnimation} ${animation.duration.default} ${animation.timingFunction.easeIn}`,
});

export const outAnimationClass = style({
  animation: `${inAnimation} ${animation.duration.default} ${animation.timingFunction.easeOut}`,
  animationDirection: 'reverse',
  animationFillMode: 'forwards',
});
