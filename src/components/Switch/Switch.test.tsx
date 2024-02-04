import { fireEvent, render, screen } from '@testing-library/react';

import Switch from '.';

describe('Switch Component', () => {
  it('renders Switch component with correct data', () => {
    const onChangeMock = jest.fn();
    const checked = true; // or false based on your needs

    render(<Switch onChange={onChangeMock} checked={checked} />);

    // Check if the switch component is rendered
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();

    // Check if the input checkbox is rendered and has the correct checked state
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveProperty('checked', checked);

    // Check if the slider is rendered
    const sliderElement = screen.getByTestId('switch-slider');
    expect(sliderElement).toBeInTheDocument();
    expect(sliderElement).toHaveClass('round');
  });

  it('calls onChange callback when switch is toggled', () => {
    const onChangeMock = jest.fn();
    const checked = true; // or false based on your needs

    render(<Switch onChange={onChangeMock} checked={checked} />);

    // Click the switch to toggle the state
    fireEvent.click(screen.getByTestId('switch'));

    // Check if the onChange callback is called
    expect(onChangeMock).toHaveBeenCalled();
  });
});

