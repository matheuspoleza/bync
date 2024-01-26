import type { StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { colors, shadows } from '@/styles/theme';

import {
  activeAttachmentContainerStyles,
  baseAttachmentContainerStyles,
} from '../AttachmentContainer/AttachmentContainer.css';
import { previewFrameStyle } from '../AttachmentPreview/AttachmentPreview.css';

const activeStyle: StyleRule = {
  backgroundColor: colors.accent.accent600,
  boxShadow: 'none',
};

export const previewLoadingStyles = style({
  ...previewFrameStyle,
  fontSize: '24px',
  backgroundColor: colors.black[6],
  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:hover &`]: {
      boxShadow: shadows.shadesGlows['0-100Inner'][6],
    },
    [`${baseAttachmentContainerStyles}:enabled:active &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true} &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true}:enabled:hover &`]: activeStyle,
  },
});

const activeSpinnerStyle: StyleRule = {
  color: colors.white[100],
};

export const previewLoadingSpinnerStyles = style({
  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:active &`]: activeSpinnerStyle,
    [`${activeAttachmentContainerStyles.true} &`]: activeSpinnerStyle,
    [`${activeAttachmentContainerStyles.true}:enabled:hover &`]: activeSpinnerStyle,
  },
});
