import currency from 'currency.js';

export const format = (value: number) =>
  currency(Number(value) / 1000, {
    symbol: 'R$',
    decimal: ',',
    separator: '.',
  }).format();
