import { createColorPalette } from '@/utils/colors/color.util';

import { colors } from '../tokens';

export interface IVariableEntityTheme {
  [key: string]: string;
}

interface IThemeName {
  [key: string]: IVariableEntityTheme;
}

interface IThemeType {
  variable: IThemeName;
  entity: IThemeName;
}

export const color: IThemeType = {
  variable: {
    neutral: {
      bracket: colors.neutralDark.neutralsDark100,
      border: colors.neutralLight.neutralsLight200,
      text: colors.neutralDark.neutralsDark400,
    },
    havelock: {
      bracket: colors.havelock.havelock500,
      border: colors.accent.accent100,
      text: colors.havelock.havelock700,
    },
    hibiscus: {
      bracket: colors.hibiscus.hibiscus500,
      border: colors.hibiscus.hibiscus100,
      text: colors.hibiscus.hibiscus700,
    },
    copper: {
      bracket: colors.copper.copper500,
      border: colors.copper.copper100,
      text: colors.copper.copper700,
    },
    fern: {
      bracket: colors.fern.fern500,
      border: colors.fern.fern100,
      text: colors.fern.fern700,
    },
  },
  entity: {
    neutral: {
      bracket: colors.neutralLight.neutralsLight600,
      text: colors.neutralLight.neutralsLight50,
      background: colors.neutralDark.neutralsDark200,
    },
    havelock: {
      bracket: colors.havelock.havelock500,
      text: colors.havelock.havelock50,
      background: colors.havelock.havelock700,
    },
    hibiscus: {
      bracket: colors.hibiscus.hibiscus500,
      text: colors.hibiscus.hibiscus50,
      background: colors.hibiscus.hibiscus700,
    },
    copper: {
      bracket: colors.copper.copper400,
      text: colors.copper.copper50,
      background: colors.copper.copper700,
    },
    fern: {
      bracket: colors.fern.fern500,
      text: colors.fern.fern50,
      background: colors.fern.fern700,
    },
  },
};

export const shadows = {
  isActive: {
    true: '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #397DFF, 0px 1px 0px rgba(0, 0, 0, 0.85)',
    false: '0px 0px 0px 2px transparent, 0px 0px 0px 4px transparent, 0px 1px 0px transparent',
  },
};

const colorMapper: Record<string, string> = {
  [colors.neutralDark.neutralsDark200]: 'neutral',
  [colors.havelock.havelock500]: 'havelock',
  [colors.hibiscus.hibiscus500]: 'hibiscus',
  [colors.copper.copper500]: 'copper',
  [colors.fern.fern500]: 'fern',
};

export const getTheme = (colorHex: string, type: 'variable' | 'entity') => {
  const upperCaseColor = colorHex.toUpperCase();
  if (Object.keys(colorMapper).includes(upperCaseColor)) return color[type][colorMapper[upperCaseColor]];

  const palette = createColorPalette(upperCaseColor);

  switch (type) {
    case 'variable':
      return {
        bracket: palette[500],
        border: palette[100],
        text: palette[700],
      };
    case 'entity':
    default:
      return {
        bracket: palette[500],
        text: palette[50],
        background: palette[700],
      };
  }
};
