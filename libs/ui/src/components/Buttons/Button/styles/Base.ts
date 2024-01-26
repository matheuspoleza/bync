import type { ComplexStyleRule, StyleRule } from '@bync/style';

import { Theme } from '@/styles';
import { transition } from '@/styles/theme';
import { button } from '@/styles/theme/components';

import * as ButtonTheme from './ButtonTheme.css';

export const baseButtonHoverStyles: StyleRule = {
  color: ButtonTheme.contract.color.hover,
  backgroundColor: ButtonTheme.contract.backgroundColor.hover,
  boxShadow: ButtonTheme.contract.boxShadow.hover,
};

export const baseButtonActiveStyles: StyleRule = {
  color: ButtonTheme.contract.color.active,
  backgroundColor: ButtonTheme.contract.backgroundColor.active,
  boxShadow: ButtonTheme.contract.boxShadow.active,
};

export const baseButtonDisabledStyles: StyleRule = {
  color: ButtonTheme.contract.color.disabled,
  backgroundColor: ButtonTheme.contract.backgroundColor.disabled,
  boxShadow: ButtonTheme.contract.boxShadow.disabled,
  cursor: 'not-allowed',
};

export const baseButtonStyles: ComplexStyleRule = {
  position: 'relative',
  fontFamily: Theme.vars.font.family.default,
  fontSize: Theme.vars.font.size.default,
  fontWeight: Theme.vars.font.weight.bold,
  color: ButtonTheme.contract.color.default,
  backgroundColor: ButtonTheme.contract.backgroundColor.default,
  boxShadow: ButtonTheme.contract.boxShadow.default,
  border: '0',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  width: 'fit-content',
  transition: transition(button.animations.properties),

  selectors: {
    '&:enabled:hover': baseButtonHoverStyles,
    '&:enabled:active': baseButtonActiveStyles,
    '&:disabled': baseButtonDisabledStyles,
  },
};
