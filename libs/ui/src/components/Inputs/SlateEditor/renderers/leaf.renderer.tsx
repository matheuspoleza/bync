import { Leaf } from '../components/Leaf/Leaf.component';
import type { ILeaf, ILeafPreview } from '../components/Leaf/Leaf.interface';
import { LeafPreview } from '../components/Leaf/LeafPreview.component';
import { PrismVariableLeaf } from '../components/PrismVariableLeaf/PrismVariableLeaf.component';
import { PrismVariablesProperty } from '../prism';

export const defaultRenderLeaf = (props: ILeaf): JSX.Element => {
  if (props.leaf[PrismVariablesProperty.VF_VARIABLE]) return <PrismVariableLeaf {...props} />;

  return <Leaf {...props} />;
};

export const defaultRenderLeafPreview = (props: ILeafPreview): JSX.Element => <LeafPreview {...props} />;
