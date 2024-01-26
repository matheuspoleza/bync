import React from 'react';
import { useSlateStatic } from 'slate-react';

import { StaticEditor } from '../../editor/staticEditor';
import { PluginType } from '../../SlateEditor.constant';
import { DefaultElement } from '../DefaultElement/DefaultElement.component';
import { LinkElement } from '../LinkElement/LinkElement.component';
import { VariableElement } from '../VariableElement/VariableElement.component';
import type { IElement } from './Element.interface';

export const Element: React.FC<IElement> = ({ element, ...props }) => {
  const editor = useSlateStatic();

  if (editor.plugins.has(PluginType.LINK) && StaticEditor.isLink(element)) {
    return <LinkElement {...props} element={element} />;
  }

  if (editor.plugins.has(PluginType.VARIABLE) && StaticEditor.isVariable(element)) {
    return <VariableElement {...props} element={element} />;
  }

  return <DefaultElement {...props} element={element} />;
};
