import { style } from '@bync/style';

import { border, shadows, spacing } from '@/styles/theme';

import * as ToastTheme from './ToastTheme.css';

export const SYSTEM_MESSAGE_HEIGHT = 36;

export const baseStyles = style({
  boxShadow: shadows.toastShadows.container,
  display: 'inline-flex',
  borderRadius: border.radius[8],
  filter: 'drop-shadow(0px 1px 0px rgba(22, 26, 30, 0.02))',
});

export const contentStyles = style({
  margin: '0',

  height: SYSTEM_MESSAGE_HEIGHT,
  color: ToastTheme.contract.color,
  backgroundColor: ToastTheme.contract.backgroundColor,
  boxShadow: shadows.toastShadows.content,

  display: 'inline-flex',
  alignItems: 'center',
  paddingTop: spacing.spacing[2],
  paddingBottom: spacing.spacing[2],
  borderRadius: border.radius[8],
});

export const closeButtonStyles = style({
  borderRadius: spacing.spacing[6],
  paddingLeft: spacing.spacing[12],
  paddingRight: spacing.spacing[12],
});

export const actionButtonButtonStyles = style({
  borderRadius: spacing.spacing[6],
});

export const loadingSpinnerContainer = style({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: spacing.spacing[8],
});

export const loadingSpinnerStyles = style({});

export const toastIconStyle = style({
  color: ToastTheme.contract.icon.color,
  marginRight: spacing.spacing[8],
});

export const toastTextStyle = style({
  whiteSpace: 'nowrap',
  color: ToastTheme.contract.text.color,
  marginTop: 1,
});
