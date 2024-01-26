import { recipe, style } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';

export const container = style({
  position: 'relative',
});

export const areaStyles = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '260px',
    maxWidth: '100%',
    height: '108px',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    padding: '20px 32px',
    border: `1px dashed ${colors.neutralLight.neutralsLight200}`,
    borderRadius: border.radius[8],
    transition: transition(['border', 'background-color']),
  },
  variants: {
    isDragging: {
      true: {
        border: `1px solid ${colors.accent.accent500}`,
      },
    },
    hasImage: {
      true: {
        border: '1px solid transparent',
      },
    },
    isError: {
      true: {
        border: `1px dashed ${colors.alert.alert500}`,
      },
    },
    hasFile: {
      true: {
        border: `1px solid ${colors.neutralLight.neutralsLight200}`,
      },
    },
    disabled: {
      true: {
        border: `1px solid ${colors.neutralLight.neutralsLight50}`,
        cursor: 'not-allowed',
      },
    },
  },
});

export const textModifiers = style({
  paddingBottom: '8px',
  textAlign: 'center',
  color: colors.neutralDark.neutralsDark400,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
});

export const disabledStyles = style({
  color: colors.neutralDark.neutralsDark50,
});

export const loadingSpinnerModifier = style({
  fontSize: '24px',
});

export const buttonContainer = style({
  zIndex: 10,
});
export const loadingText = style({
  color: colors.neutralDark.neutralsDark100,
});

export const imagePreviewStyles = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  borderRadius: border.radius[8],
});

export const imagePreviewContainerStyles = style({
  width: '100%',
  height: '100%',
  backgroundPosition: '150%',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: border.radius[8],
  transition: transition(['background-color', 'opacity']),
  selectors: {
    '&::before': {
      backdropFilter: 'blur(48px)',
      position: 'absolute',
      borderRadius: border.radius[8],
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      content: '',
    },
  },
});

export const imageHoverDimEffect = style({
  opacity: 0,
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  borderRadius: border.radius[8],
  backgroundColor: colors.black[32],
  transition: transition(['background-color', 'opacity']),
  zIndex: 2,
  selectors: {
    [`${imagePreviewStyles}:hover &`]: {
      opacity: 1,
    },
  },
});

export const browseButton = style({
  position: 'absolute',
  zIndex: 40,
  visibility: 'hidden',
  opacity: 0,
  pointerEvents: 'none',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transition: transition(['visibility', 'opacity', 'background-color']),
  selectors: {
    [`${imagePreviewStyles}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'all',
    },
  },
});

export const successIcon = style({
  color: colors.success.success700,
});

export const errorIcon = style({
  color: colors.alert.alert700,
  height: '24px',
  width: '24px',
});

export const errorSection = style({
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '2px',
});

export const closeButton = style({
  position: 'absolute',
  top: '8px',
  right: '8px',
  visibility: 'hidden',
  opacity: 0,
  transition: transition(['visibility', 'opacity']),
  selectors: {
    [`${container}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
    },
  },
});
