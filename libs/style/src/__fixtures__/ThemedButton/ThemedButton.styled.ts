import { styled } from '@/main';

import { Button } from '../Button';
import { themed } from './ThemedButton.css';

export const Base = styled.button([Button.Base, themed]);
