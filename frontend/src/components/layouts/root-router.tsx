import { HomePage } from '@/features/home';
import { MainLayout } from './main-layout';
import { createBrowserRouter } from 'react-router-dom';
import { BASE_ROUTEs } from '@/constants/base-routes';

export const rootRouter = createBrowserRouter([
  {
    path: BASE_ROUTEs.home,
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
]);
