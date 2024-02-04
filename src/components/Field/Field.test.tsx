import { fireEvent, render } from '@testing-library/react';

import { Field } from '.';

test('Field component renders correctly and handles onChange', () => {
  const mockOnChange = jest.fn();
  const placeholderText = 'Enter something';

  const { getByTestId, getByPlaceholderText } = render(
    <Field value="" onChange={mockOnChange} placeholder={placeholderText} />,
  );

  const inputElement = getByPlaceholderText(placeholderText);
  expect(inputElement).toBeInTheDocument();

  const fieldContainer = getByTestId('field');
  expect(fieldContainer).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: 'TestInput' } });

  expect(mockOnChange).toHaveBeenCalledWith('TestInput');
});

