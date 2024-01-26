import { AvatarList as AvatarListComponent, getFirstChar } from './AvatarList.component';
import * as css from './AvatarList.css';

export * from './types';

export const AvatarList = Object.assign(AvatarListComponent, { css, getFirstChar });
