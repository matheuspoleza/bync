import React from 'react';
import { useSlateStatic } from 'slate-react';

import { getElementCSSProperties } from '../../SlateEditor.util';
import { defaultElementStyle } from './DefaultElement.css';
import type { IDefaultElement } from './DefaultElement.interface';

export const DefaultElement: React.FC<IDefaultElement> = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const Tag = editor.isInline(element) ? 'span' : 'div';

  return (
    <Tag {...attributes} style={getElementCSSProperties(element)} className={defaultElementStyle}>
      {children}
    </Tag>
  );
};
