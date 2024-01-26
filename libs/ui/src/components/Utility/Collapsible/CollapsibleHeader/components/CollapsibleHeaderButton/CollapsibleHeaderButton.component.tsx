import { clsx } from '@bync/style';

import type { ISquareButton } from '@/components/Buttons/SquareButton';
import { SquareButton } from '@/components/Buttons/SquareButton/SquareButton.component';
import { forwardRef } from '@/hocs/forwardRef.hoc';

import type { ICollapsibleHeaderChildren } from '../../types';
import { buttonStyle } from './CollapsibleHeaderButton.css';

export interface ICollapsibleHeaderButton extends Omit<ISquareButton, 'iconName'>, ICollapsibleHeaderChildren {}

export const CollapsibleHeaderButton = forwardRef<HTMLButtonElement, ICollapsibleHeaderButton>('SectionHeaderButton')(
  ({ isOpen, headerChildrenStyles, variant, testID, className, ...props }, ref) => {
    return (
      <SquareButton
        {...props}
        ref={ref}
        iconName={isOpen ? 'ArrowUpS' : 'ArrowDownS'}
        size="medium"
        variant={variant}
        className={clsx(buttonStyle, headerChildrenStyles, className)}
        // iconClassName={headerChildrenStyles}
        testID={`${testID}--collapsible-header-button`}
      />
    );
  }
);
