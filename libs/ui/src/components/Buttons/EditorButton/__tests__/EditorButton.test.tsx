import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { EditorButton } from '../EditorButton.component';
import { EditorButtonSuffixButton } from '../EditorButtonSuffixButton';
import type { IEditorButton } from '../types';

describe.concurrent('Button', () => {
  const component = (props?: Partial<IEditorButton>) => {
    const testID = 'test-id';
    const firstButtonTestID = `${testID}--first-icon`;
    const secondButtonTestID = `${testID}--second-icon`;
    const onClick = vi.fn();
    const onFirstIconClick = vi.fn();
    const onSecondIconClick = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <EditorButton
        label="howdy"
        prefixIconName="Copy"
        suffixButtons={[
          <EditorButtonSuffixButton key={0} iconName="More" onClick={onFirstIconClick} testID={firstButtonTestID} />,
          <EditorButtonSuffixButton key={1} iconName="Minus" onClick={onSecondIconClick} testID={secondButtonTestID} />,
        ]}
        onClick={onClick}
        testID={testID}
        {...props}
      />
    );

    return {
      button: getByTestId(testID),
      firstIcon: queryByTestId(`${testID}--first-icon`),
      secondIcon: queryByTestId(`${testID}--second-icon`),
      onClick,
      onFirstIconClick,
      onSecondIconClick,
    };
  };

  it('should render successfully', ({ expect }) => {
    const { button } = component();

    expect(button).toBeInTheDocument();
  });

  it('handles the click for the main button', ({ expect }) => {
    const { button, onClick } = component();

    userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('triggers the first icon handler when clicked', ({ expect }) => {
    const { firstIcon, onFirstIconClick } = component();

    if (firstIcon) {
      userEvent.click(firstIcon);
    }

    expect(onFirstIconClick).toHaveBeenCalled();
  });

  it('triggers the second icon handler when clicked', ({ expect }) => {
    const { secondIcon, onSecondIconClick } = component();

    if (secondIcon) {
      userEvent.click(secondIcon);
    }

    expect(onSecondIconClick).toHaveBeenCalled();
  });
});
