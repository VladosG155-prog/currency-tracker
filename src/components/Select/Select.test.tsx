import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Select } from '.';

describe('Select Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders Select component with default value and options', () => {
    const onChangeMock = jest.fn();

    waitFor(() => {
      render(
        <Select value="option1" onChange={onChangeMock} options={options} />,
      );
    });

    const inputElement = screen.getByPlaceholderText('Select value');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('option1');

    fireEvent.click(inputElement);

    const optionsElement = screen.getByTestId('options');
    expect(optionsElement).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(optionsElement).not.toBeInTheDocument();
  });
});
