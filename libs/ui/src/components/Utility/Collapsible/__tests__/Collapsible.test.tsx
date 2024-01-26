import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Collapsible } from '../Collapsible.component';
import { CollapsibleHeader } from '../CollapsibleHeader';
import type { ICollapsible } from '../types';

describe('Collapsible', () => {
  const component = (props: Partial<ICollapsible> = {}) => {
    const testID = 'test-id';
    const headerTestID = `${testID}--header`;
    const contentTestID = `${testID}--content`;

    const { getByTestId } = render(
      <Collapsible
        header={<CollapsibleHeader label="Label" caption="Caption" testID={headerTestID} />}
        isOpen={false}
        testID={testID}
        {...props}
      >
        <div data-testid={contentTestID}>Howdy</div>
      </Collapsible>
    );

    return {
      header: getByTestId(`${testID}--header`),
      content: getByTestId(`${testID}--content`),
      wrapper: getByTestId(testID),
    };
  };

  it('should render successfully', async () => {
    const { content } = component();

    expect(content).toBeInTheDocument();
  });
});
