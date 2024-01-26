import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { DataNotification } from '../DataNotification.component';
import type { IDataNotification } from '../types';

const scores = {
  low: 24,
  ok: 64,
  good: 85,
};

describe('DataNotification', () => {
  const component = (props: IDataNotification) => {
    const testID = 'testId';
    const { getByTestId, queryByText, queryByTestId } = render(<DataNotification testID={testID} {...props} />);

    return {
      dataNotification: getByTestId(testID),
      dataNotificationButton: queryByTestId(`${testID}--button`),
      getConfidenceTypeWithScore: (score: number) => queryByText(`Confidence: ${score}`),
      getClarityTypeWithScore: (score: number) => queryByText(`Clarity: ${score}`),
    };
  };

  it('renders the confidence notification type', ({ expect }) => {
    const { getConfidenceTypeWithScore } = component({ score: scores.low, type: 'confidence' });

    expect(getConfidenceTypeWithScore(scores.low)).toBeInTheDocument();
  });

  it('renders the clarity notification type', ({ expect }) => {
    const { getClarityTypeWithScore } = component({ score: scores.low, type: 'clarity' });

    expect(getClarityTypeWithScore(scores.low)).toBeInTheDocument();
  });

  it('renders the notification with a working button when callback handler is provided', ({ expect }) => {
    const onClick = vi.fn();
    const { dataNotificationButton } = component({ score: scores.ok, onButtonClick: onClick });

    userEvent.click(dataNotificationButton!);

    expect(dataNotificationButton).toBeInTheDocument();
    expect(onClick).toHaveBeenCalled();
  });
});
