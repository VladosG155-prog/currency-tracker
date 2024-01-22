import HomePage from '@root/pages/HomePage';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    ],
  },
]);

container.render(<RouterProvider router={router} />);
