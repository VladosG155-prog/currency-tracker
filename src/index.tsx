import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { persistor, store } from '@store/store';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './utils/routesConfig';

const root = document.getElementById('root');

if (!root) throw new Error('root not found');

const container = createRoot(root);

container.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ErrorBoundary>,
);

