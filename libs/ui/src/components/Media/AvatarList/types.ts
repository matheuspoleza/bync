import type { BaseProps } from '@/types';

import type { IAvatar } from '../Avatar/types';

export interface IUser extends Pick<IAvatar, 'variant' | 'src' | 'alt'> {
  name: string;
}

export interface IAvatarList extends BaseProps {
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  list: IUser[];
  className?: string;
}
