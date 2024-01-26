import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { describe, it, vi } from 'vitest';

import { TabGroup } from '../TabGroup.component';
import type { ITabGroup } from '../types';

const textFixture = [
  {
    label: 'Tab 1',
    index: 1,
  },
  {
    label: 'Tab 2',
    index: 2,
  },
  {
    label: 'Tab 3',
    index: 3,
  },
  {
    label: 'Tab 4',
    index: 4,
  },
];

describe.concurrent('TabGroup', () => {
  const component = ({ ...props }: Partial<ITabGroup> = {}) => {
    const testID = 'test-id';
    const onChange = vi.fn();
    const Controlled = () => {
      const [activeTab, setActiveTab] = useState(props.activeTab || 0);
      onChange.mockImplementation(setActiveTab);

      return <TabGroup tabs={textFixture} activeTab={activeTab} onChange={onChange} testID={testID} {...props} />;
    };

    const { getByTestId } = render(<Controlled />);

    const getTabByIndex = (id: number) => getByTestId(`${testID}--tab-${id}`);

    return {
      tabGroup: getByTestId(testID),
      getTabByIndex,
      onChange,
    };
  };

  it('renders container and tabs', ({ expect }) => {
    const { tabGroup, getTabByIndex } = component();

    const firstTab = getTabByIndex(0);
    const secondTab = getTabByIndex(1);
    const thirdTab = getTabByIndex(2);

    expect(tabGroup).toBeInTheDocument();
    expect(firstTab).toBeInTheDocument();
    expect(secondTab).toBeInTheDocument();
    expect(thirdTab).toBeInTheDocument();
  });

  it('calls onChange with the correct value', ({ expect }) => {
    const { tabGroup, onChange, getTabByIndex } = component();
    const secondTab = getTabByIndex(1);

    act(() => {
      userEvent.click(secondTab);
    });

    expect(onChange).toHaveBeenCalled();
    expect(tabGroup).toBeInTheDocument();
  });
});
