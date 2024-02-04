import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { truncateToTwoSignificantDigits } from '@utils/convertCurrencyValue';

import { CurrencyCard } from '.';

describe('CurrencyCard component', () => {
  const mockProps = {
    title: 'USD',
    name: 'usdIcon',
    value: 1.23,
    onClick: jest.fn(),
  };

  it('renders correctly', () => {
    waitFor(() => {
      render(<CurrencyCard {...mockProps} />);
    });

    const cardElement = screen.getByTestId('currency-card');
    const titleElement = screen.getByText('USD');
    const currencyValueElement = screen.getByText(
      truncateToTwoSignificantDigits(1 / mockProps.value) + ' BYN',
    );

    expect(cardElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(currencyValueElement).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    render(<CurrencyCard {...mockProps} />);

    const cardElement = screen.getByTestId('currency-card');

    fireEvent.click(cardElement);

    waitFor(() => {
      expect(mockProps.onClick).toHaveBeenCalled();
    });
  });
});

