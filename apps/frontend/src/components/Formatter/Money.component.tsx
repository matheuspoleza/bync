import currency from 'currency.js';

interface MoneyFormatterProps {
  value: number;
}

export const MoneyFormatter: React.FC<MoneyFormatterProps> = ({ value }) => {
  return (
    <>
      {currency(Number(value) / 1000, {
        symbol: 'R$',
        decimal: ',',
        separator: '.',
      }).format()}
    </>
  );
};
