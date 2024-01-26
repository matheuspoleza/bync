import { recipe, style } from '@bync/style';

import { Theme } from '@/styles';
import { animation, createTransition } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

import { inputStyleRecipe } from '../Input/styles/Input.css';
import { textAreaBaseStyle } from '../TextArea/TextArea.css';

const fastTransition = createTransition({
  duration: animation.duration.fast,
  timingFunction: animation.timingFunction.easeOut,
});

export const chipsContainer = style([
  textAreaBaseStyle,
  {
    padding: '2px 4px 2px 4px',
    position: 'relative',
    transition: fastTransition(['border', 'box-shadow', 'height']),
  },
]);

export const chipInputStyles = style([
  inputStyleRecipe({ variant: 'ghost' }),
  { display: 'inline-flex', padding: 0, paddingLeft: 8, lineHeight: '20px', width: '30%' },
]);

export const inputRecipe = recipe({
  base: chipInputStyles,
  variants: {
    hasTags: {
      true: {
        marginTop: 4,
      },
    },
  },
});

export const menuStyles = style({
  marginTop: 1,
});

export const placeholderStyles = style({
  color: inputTokens.colors.text.default.placeholder,
  fontSize: Theme.vars.font.size.default,
  position: 'relative',
  top: 1,
});

export const invisibleInput = style({
  position: 'absolute',
  top: 0,
  left: 8,
  width: 'calc(100% - 8px)',
  height: '100%',
  marginTop: 0,
});

export const noInput = style({
  width: 0,
  height: 0,
  padding: 0,
  display: 'flex',
  marginTop: 0,
});

export const chipsInputRecipe = recipe({
  base: chipsContainer,
  variants: {
    isFocused: {
      true: {
        border: inputTokens.borders.active.border,
        boxShadow: inputTokens.shadows.focus,
        outline: 'none',
        transition: fastTransition(['border', 'box-shadow']),
      },
      false: {
        selectors: {
          '&:hover': {
            cursor: 'text',
            border: inputTokens.borders.hover.border,
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    hasChildren: {
      true: { paddingTop: 0, paddingBottom: 4 },
      false: { paddingTop: 2, paddingBottom: 2, lineHeight: '30px' },
    },
  },
});

export const chipStyles = style({
  selectors: {
    [`${noInput} &`]: { cursor: 'text' },
  },
});
