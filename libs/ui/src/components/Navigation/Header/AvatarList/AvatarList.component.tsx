import { clsx } from '@bync/style';

import { AvatarList as AvatarListComponent } from '@/components/Media/AvatarList/AvatarList.component';

import { headerAvatarListStyles } from './AvatarList.css';
import type { IHeaderAvatarList } from './types';

export const AvatarList: React.FC<IHeaderAvatarList> = ({ className, onButtonClick, ...props }) => (
  <AvatarListComponent {...props} className={clsx(className, headerAvatarListStyles)} onButtonClick={onButtonClick} />
);
