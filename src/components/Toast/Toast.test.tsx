import { render, screen, waitFor } from '@testing-library/react';
import { observable } from '@root/utils/observer';
import { Toast } from '.';

describe('Toast Component', () => {
  it('renders Toast component with title', () => {
    const subscribeMock = jest.fn();
    observable.subscribe = subscribeMock;

    render(<Toast />);

    waitFor(() => {
      observable.notify('Test Toast');
    });

    waitFor(() => {
      const toastElement = screen.getByText('Test Toast');
      expect(toastElement).toBeInTheDocument();
    });
  });
});

