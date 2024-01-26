import type { StyleRule } from '@bync/style';
import { style } from '@bync/style';

import { FormControlLabel } from '@/components/Form/FormControlLabel';
import { animation, border, colors, createTransition, shadows } from '@/styles/theme';

import { inputStyles } from './RadioInput.css';

const fastTransition = createTransition({
  duration: animation.duration.fast,
  timingFunction: animation.timingFunction.easeOut,
});

const createButtonStyles =
  ({
    base,
    checked,
    disabled,
    disabledChecked,
  }: Record<'base' | 'checked' | 'disabled' | 'disabledChecked', StyleRule>) =>
  (target: string): Record<string, StyleRule> => ({
    [target]: base,
    [`${inputStyles}:checked ~ ${target}`]: checked,
    [`${inputStyles}:disabled ~ ${target}`]: disabled,
    [`${inputStyles}:disabled:checked ~ ${target}`]: disabledChecked,
  });

const outerStyles = createButtonStyles({
  base: {
    border: `1px solid ${colors.neutralLight.neutralsLight300}`,
    boxShadow: shadows.radioControlShadow.default,
    transition: fastTransition(['border', 'box-shadow']),
    width: 'inherit',
    height: 'inherit',
  },

  checked: {
    border: `2px solid ${colors.accent.accent500}`,
    boxShadow: shadows.radioControlShadow.selected,
  },

  disabled: {
    boxShadow: 'none',
    border: `1px solid ${colors.neutralLight.neutralsLight100}`,
  },

  disabledChecked: {
    border: `2px solid ${colors.accent.accent300}`,
  },
});

const innerStyles = createButtonStyles({
  base: {
    opacity: 0,
    transformOrigin: 'center',
    width: '4px',
    height: '4px',
    transition: fastTransition(['opacity']),
    transform: 'translate(-50%, -50%) scale(0)',
    backgroundColor: colors.accent.accent500,
  },

  checked: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },

  disabled: {
    transform: 'translate(-50%, -50%) scale(0)',
    opacity: 0,
    backgroundColor: 'transparent',
  },

  disabledChecked: {
    backgroundColor: colors.accent.accent300,
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: 1,
  },
});

export const buttonStyles = style({
  width: 'inherit',
  height: 'inherit',
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'none',

  selectors: {
    '&::before, &::after': {
      content: ' ',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: border.radius.round,
      willChange: 'transform',
    },

    ...outerStyles('&::before'),
    ...innerStyles('&::after'),

    [`
      ${inputStyles}:enabled:not(:checked):hover ~ &::before,
      ${FormControlLabel.css.containerStyles.enabled}:hover ${inputStyles}:not(:checked) ~ &::before
    `]: {
      border: `1px solid ${colors.neutralLight.neutralsLight400}`,
      transition: fastTransition(['border']),
    },
  },
});
