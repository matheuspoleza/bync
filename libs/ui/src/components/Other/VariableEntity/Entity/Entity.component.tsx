import { assignInlineVars, clsx } from '@bync/style';
import * as React from 'react';

import { Text } from '@/components/Text';
import { forwardRef } from '@/hocs';
import { getTheme } from '@/styles/theme/components/variableEntity';

import { BracketLeft, BracketRight } from '../Brackets';
import type { IVariableEntity } from '../types';
import { bracketPaddingStyles, bracketStyle, containerRecipe, textRecipe } from './styles/Entity.css';
import { contract } from './styles/EntityTheme.css';

export const Entity = forwardRef<HTMLDivElement, IVariableEntity>('Entity')(
  ({ label, size = 'default', color = '#515A63', isActive, className, maxWidth, ...props }, ref) => {
    const labelStyles = textRecipe({ size });
    const containerStyles = containerRecipe({ isActive });

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(containerStyles, className)}
        style={assignInlineVars(contract, getTheme(color, 'entity'))}
      >
        <BracketLeft
          className={bracketStyle}
          borderPaddingClassName={bracketPaddingStyles}
          bracketBorderClassName={bracketPaddingStyles}
        />
        <Text
          variant={size === 'large' ? 'basic' : 'caption'}
          weight="semiBold"
          className={labelStyles}
          style={{ maxWidth }}
        >
          {label}
        </Text>
        <BracketRight
          className={bracketStyle}
          borderPaddingClassName={bracketPaddingStyles}
          bracketBorderClassName={bracketPaddingStyles}
        />
      </div>
    );
  }
);
