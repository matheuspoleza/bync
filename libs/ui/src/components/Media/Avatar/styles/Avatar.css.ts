import type { ComplexStyleRule } from '@bync/style';
import { recipe, style, styleVariants } from '@bync/style';

import { Theme } from '@/styles';
import { border, colors } from '@/styles/theme';

import {
  themedCopper,
  themedDarkCopper,
  themedDarkFern,
  themedDarkHavelock,
  themedDarkHibiscus,
  themedDefault,
  themedFern,
  themedHibiscus,
} from './Themed.css';

const size = '24px';
const sizeMedium = '28px';

export const avatarContainer: ComplexStyleRule = {
  display: 'inline-block',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: border.radius.round,
  cursor: 'default',
};

export const childContainer = style({
  position: 'absolute',
  fontWeight: 600,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

export const avatar = style({
  width: 'inherit',
  height: 'inherit',
  position: 'absolute',
  borderRadius: border.radius.round,
  objectFit: 'cover',
});

const dark: ComplexStyleRule = {
  color: colors.white[80],
  backgroundColor: colors.neutralLight.neutralsLight900,
};

const base: ComplexStyleRule = {
  color: colors.neutralDark.neutralsDark200,
  backgroundColor: colors.neutralLight.neutralsLight50,
};

export const textStyles = style({
  // font is slightly jumping with line height
  marginTop: '2px',
  display: 'block',
  textTransform: 'uppercase',
  fontSize: '14px',
  lineHeight: '20px',
  fontFamily: Theme.vars.font.family.default,
});

export const avatarVariants = styleVariants({
  base,
  fern: themedFern,
  hibiscus: themedHibiscus,
  copper: themedCopper,
  havelock: themedDefault,

  dark,
  darkFern: themedDarkFern,
  darkHibiscus: themedDarkHibiscus,
  darkCopper: themedDarkCopper,
  darkHavelock: themedDarkHavelock,
});

export const avatarSizes = styleVariants({
  small: {
    height: size,
    width: size,
  },
  medium: {
    height: sizeMedium,
    width: sizeMedium,
  },
});

export const avatarRecipe = recipe({
  base: avatarContainer,
  variants: {
    variant: avatarVariants,
    size: avatarSizes,
  },
});
