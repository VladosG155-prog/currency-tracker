import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@root/pages/HomePage';
import { store } from '@store/store';

import { TimeLinePage } from './pages/TimeLinePage';
import App from './App';

const root = document.getElementById('root');

if (!root) throw new Error('root not found');

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      { element: <TimeLinePage />, path: '/timeline' },
    ],
  },
]);

container.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

