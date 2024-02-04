import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Modal } from '.';

describe('Modal Component', () => {
  it('renders Modal component with correct data', () => {
    const onCloseMock = jest.fn();
    const title = 'Test Modal Title';

    render(
      <Modal onClose={onCloseMock} title={title}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modalElement = screen.getByTestId('modal');
    expect(modalElement).toBeInTheDocument();

    expect(screen.getByText(title)).toBeInTheDocument();

    expect(screen.getByText('Modal Content')).toBeInTheDocument();

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('closes Modal when clicked outside the content area', () => {
    const onCloseMock = jest.fn();
    const title = 'Test Modal Title';

    render(
      <Modal onClose={onCloseMock} title={title}>
        <div>Modal Content</div>
      </Modal>,
    );

    act(() => {
      fireEvent.click(document);
    });

    expect(onCloseMock).toHaveBeenCalled();
  });
});

