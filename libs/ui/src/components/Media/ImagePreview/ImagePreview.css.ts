import { recipe, style } from '@bync/style';

import { border, shadows } from '@/styles/theme';

export const imagePreviewBaseStyle = style({
  borderRadius: border.radius[10],
  boxShadow: shadows.surfaceShadows.z32Light,
});

export const imagePreviewStyle = recipe({
  base: imagePreviewBaseStyle,
  variants: {
    isExpanded: {
      true: {
        width: 'auto',
        height: 'auto',
      },
      false: {
        width: '300px',
        height: '340px',
      },
    },
  },
});

export const previewContainerStyles = style({
  position: 'relative',
  borderRadius: border.radius[10],
});

export const placeholderStyles = style({
  position: 'absolute',
  top: 0,
});
