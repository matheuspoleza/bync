import { style } from '@bync/style';

import { colors } from '@/styles/theme';

export const codeSuggestionsPopoverStyles = style({
  position: 'absolute',
  zIndex: 1,
});

export const codeSuggestionPopoverModifier = style({
  backgroundColor: colors.white[100],
});
