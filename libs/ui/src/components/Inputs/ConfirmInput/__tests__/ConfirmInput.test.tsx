import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '@/components';
import { ConfirmInput } from '@/components/Inputs/ConfirmInput';

describe.concurrent('ConfirmInput', () => {
  const component = (isLoading: boolean) => {
    const { getByRole } = render(
      <ConfirmInput isLoading={isLoading}>
        {({ disabled, isLoading }) => (
          <>
            <Input value="Hello" disabled={disabled} />
            <ConfirmInput.Button disabled={disabled} isLoading={isLoading} />
          </>
        )}
      </ConfirmInput>
    );

    return {
      input: getByRole('textbox'),
      button: getByRole('button'),
    };
  };

  it('renders input and button', () => {
    const { input, button } = component(false);

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('disables input and button when isLoading is true', () => {
    const { input, button } = component(true);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
