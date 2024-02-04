import { Provider } from 'react-redux';
import { store } from '@root/store/store';
import { render, waitFor } from '@testing-library/react';

import { Footer } from '.';

describe('Footer component', () => {
  test('renders Footer component', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Footer />
      </Provider>,
    );

    const footerContainer = getByTestId('footer');
    waitFor(() => {
      expect(footerContainer).toBeInTheDocument();
    });
  });
});

