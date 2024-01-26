import { styled } from '@/main';

import { Button } from '../Button';
import { base, colorVar } from './InlineVarButton.css';

export const Base = styled.button([Button.Base, base], {
  vars: {
    brandColor: colorVar,
  },
});
