import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResizeObserver from 'resize-observer-polyfill';
import { describe, it } from 'vitest';

import { Scroll } from '@/components/Utility/Scroll/Scroll.component';

import { CollapsibleList } from '../CollapsibleList.component';
import { shortList } from '../fixtures';

const items = shortList;
const testID = 'test-id';

interface ComponentProps {
  itemsLimit?: number;
}

const Component = ({ itemsLimit = 4 }: ComponentProps) => {
  const renderItem = ({ item: { title } }: any) => <span>{title}</span>;

  return (
    <Scroll testID={`${testID}--scroll`}>
      <CollapsibleList
        items={items}
        testID={testID}
        renderItem={renderItem}
        itemsLimit={itemsLimit}
        collapseLabel="sample phrases"
        estimatedItemSize={10}
      />
    </Scroll>
  );
};

describe('CollapsibleList', () => {
  global.ResizeObserver = ResizeObserver;

  const component = (props?: ComponentProps) => {
    const { getByTestId, queryByText, queryByTestId } = render(<Component {...props} />);

    return {
      list: getByTestId(`${testID}--list`),
      scroll: getByTestId(`${testID}--scroll`),
      firstItem: queryByText(items[0]?.title),
      getButton: () => queryByTestId(`${testID}--button`),
      getLastItem: () => queryByText(items[items.length - 1]?.title),
    };
  };

  it('renders a collapsed CollapsibleList', () => {
    const { firstItem, getLastItem } = component();

    expect(firstItem).toBeInTheDocument();
    expect(getLastItem()).not.toBeInTheDocument();
  });

  it('renders a collapsed CollapsibleList without expand button if not required', () => {
    const { getButton } = component({ itemsLimit: 10 });

    expect(getButton()).not.toBeInTheDocument();
  });

  it('renders a working expand button', async () => {
    const { getButton, getLastItem, scroll } = component();

    expect(getButton()).toHaveTextContent('Show all sample phrases (7)');

    act(() => {
      userEvent.click(getButton()!);
    });

    fireEvent.scroll(scroll, { target: { scrollTop: 20 * 30 } });

    await waitFor(() => expect(getLastItem()).toBeInTheDocument());

    expect(getButton()).toHaveTextContent('Hide some sample phrases');
    expect(getLastItem()).toBeInTheDocument();
  });
});
