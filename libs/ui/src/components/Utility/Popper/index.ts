import { Popper as PopperComponent } from './Popper.component';
import { DEFAULT_MODIFIERS } from './Popper.constant';

export type {
  PopperChildrenProps,
  PopperDefaultModifiers,
  PopperModifiers,
  PopperReferenceProps,
} from './Popper.interface';

export const Popper = Object.assign(PopperComponent, {
  DEFAULT_MODIFIERS,
});
