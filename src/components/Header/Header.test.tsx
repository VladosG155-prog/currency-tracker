import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@root/store/store';
import { render, waitFor } from '@testing-library/react';

import Header from '.';

describe('Header Component', () => {
  it('renders Header component with correct data', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const header = getByTestId('header');
    waitFor(() => {
      expect(header).toBeInTheDocument();
    });
  });
});
