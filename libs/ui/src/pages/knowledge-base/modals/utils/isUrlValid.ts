const VALID_URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+\/?$/;

export const isURLValid = (url: string) => {
  return !!url.match(VALID_URL_PATTERN);
};

export const isMultiURLInputValid = (urls: string) => {
  const urlArray = urls.split('\n').filter(Boolean);
  return urlArray.every((url) => isURLValid(url));
};
