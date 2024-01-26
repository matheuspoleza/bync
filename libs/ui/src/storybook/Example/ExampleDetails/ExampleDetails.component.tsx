import { ExampleLabel } from '../ExampleLabel';
import { exampleDetailsStyles } from './ExampleDetails.css';

export interface IExampleDetails {
  details: Record<string, any>;
}

export const ExampleDetails: React.FC<IExampleDetails> = ({ details }) => (
  <div className={exampleDetailsStyles}>
    {Object.entries(details).map(([key, value]) => {
      if (value === undefined) return null;

      let displayValue;

      try {
        displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
      } catch (err) {
        return null;
      }

      return (
        <ExampleLabel key={key}>
          <strong>{key}</strong>: {displayValue}
        </ExampleLabel>
      );
    })}
  </div>
);
