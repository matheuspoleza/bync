import type { StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { colors } from '@/styles/theme';

import {
  activeAttachmentContainerStyles,
  baseAttachmentContainerStyles,
} from '../AttachmentContainer/AttachmentContainer.css';

const activeBeforeStyles: StyleRule = {
  backgroundColor: colors.accent.accent400,
};

export const progressBarTrackStyles = style({
  flexGrow: 1,
  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:active &::before`]: activeBeforeStyles,
    [`${activeAttachmentContainerStyles.true} &::before`]: activeBeforeStyles,
  },
});

const activeProgressStyles: StyleRule = {
  backgroundColor: colors.accent.accent100,
};

export const progressBarStyles = style({
  selectors: {
    [`${baseAttachmentContainerStyles}:enabled:active &`]: activeProgressStyles,
    [`${activeAttachmentContainerStyles.true} &`]: activeProgressStyles,
  },
});
