import React from 'react';

import { getElementCSSProperties } from '../../SlateEditor.util';
import { defaultElementStyle } from './DefaultElement.css';
import type { IDefaultElementPreview } from './DefaultElement.interface';

export const DefaultElementPreview: React.FC<IDefaultElementPreview> = ({ editor, element, children }) => {
  const Tag = editor.isInline(element) ? 'span' : 'div';

  return (
    <Tag style={getElementCSSProperties(element)} className={defaultElementStyle}>
      {children}
    </Tag>
  );
};
