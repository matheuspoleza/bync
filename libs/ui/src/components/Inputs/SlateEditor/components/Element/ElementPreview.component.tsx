import React from 'react';

import { StaticEditor } from '../../editor/staticEditor';
import { DefaultElementPreview } from '../DefaultElement/DefaultElementPreview.component';
import { LinkElementPreview } from '../LinkElement/LinkElementPreview.component';
import { VariableElementPreview } from '../VariableElement/VariableElementPreview.component';
import type { IElementPreview } from './Element.interface';

export const ElementPreview: React.FC<IElementPreview> = ({ element, ...props }) => {
  if (StaticEditor.isLink(element)) return <LinkElementPreview {...props} element={element} />;

  if (StaticEditor.isVariable(element)) return <VariableElementPreview {...props} element={element} />;

  return <DefaultElementPreview {...props} element={element} />;
};
