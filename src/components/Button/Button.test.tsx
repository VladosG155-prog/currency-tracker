import { fireEvent, render } from '@testing-library/react';

import { Button } from '.';

describe('Button component', () => {
  test('renders with default variant', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock} variant="default">
        Click me
      </Button>,
    );

    const button = getByText('Click me');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('root');
    expect(button).toHaveAttribute('data-variant', 'default');
  });

  test('calls onClick prop when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock} variant="success">
        Click me
      </Button>,
    );

    const button = getByText('Click me');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

