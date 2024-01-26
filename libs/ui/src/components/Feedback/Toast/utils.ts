import { SYSTEM_MESSAGE_HEIGHT } from './Toast.css';

export const calculateToastPosition = (index: number, gap = 16) => {
  return index * (SYSTEM_MESSAGE_HEIGHT + gap);
};
