import type { ComplexStyleRule, StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { border, colors, shadows, transition } from '@/styles/theme';

import {
  activeAttachmentContainerStyles,
  baseAttachmentContainerStyles,
} from '../AttachmentContainer/AttachmentContainer.css';

export const previewFrameStyle: ComplexStyleRule = {
  transition: transition(['background-color', 'color', 'box-shadow']),
  width: '32px',
  height: '32px',
  minWidth: '32px',
  borderRadius: border.radius[8],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const activeStyle: StyleRule = {
  backgroundColor: colors.white[80],
  boxShadow: 'none',
};

export const previewStyles = style({
  ...previewFrameStyle,
  fontSize: '24px',
  position: 'relative',
  padding: 0,
  border: 0,
  cursor: 'pointer',

  backgroundColor: colors.neutralDark.neutralsDark900_6,
  color: colors.neutralDark.neutralsDark200,

  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:hover &`]: {
      boxShadow: shadows.shadesGlows['0-100Inner'][6],
    },
    [`${baseAttachmentContainerStyles}:enabled:active &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true} &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true}:enabled:hover &`]: activeStyle,
  },
});

export const iconStyles = style({
  transition: transition(['opacity']),
  selectors: {
    [`${previewStyles}:hover &`]: {
      opacity: 0,
    },
    [`${previewStyles}:active &`]: {
      opacity: 0,
    },
  },
});

export const hoverIconStyles = style({
  transition: transition(['opacity']),
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
  selectors: {
    [`${previewStyles}:hover &`]: {
      opacity: 1,
    },
    [`${previewStyles}:hover &`]: {
      opacity: 1,
    },
  },
});
