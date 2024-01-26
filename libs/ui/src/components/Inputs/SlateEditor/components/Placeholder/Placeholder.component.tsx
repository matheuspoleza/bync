import React from 'react';
import type { RenderPlaceholderProps } from 'slate-react';

import { placeholderStyle } from './Placeholder.css';

export const Placeholder: React.FC<RenderPlaceholderProps> = ({ attributes, children }) => (
  <div {...attributes} className={placeholderStyle}>
    {children}
  </div>
);
