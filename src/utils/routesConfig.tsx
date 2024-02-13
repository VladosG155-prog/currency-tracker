import { createBrowserRouter } from 'react-router-dom';
import App from '@root/App';
import FallBack from '@root/components/FallBack';
import { routes } from '@root/constants/routes';
import BankCardPage from '@root/pages/BankCardPage';
import HomePage from '@root/pages/HomePage';
import TimeLinePage from '@root/pages/TimeLinePage';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
    errorElement: <FallBack />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      { element: <TimeLinePage />, path: routes.timeline },
      { element: <BankCardPage />, path: routes.bankcard },
    ],
  },
]);
