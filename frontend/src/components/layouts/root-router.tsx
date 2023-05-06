import { BASE_ROUTEs } from '@/constants/base-routes';
import { HomePage } from '@/features/home';
import { MyProfilePage } from '@/features/profile/pages/my-profile';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './main-layout';
import { LoginPage } from '@/features/auth/login';
import FriendProfilePage from '@/features/profile/pages/friend-profile';
import FriendPage from '@/features/friend';

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
    path: `${BASE_ROUTEs.friends}`,
    element: (
      <MainLayout showMiniBar={true}>
        <FriendPage />
      </MainLayout>
    ),
  },
  {
    path: `${BASE_ROUTEs.profile}/:id`,
    element: (
      <MainLayout showMiniBar={true}>
        <MyProfilePage />
      </MainLayout>
    ),
  },
  {
    path: `${BASE_ROUTEs.friends}/:id`,
    element: (
      <MainLayout showMiniBar={true}>
        <FriendProfilePage />
      </MainLayout>
    ),
  },
  {
    path: `${BASE_ROUTEs.login}`,
    element: <LoginPage />,
  },
]);
