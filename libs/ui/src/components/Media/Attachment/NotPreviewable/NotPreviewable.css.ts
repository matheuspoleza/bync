import type { StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { colors, shadows } from '@/styles/theme';

import {
  activeAttachmentContainerStyles,
  baseAttachmentContainerStyles,
} from '../AttachmentContainer/AttachmentContainer.css';
import { previewFrameStyle } from '../AttachmentPreview/AttachmentPreview.css';

const activeStyle: StyleRule = {
  backgroundColor: colors.white[80],
  color: colors.neutralDark.neutralsDark200,
  boxShadow: 'none',
};

export const notPreviewableStyles = style({
  ...previewFrameStyle,
  fontSize: '24px',
  backgroundColor: colors.neutralDark.neutralsDark900_6,
  color: colors.neutralDark.neutralsDark100,
  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:hover &`]: {
      boxShadow: shadows.shadesGlows['0-100Inner'][6],
    },
    [`${baseAttachmentContainerStyles}:enabled:active &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true} &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true}:enabled:hover &`]: activeStyle,
  },
});
