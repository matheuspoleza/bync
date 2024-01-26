import type { StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { colors, transition, typography } from '@/styles/theme';

import {
  activeAttachmentContainerStyles,
  baseAttachmentContainerStyles,
} from '../AttachmentContainer/AttachmentContainer.css';

const activeStyle: StyleRule = {
  color: colors.accent.accent100,
};

export const attachmentCaptionStyles = style({
  transition: transition(['color']),
  color: colors.neutralDark.neutralsDark100,
  fontSize: typography.size[12],
  lineHeight: typography.lineHeight[17],
  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:hover &`]: {
      color: colors.neutralDark.neutralsDark200,
    },
    [`${baseAttachmentContainerStyles}:enabled:active &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true} &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true}:enabled:hover &`]: activeStyle,
  },
});
