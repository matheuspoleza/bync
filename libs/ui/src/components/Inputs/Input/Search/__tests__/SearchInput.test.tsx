import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
import { createRef } from 'react';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import { SearchInput } from '../SearchInput.component';
import type { ISearchInput } from '../types';

const emptyValue = '';

type SearchInputWithRef = Partial<ISearchInput> & {
  ref?: RefObject<HTMLInputElement>;
};

describe.concurrent('SearchInput', () => {
  const Component = ({ value: initialValue = 'Hello', ...props }: SearchInputWithRef = {}) => {
    const testID = 'test-id';
    const inputRef = createRef<HTMLInputElement>();
    const [onValueChange, Controlled] = mockFormControl(SearchInput, initialValue);
    const { getByTestId, queryByTestId } = render(<Controlled id={testID} testID={testID} {...props} />);

    return {
      input: getByTestId(`${testID}--input`),
      closeIcon: queryByTestId(`${testID}--close-icon`),
      searchIcon: queryByTestId(`${testID}--search-icon`),
      onValueChange,
      ref: inputRef,
    };
  };

  it('shows a placeholder', ({ expect }) => {
    const placeholder = 'holder of place';

    const { input } = Component({ placeholder });

    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('displays a search icon when empty', ({ expect }) => {
    const { searchIcon } = Component({ value: emptyValue });

    expect(searchIcon).toBeInTheDocument();
  });

  it('renders with an initial value', ({ expect }) => {
    const value = 'Howdy Folks!';

    const { input } = Component({ value });

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
  });

  it('displays a close icon when value provided', ({ expect }) => {
    const { closeIcon } = Component({ value: 'testing' });

    expect(closeIcon).toBeInTheDocument();
  });

  it('updates value on change', ({ expect }) => {
    const text = 'Howdy World!';
    const { input, onValueChange } = Component({ value: emptyValue });

    act(() => userEvent.type(input, text));

    expect(onValueChange).toHaveBeenNthCalledWith(text.length, text);

    expect(input).toHaveValue(text);
  });

  it('triggers the prefix icon on click correctly', ({ expect }) => {
    const { closeIcon, onValueChange } = Component();

    userEvent.click(closeIcon!);

    expect(onValueChange).toBeCalledWith(emptyValue);
  });

  it('is able to be passed a ref', ({ expect }) => {
    const { input, ref } = Component({ value: 'howdy' });

    expect(ref.current).toBe(input.nodeValue);
  });

  it('autofocuses when requested', ({ expect }) => {
    const { input } = Component({ autoFocus: true });

    expect(input).toHaveFocus();
  });
});
