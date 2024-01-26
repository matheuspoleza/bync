import type { PopperReferenceProps } from '@/components/Utility/Popper';
import type { BaseProps } from '@/types';

export interface IImagePreview extends BaseProps {
  image: string;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  isExpanded?: boolean;
  referenceElement?: (props: PopperReferenceProps) => React.ReactNode;
}
