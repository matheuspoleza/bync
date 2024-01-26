import type { StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { colors, transition, typography } from '@/styles/theme';

import {
  activeAttachmentContainerStyles,
  baseAttachmentContainerStyles,
} from '../AttachmentContainer/AttachmentContainer.css';

const activeStyle: StyleRule = {
  color: colors.white[100],
};

export const attachmentTitleStyles = style({
  transition: transition(['color']),
  fontSize: typography.size[12],
  fontWeight: typography.weight[600],
  lineHeight: typography.lineHeight[17],
  color: colors.neutralDark.neutralsDark900,
  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:active &`]: activeStyle,
    [`${activeAttachmentContainerStyles.true} &`]: activeStyle,
  },
});
