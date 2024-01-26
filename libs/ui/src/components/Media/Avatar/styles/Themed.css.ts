import type { ComplexStyleRule } from '@bync/style';

import { colors } from '@/styles/theme';

export const themedDefault: ComplexStyleRule = {
  backgroundColor: colors.havelock.havelock50,
  color: colors.havelock.havelock600,
};

export const themedHibiscus: ComplexStyleRule = {
  backgroundColor: colors.hibiscus.hibiscus50,
  color: colors.hibiscus.hibiscus600,
};

export const themedFern: ComplexStyleRule = {
  backgroundColor: colors.fern.fern50,
  color: colors.fern.fern600,
};

export const themedCopper: ComplexStyleRule = {
  backgroundColor: colors.copper.copper50,
  color: colors.copper.copper600,
};

export const themedDarkHavelock: ComplexStyleRule = {
  backgroundColor: colors.havelock.havelock600,
  color: colors.white[80],
};

export const themedDarkHibiscus: ComplexStyleRule = {
  backgroundColor: colors.hibiscus.hibiscus600,
  color: colors.white[80],
};

export const themedDarkFern: ComplexStyleRule = {
  backgroundColor: colors.fern.fern600,
  color: colors.white[80],
};

export const themedDarkCopper: ComplexStyleRule = {
  backgroundColor: colors.copper.copper600,
  color: colors.white[80],
};
