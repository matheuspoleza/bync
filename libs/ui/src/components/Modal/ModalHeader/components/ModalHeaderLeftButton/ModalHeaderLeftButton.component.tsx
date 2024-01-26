import React, { forwardRef } from 'react';

import { SquareButton } from '@/components/Buttons/SquareButton/SquareButton.component';
import type { ISquareButton } from '@/main';

import { menuButtonStyles } from './ModalHeaderLeftButton.css';

export const ModalHeaderLeftButton = forwardRef<HTMLButtonElement, ISquareButton>(({ testID, ...props }, ref) => {
  return (
    <SquareButton
      {...props}
      ref={ref}
      size="medium"
      iconName={props.iconName ?? 'Menu'}
      className={menuButtonStyles}
      testID={`${testID}--modal-header-left-button`}
    />
  );
});
