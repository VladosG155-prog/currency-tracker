import { jest } from '@jest/globals';
import { render } from '@testing-library/react';

import { CurrencyCard } from '.';

jest.mock('@utils/convertCurrencyValue', () => ({
  truncateToTwoSignificantDigits: jest.fn((value) => value),
}));

jest.mock('../Icon', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('CurrencyCard component', () => {
  const mockProps = {
    title: 'Currency Title',
    name: 'usd',
    value: 2,
    onClick: jest.fn(),
  };

  test('renders with correct values', () => {
    const { getByTestId } = render(
      <CurrencyCard
        title={mockProps.title}
        name={mockProps.name}
        value={mockProps.value}
        onClick={mockProps.onClick}
      />,
    );
    const cardElement = getByTestId('currency-card');

    expect(cardElement).toBeInTheDocument();
  });
});

