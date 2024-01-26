import React from 'react';
import { useSlateSelector } from 'slate-react';

import { forwardRef } from '@/hocs';
import { rgbaToColorString } from '@/utils/colors/color.util';

import { getTextCSSProperties } from '../../SlateEditor.util';
import type { IDefaultLeaf } from './DefaultLeaf.interface';

export const DefaultLeaf = forwardRef<HTMLSpanElement, IDefaultLeaf>('DefaultLeaf')(
  ({ leaf, children, attributes, className }, ref) => {
    const fakeSelectionBackground = useSlateSelector((editor) => editor.getFakeSelectionBackground(leaf));

    return (
      <span
        ref={ref}
        {...attributes}
        className={className}
        style={{
          ...(getTextCSSProperties(leaf) as React.CSSProperties),
          ...(fakeSelectionBackground && { background: rgbaToColorString(fakeSelectionBackground) }),
        }}
      >
        {children}
      </span>
    );
  }
);
