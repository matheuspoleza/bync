import React from 'react';
import type { RenderLeafProps } from 'slate-react';

import { DefaultLeaf } from '../DefaultLeaf/DefaultLeaf.component';
import { prismVariableLeafStyle } from './PrismVariableLeaf.css';
import { PrismVariablesPopper } from './PrismVariablesPopper/PrismVariablesPopper.components';

export const PrismVariableLeaf: React.FC<RenderLeafProps> = (props) => {
  const [textNode, setTextNode] = React.useState<HTMLSpanElement | null>(null);

  return (
    <>
      <DefaultLeaf ref={setTextNode} className={prismVariableLeafStyle} {...props} />

      {textNode && <PrismVariablesPopper leaf={props.leaf} textNode={textNode} />}
    </>
  );
};
