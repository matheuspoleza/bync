import { Box as BoxComponent } from './Box.component';
import * as css from './Box.css';

export * from './types';

export const Box = Object.assign(BoxComponent, { css });
