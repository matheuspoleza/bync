import { LoadingSpinner } from '@/components/Other/LoadingSpinner';

import { previewLoadingSpinnerStyles, previewLoadingStyles } from './PreviewLoading.css';
import type { IPreviewLoading } from './types';

export const PreviewLoading: React.FC<IPreviewLoading> = ({ testID }) => (
  <div className={previewLoadingStyles} data-testid={testID}>
    <LoadingSpinner className={previewLoadingSpinnerStyles} />
  </div>
);
