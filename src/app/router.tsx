import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '@/shared/ui/layouts';
import { PrivateRoutes } from '@/shared/lib';
import { RoomPage } from '@/pages/room';
import { HomePage } from '@/pages/home';

export const router = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      element: <PrivateRoutes />,
      path: '/root',
      children: [
        {
          element: <BaseLayout />,
          children: [
            {
              element: <RoomPage />,
              path: 'rooms',
            },
          ],
        },
      ],
    },
  ]);
};
