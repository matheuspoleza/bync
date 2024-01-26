import { recipe, styleVariants } from '@bync/style';

import { colors } from '@/styles/theme';

export const gaugeContainerVariants = styleVariants({
  notification: {
    background: colors.white[20],
  },
  table: {
    background: colors.neutralDark.neutralsDark900_6,
  },
});

export const gaugeContainerStyle = recipe({
  base: {},
  variants: {
    variant: gaugeContainerVariants,
  },
});

export const gaugeLevels = styleVariants({
  low: {},
  ok: {},
  good: {},
  great: {},
});

export const gaugeVariants = styleVariants({
  table: {},
  notification: {},
});

export const gaugeStyle = recipe({
  base: {},
  variants: {
    level: gaugeLevels,
    variant: gaugeVariants,
  },
  compoundVariants: [
    {
      variants: {
        variant: 'table',
        level: 'low',
      },
      style: {
        background: colors.alert.alert600,
      },
    },
    {
      variants: {
        variant: 'table',
        level: 'ok',
      },
      style: {
        background: colors.havelock.havelock600,
      },
    },
    {
      variants: {
        variant: 'table',
        level: 'good',
      },
      style: {
        background: colors.success.success500,
      },
    },
    {
      variants: {
        variant: 'table',
        level: 'great',
      },
      style: {
        background: colors.success.success600,
      },
    },
    {
      variants: {
        variant: 'notification',
        level: 'low',
      },
      style: {
        background: colors.alert.alert100,
      },
    },
    {
      variants: {
        variant: 'notification',
        level: 'ok',
      },
      style: {
        background: colors.havelock.havelock100,
      },
    },
    {
      variants: {
        variant: 'notification',
        level: 'good',
      },
      style: {
        background: colors.success.success100,
      },
    },
    {
      variants: {
        variant: 'notification',
        level: 'great',
      },
      style: {
        background: colors.success.success100,
      },
    },
  ],
});
