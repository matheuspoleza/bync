import React, { useMemo } from 'react';

import { Box } from '@/components/Utility/Box';
import { forwardRef } from '@/hocs';

import { Text } from '../Text.component';
import { highlightedTextStyles } from './HighlightedText.css';
import type { IHighlightedText } from './types';

export const HighlightedText = forwardRef<HTMLDivElement, IHighlightedText>('HighlightedText')(
  ({ text, highlight, className, testID, overflow = false, ...props }, ref) => {
    const chunks = useMemo<string[][]>(() => {
      if (typeof text === 'string') {
        return text.split(/(\.|\s)/).map((item) => {
          if (item === ' ') {
            return [item] as string[]; // preserve spaces
          }
          return item.split(new RegExp(`(${highlight})`, 'gi')) as string[];
        });
      }
      return [];
    }, [text, highlight]);

    if (!highlight || typeof text !== 'string') {
      return (
        <Text {...props} ref={ref} className={className} testID={testID} overflow={overflow}>
          {text}
        </Text>
      );
    }

    return (
      <Box data-testid={testID} {...props} ref={ref} className={highlightedTextStyles({ overflow })}>
        {chunks?.map((part) => {
          return part?.map((string: string, index: number) => {
            if (string === ' ') {
              return <>{'\u00A0'}</>;
            }
            const shouldHighlight = string.toLowerCase() === highlight.toLowerCase();
            const textWeight = shouldHighlight ? 'semiBold' : 'regular';
            return (
              <Text {...props} className={className} weight={textWeight} key={index}>
                {string}
              </Text>
            );
          });
        })}
      </Box>
    );
  }
);
