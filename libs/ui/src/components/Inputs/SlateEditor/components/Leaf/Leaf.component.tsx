import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PrismVariablesProperty } from '../../prism';
import { PluginType } from '../../SlateEditor.constant';
import { DefaultLeaf } from '../DefaultLeaf/DefaultLeaf.component';
import { PrismVariableLeaf } from '../PrismVariableLeaf/PrismVariableLeaf.component';
import type { ILeaf } from './Leaf.interface';

export const Leaf: React.FC<ILeaf> = ({ leaf, ...props }) => {
  const editor = useSlateStatic();

  if (editor.plugins.has(PluginType.VARIABLE) && leaf[PrismVariablesProperty.VF_VARIABLE]) {
    return <PrismVariableLeaf leaf={leaf} {...props} />;
  }

  return <DefaultLeaf leaf={leaf} {...props} />;
};
