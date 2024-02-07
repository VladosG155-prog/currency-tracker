import { fireEvent, render, screen } from '@testing-library/react';

import Switch from '.';

describe('Switch Component', () => {
  it('renders Switch component with correct data', () => {
    const onChangeMock = jest.fn();
    const checked = true;

    render(<Switch onChange={onChangeMock} checked={checked} />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();

    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveProperty('checked', checked);

    const sliderElement = screen.getByTestId('switch-slider');
    expect(sliderElement).toBeInTheDocument();
    expect(sliderElement).toHaveClass('round');
  });

  it('calls onChange callback when switch is toggled', () => {
    const onChangeMock = jest.fn();
    const checked = true;

    render(<Switch onChange={onChangeMock} checked={checked} />);

    fireEvent.click(screen.getByTestId('switch'));

    expect(onChangeMock).toHaveBeenCalled();
  });
});
