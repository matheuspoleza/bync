import React from 'react';

import { getTextCSSProperties } from '../../SlateEditor.util';
import type { IDefaultLeafPreview } from './DefaultLeaf.interface';

export const DefaultLeafPreview: React.FC<IDefaultLeafPreview> = ({ leaf }) => (
  <span style={{ ...(getTextCSSProperties(leaf) as React.CSSProperties) }}>{leaf.text}</span>
);
