import { jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';

import Toast from '.';

jest.useFakeTimers();

describe('Toast Component', () => {
  it('renders Toast component with title', () => {
    render(<Toast title="Test Toast" onClose={() => {}} />);
    const toastElement = screen.getByText('Test Toast');
    expect(toastElement).toBeInTheDocument();
  });

  it('calls onClose after a certain duration', async () => {
    const onCloseMock = jest.fn();
    render(<Toast title="Test Toast" onClose={onCloseMock} />);

    // Ensure that the onClose function is not called initially
    expect(onCloseMock).not.toHaveBeenCalled();

    // Fast-forward time by 2 seconds
    jest.advanceTimersByTime(2000);

    // Wait for the component to unmount
    await waitFor(() => {
      // Check if the onClose function is called after the specified duration
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});

