import React, { forwardRef } from 'react';

import { type ISquareButton, SquareButton } from '../../SquareButton';
import { iconButtonStyles } from '../EditorButton.css';

export const EditorButtonSuffixButton = forwardRef<HTMLButtonElement, ISquareButton>(
  ({ iconName, onClick, disabled, testID }, ref) => {
    return (
      <SquareButton
        size="medium"
        disabled={disabled}
        className={iconButtonStyles}
        iconName={iconName}
        testID={testID}
        onClick={onClick}
        ref={ref}
      />
    );
  }
);
