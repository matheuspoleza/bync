import { globalStyle, style } from '@bync/style';

import { animation, border, colors, createTransition, shadows } from '@/styles/theme';

import { containerStyles } from './CheckboxContainer.css';
import { inputStyles } from './CheckboxInput.css';

const fastTransition = createTransition({
  duration: animation.duration.fast,
  timingFunction: animation.timingFunction.easeOut,
});

export const buttonStyles = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transformOrigin: 'center',
  width: 'inherit',
  height: 'inherit',
  borderRadius: border.radius[5],
  boxShadow: shadows.radioControlShadow.default,
  pointerEvents: 'none',
  border: `1px solid ${colors.neutralLight.neutralsLight300}`,
  transition: fastTransition(['border']),
  backgroundColor: colors.white[100],
  selectors: {
    '&::after': {
      content: ' ',
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      width: 'inherit',
      height: 'inherit',
      borderRadius: border.radius[5],
      backgroundColor: colors.accent.accent500,
      boxShadow: shadows.shadesGlows['0-100Inner'][10],
      opacity: 0,
      zIndex: -1,
      transition: fastTransition(['opacity']),
    },

    /* hover */

    [`${containerStyles}:hover > ${inputStyles}:enabled:not(:checked) ~ &`]: {
      border: `1px solid ${colors.neutralLight.neutralsLight400}`,
    },

    /* checked */

    [`${inputStyles}:checked ~ &`]: {
      boxShadow: 'none',
    },

    [`${inputStyles}:checked ~ &::after`]: {
      opacity: 1,
    },

    /* disabled */

    [`${inputStyles}:disabled ~ &`]: {
      boxShadow: 'none',
      border: `1px solid ${colors.neutralLight.neutralsLight100}`,
    },

    /* checked & disabled */

    [`${inputStyles}:checked:disabled ~ &`]: {
      borderColor: 'transparent',
    },

    [`${inputStyles}:checked:disabled ~ &::after`]: {
      backgroundColor: colors.accent.accent300,
      boxShadow: 'none',
    },
  },
});

// DISABLED CHECKED
globalStyle(`${inputStyles}:disabled ~ ${buttonStyles} path`, {
  stroke: colors.accent.accent400,
  transition: fastTransition(['stroke']),
});
