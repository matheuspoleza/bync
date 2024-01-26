import type { RenderPlaceholderProps } from 'slate-react';

import { Placeholder } from '../components/Placeholder/Placeholder.component';

export const defaultRenderPlaceholder = (props: RenderPlaceholderProps): JSX.Element => <Placeholder {...props} />;
