import type { HTMLAttributeAnchorTarget } from 'react';

import type { IButton } from '@/components/Buttons/Button/types';
import type { BaseProps } from '@/types';

import type * as IllustrationComponents from './components/Illustrations';

export type IllustrationName = keyof typeof IllustrationComponents;

export interface IEmptyPage extends BaseProps {
  title: string;
  button?: IButton;
  className?: string;
  linkTarget?: HTMLAttributeAnchorTarget;
  description: JSX.Element | string;
  illustration?: IllustrationName;
  learnMoreLink?: string;
}
