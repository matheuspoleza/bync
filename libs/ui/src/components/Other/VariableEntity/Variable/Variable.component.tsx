import { assignInlineVars, clsx } from '@bync/style';
import * as React from 'react';

import { Text } from '@/components/Text';
import { forwardRef } from '@/hocs';
import { getTheme } from '@/styles/theme/components/variableEntity';

import { BracketLeft, BracketRight } from '../Brackets';
import type { IVariableEntity } from '../types';
import { borderBracketStyle, bracketStyle, container, textRecipe } from './styles/Variable.css';
import { contract } from './styles/VariableTheme.css';

export const Variable = forwardRef<HTMLDivElement, IVariableEntity>('Variable')(
  ({ label, size = 'default', color = '#515A63', isActive, className, maxWidth, ...props }, ref) => {
    const labelStyles = textRecipe({ size, isActive });

    const bracketClass = bracketStyle({ isActive });

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(container, className)}
        style={assignInlineVars(contract, getTheme(color, 'variable'))}
      >
        <BracketLeft className={bracketClass} bracketBorderClassName={borderBracketStyle} />
        <Text
          variant={size === 'large' ? 'basic' : 'caption'}
          weight="semiBold"
          className={labelStyles}
          style={{ maxWidth }}
        >
          {label}
        </Text>
        <BracketRight className={bracketClass} bracketBorderClassName={borderBracketStyle} />
      </div>
    );
  }
);
