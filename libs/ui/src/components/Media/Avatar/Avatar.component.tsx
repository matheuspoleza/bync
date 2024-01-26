import { clsx } from '@bync/style';
import React from 'react';

import { forwardRef } from '@/hocs';

import { avatar, avatarRecipe, childContainer, textStyles } from './styles/Avatar.css';
import type { IAvatar } from './types';

export const Avatar = forwardRef<HTMLDivElement, IAvatar>('Avatar')(
  ({ src, alt, variant = 'base', children, className, size = 'small', testID, ...props }, ref) => {
    const avatarStyles = avatarRecipe({ variant, size });

    const text = typeof children === 'string' && !src && (
      <span className={textStyles} data-testid={`${testID}--letter`}>
        {children}
      </span>
    );

    return (
      <div {...props} ref={ref} className={clsx(avatarStyles, className)} data-testid={testID}>
        {src && <img src={src} alt={alt || 'avatar'} className={avatar} data-testid={`${testID}--avatar-img`} />}

        <div className={childContainer} data-testid={`${testID}--letter`}>
          {text}
        </div>
      </div>
    );
  }
);
