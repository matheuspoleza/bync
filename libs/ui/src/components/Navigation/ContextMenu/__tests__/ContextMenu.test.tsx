// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe } from 'vitest';

import { Button } from '@/components/Buttons';

import type { IContextMenu, IContextMenuReference } from '../ContextMenu.component';
import { ContextMenu } from '../ContextMenu.component';

describe('ContextMenu', () => {
  const component = (props: Partial<IContextMenu>) => {
    const testID = 'test-id';
    const referenceElement = ({ onContextMenu }: IContextMenuReference) => (
      <Button label="Label" testID={testID} onContextMenu={onContextMenu} onClick={() => null} />
    );

    const { queryByTestId, getByTestId } = render(
      <ContextMenu {...props} referenceElement={referenceElement} testID={testID}>
        {(args) => props.children!(args)}
      </ContextMenu>
    );

    return {
      getMenu: () => queryByTestId(`${testID}--popper-content`),
      anchor: getByTestId(testID),
    };
  };

  it('should render reference element with no menu before click', () => {
    const { anchor, getMenu } = component({ children: () => <div /> });

    expect(anchor).toBeInTheDocument();
    expect(getMenu()).not.toBeInTheDocument();
  });

  it('should render menu after right click', async () => {
    const { anchor, getMenu } = component({ children: () => <div /> });

    fireEvent.contextMenu(anchor);

    expect(await getMenu()).toBeInTheDocument();
  });
});
