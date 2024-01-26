import { style } from '@bync/style';

import { tabTokens } from '@/styles/theme/components';

export const containerStyles = style({
  color: tabTokens.color.counter.text,
  backgroundColor: tabTokens.color.counter.background,
  padding: '0 4px',
  height: '16px',
  display: 'flex',
  borderRadius: tabTokens.borders.radius.counter,
  marginLeft: '6px',
});

export const styles = style({
  color: tabTokens.color.text.default,
});
