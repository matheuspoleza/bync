import React from 'react';

import { DefaultLeafPreview } from '../DefaultLeaf/DefaultLeafPreview.component';
import type { ILeafPreview } from './Leaf.interface';

export const LeafPreview: React.FC<ILeafPreview> = (props) => <DefaultLeafPreview {...props} />;
