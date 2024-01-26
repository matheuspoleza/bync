import { style } from '@bync/style';

import { buttonStyles } from './CheckboxButton.css';
import { inputStyles } from './CheckboxInput.css';

export const iconStyles = style({
  position: 'absolute',
  top: '-1px',
  left: '-1px',
  width: 'inherit',
  height: 'inherit',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  visibility: 'hidden',
  zIndex: 1,

  selectors: {
    [`${inputStyles}:checked ~ ${buttonStyles} > &`]: {
      visibility: 'visible',
    },
  },
});
