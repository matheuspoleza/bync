import { clsx } from '@bync/style';

import { forwardRef } from '@/hocs';

import { containerStyle, contentStyle } from './VirtualizedContent.css';
import type { IVirtualizedContent } from './VirtualizedContent.interface';

export const VirtualizedContent = forwardRef<HTMLDivElement, IVirtualizedContent>('VirtualizedContent')(
  (
    {
      start,
      style,
      testID,
      totalSize,
      className,
      children,
      contentStyle: contentStyleProp,
      contentClassName,
      ...props
    },
    ref
  ) => (
    <div ref={ref} style={{ ...style, height: totalSize }} className={clsx(containerStyle, className)} {...props}>
      <div
        style={{ ...contentStyleProp, transform: `translateY(${start}px)` }}
        className={clsx(contentStyle, contentClassName)}
        data-testid={testID}
      >
        {children}
      </div>
    </div>
  )
);
