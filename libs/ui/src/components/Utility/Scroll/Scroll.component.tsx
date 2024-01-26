import { useState } from 'react';

import { ScrollProvider } from '@/contexts/Scroll.context';
import { forwardRef } from '@/hocs/forwardRef.hoc';
import { usePersistFunction } from '@/hooks';
import { setRef } from '@/utils/ref.util';

import { Box } from '../Box';
import type { IScroll } from './Scroll.interface';

export const Scroll = forwardRef<HTMLDivElement, IScroll>('Scroll')(
  ({ children, direction = 'column', maxHeight = '100%', ...props }, ref) => {
    const [scrollNode, setScrollNode] = useState<HTMLDivElement | null>(null);

    const onRef = usePersistFunction((node: HTMLDivElement | null) => {
      setRef(ref, node);
      setScrollNode(node);
    });

    return (
      <Box {...props} ref={onRef} direction={direction} maxHeight={maxHeight} overflowY="auto">
        <ScrollProvider scrollNode={scrollNode}>{children}</ScrollProvider>
      </Box>
    );
  }
);
