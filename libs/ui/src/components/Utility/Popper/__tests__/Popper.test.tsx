import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';

import { Popper } from '@/components/Utility/Popper';

import type { IPopper } from '../Popper.interface';

describe('Popper component tests', () => {
  const component = ({ children = () => 'popping message', ...props }: Partial<IPopper<unknown>> = {}) => {
    const testID = 'test-id';

    const { findByTestId, queryByTestId } = render(
      <Popper
        testID={testID}
        referenceElement={({ onToggle, attributes }) => (
          <button {...attributes} onClick={onToggle}>
            click me
          </button>
        )}
        {...props}
      >
        {children}
      </Popper>
    );

    return {
      findReference: () => findByTestId(`${testID}--popper-reference`),
      queryContent: () => queryByTestId(`${testID}--popper-content`),
      findByTestId,
    };
  };

  it('should render a popper with plain text', async () => {
    const { queryContent } = component({ isOpen: true });

    await waitFor(() => expect(queryContent()).toBeInTheDocument());
  });

  it("should render a popper only when it's toggler is clicked", async () => {
    const { queryContent, findReference } = component({ isOpen: false });

    await act(() => findReference().then(userEvent.click));

    expect(queryContent()).toBeInTheDocument();

    await act(() => findReference().then(userEvent.click));

    expect(queryContent()).not.toBeInTheDocument();
  });

  it('should render nested popper on click', async () => {
    const nestedButtonTestID = 'nested-button-test-id';
    const nestedContentTestID = 'nested-content-test-id';

    const { queryContent, findReference, findByTestId } = component({
      isOpen: false,
      children: () => (
        <>
          <Popper
            referenceElement={({ onToggle }) => (
              <button onClick={onToggle} data-testid={nestedButtonTestID}>
                click me too
              </button>
            )}
          >
            {() => <span data-testid={nestedContentTestID}>nested content</span>}
          </Popper>
        </>
      ),
    });

    await act(() => findReference().then(userEvent.click));

    expect(queryContent()).toBeInTheDocument();

    await act(() => findByTestId(nestedButtonTestID).then(userEvent.click));

    expect(await findByTestId(nestedContentTestID)).toBeInTheDocument();
  });
});
