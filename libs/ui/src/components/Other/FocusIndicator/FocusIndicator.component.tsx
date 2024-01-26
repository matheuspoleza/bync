import React, { forwardRef } from 'react';

import { focusIndicator } from './FocusIndicator.css';
import type { IFocusIndicator } from './FocusIndicator.interface';

export const FocusIndicator = forwardRef<HTMLDivElement, IFocusIndicator>(({ error }, ref) => {
  return <div className={focusIndicator({ error })} ref={ref} />;
});
