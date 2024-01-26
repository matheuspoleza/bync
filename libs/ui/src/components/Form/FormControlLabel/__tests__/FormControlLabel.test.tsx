import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import type { IFormControlLabel } from '../FormControlLabel.component';
import { FormControlLabel } from '../FormControlLabel.component';

describe('Form Control Label', () => {
  const component = (props?: Partial<IFormControlLabel>) => {
    const testID = 'test-id';

    const { queryByTestId } = render(
      <FormControlLabel id={testID} testID={testID} {...props}>
        <span />
      </FormControlLabel>
    );

    return {
      label: queryByTestId(`${testID}--label`),
      caption: queryByTestId(`${testID}--caption`),
    };
  };

  it('should render a label and a caption', () => {
    const label = 'Radio label';
    const caption = 'Caption';

    const result = component({ label, caption });

    expect(result.label).toBeInTheDocument();
    expect(result.label).toHaveTextContent(label);

    expect(result.caption).toBeInTheDocument();
    expect(result.caption).toHaveTextContent(caption);
  });
});
