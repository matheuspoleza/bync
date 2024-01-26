import random from 'lodash/random';

export const getEntityValue = (value = '', synonyms = '') => {
  return {
    id: String(random(1, 100000)),
    firstLine: {
      value,
    },
    secondLine: {
      value: synonyms,
    },
  };
};

export const generateValues = (count: number) => {
  return Array.from({ length: count }).map(() => getEntityValue('New value', 'first, second, third'));
};
