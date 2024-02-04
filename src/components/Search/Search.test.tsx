import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Search } from '.'; // Adjust the import path based on your project structure

describe('Search Component', () => {
  it('renders Search component with default value', () => {
    const onChangeMock = jest.fn();
    render(<Search value="" onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText('Сurrency search...');
    waitFor(() => {
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveValue('');
    });

    const searchButton = screen.getByTestId('search-button');
    waitFor(() => {
      expect(searchButton).toBeInTheDocument();
    });
  });

  it('updates search value on input change', () => {
    const onChangeMock = jest.fn();
    render(<Search value="" onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText('Сurrency search...');
    fireEvent.change(inputElement, { target: { value: 'USD' } });

    expect(inputElement).toHaveValue('USD');
  });

  it('calls onChange prop on button click', () => {
    const onChangeMock = jest.fn();
    render(<Search value="" onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText('Сurrency search...');
    fireEvent.change(inputElement, { target: { value: 'USD' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(onChangeMock).toHaveBeenCalledWith('USD');
  });
});

