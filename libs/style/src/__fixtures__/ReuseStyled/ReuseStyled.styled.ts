import { styled } from '@/main';

import { Button } from '../Button';
import { override } from './ReuseStyled.css';

export const Base = styled.button([Button.Base, override]);
