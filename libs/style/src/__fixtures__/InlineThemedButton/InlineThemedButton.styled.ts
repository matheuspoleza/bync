import { styled } from '@/main';

import { Button } from '../Button';
import * as Theme from '../theme.css';
import { themed } from './InlineThemedButton.css';

export const Base = styled.button([Button.Base, themed], { theme: Theme.vars });
