import { isURLValid } from './isUrlValid';

export const isSitemapInfoValid = (domains: string, patterns: string): boolean => {
  if (!domains.length && !patterns.length) return true;

  const isValid = (urls: string) => !urls.split('\n').some((url) => !isURLValid(url));

  if (domains.length) {
    return isValid(domains);
  }

  if (patterns.length) {
    return isValid(patterns);
  }

  return true;
};
