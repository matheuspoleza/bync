import { clsx } from '@bync/style';
import { useState } from 'react';

import { SquareButton } from '@/components/Buttons';
import { forwardRef } from '@/hocs';

import { iconStyles } from './ToolbarButton.css';
import type { IToolbarButton } from './ToolbarButton.interface';

export const ToolbarButton = forwardRef<HTMLButtonElement, IToolbarButton>('ToolbarButton')(
  (
    {
      isActive,
      isHovering,
      iconName,
      canRemove,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      iconClassName,
      stylesApplied,
      ...props
    },
    ref
  ) => {
    const [hovering, setHovering] = useState(false);
    const [preventCloseIcon, setPreventCloseIcon] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(event);
      setHovering(true);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(event);
      setHovering(false);
      setPreventCloseIcon(false);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseDown?.(event);

      // prevent close icon from showing when clicking on the button, close icon should only show when hovering next time
      if (!stylesApplied) {
        setPreventCloseIcon(true);
      }
    };

    return (
      <SquareButton
        ref={ref}
        size="medium"
        isActive={isActive}
        isHovering={hovering || isHovering}
        iconName={stylesApplied && canRemove && !preventCloseIcon && (hovering || isHovering) ? 'CloseS' : iconName}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        iconClassName={clsx(iconStyles({ stylesApplied }), iconClassName)}
        {...props}
      />
    );
  }
);
