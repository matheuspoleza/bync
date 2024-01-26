import type { BaseProps } from '@/types';

export interface IEditor extends BaseProps {
  title: string;
  footer?: React.ReactNode;
  divider?: boolean;
  children?: React.ReactNode;
  readOnly?: boolean;
  className?: string;
  contentClassName?: string;
  onTitleChange?: (title: string) => void;
  headerActions?: React.ReactNode;
  titleTransform?: (value: string) => string;
}

export interface IEditorAPI {
  startTitleEditing: VoidFunction;
}
