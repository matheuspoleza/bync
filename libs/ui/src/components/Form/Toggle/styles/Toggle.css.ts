import { style } from '@bync/style';

import { toggleTokens } from '@/styles/theme/components';

import * as ToggleTheme from './ToggleTheme.css';

export const toggleContainer = style({
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
});

export const toggleInput = style({
  opacity: '0',
  position: 'absolute',
  zIndex: '-1',
  pointerEvents: 'none',
});

export const pillStyles = style({
  ...toggleTokens.animations,
  display: 'flex',
  alignItems: 'center',
  width: '24px',
  minWidth: 0,
  height: '14px',
  border: ToggleTheme.contract.border.default,
  borderRadius: '12px',
  backgroundColor: ToggleTheme.contract.background.default,

  selectors: {
    [`${toggleInput}:checked ~ &`]: {
      border: ToggleTheme.contract.border.checked,
      backgroundColor: ToggleTheme.contract.background.checked,
    },
    [`${toggleInput}:disabled ~ &`]: {
      border: ToggleTheme.contract.border.disabled,
      backgroundColor: ToggleTheme.contract.background.disabled,
      cursor: 'not-allowed',
    },
    [`${toggleInput}:checked:disabled ~ &`]: {
      border: ToggleTheme.contract.border.checkedDisabled,
      backgroundColor: ToggleTheme.contract.background.checkedDisabled,
    },
  },
});

export const toggleCircleStyles = style({
  ...toggleTokens.animations,
  left: '-1px',
  position: 'relative',
  display: 'inline-flex',
  width: '12px',
  boxSizing: 'content-box',
  height: '12px',
  backgroundColor: ToggleTheme.contract.circle.background.default,
  borderRadius: '50%',
  border: ToggleTheme.contract.circle.border.default,
  backgroundClip: 'content-box',

  selectors: {
    [`${toggleInput}:checked ~ ${pillStyles} &`]: {
      left: '9px',
      border: ToggleTheme.contract.circle.border.checked,
    },
    [`${toggleInput}:disabled ~ ${pillStyles} &`]: {
      border: ToggleTheme.contract.circle.border.disabled,
      backgroundColor: ToggleTheme.contract.circle.background.disabled,
    },
    [`${toggleInput}:disabled:checked ~ ${pillStyles} &`]: {
      border: ToggleTheme.contract.circle.border.disabledChecked,
    },
  },
});
