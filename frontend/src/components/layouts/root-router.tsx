import { BASE_ROUTEs } from '@/constants/base-routes';
import { HomePage } from '@/features/home';
import { ProfilePage } from '@/features/profile';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './main-layout';

export const rootRouter = createBrowserRouter([
  {
    path: BASE_ROUTEs.home,
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: `${BASE_ROUTEs.profile}/:id`,
    element: (
      <MainLayout showMiniBar={true}>
        <ProfilePage />
      </MainLayout>
    ),
  },
]);
