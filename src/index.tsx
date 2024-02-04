import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@store/store';

import { router } from './utils/routesConfig';

const root = document.getElementById('root');

if (!root) throw new Error('root not found');

const container = createRoot(root);

container.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
console.log(window);

