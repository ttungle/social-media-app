import { BASE_ROUTEs } from '@/constants/base-routes';
import { useAuthContext } from '@/context';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../common/header';
import { RightBar } from '../common/right-bar';
import { SideBar } from '../common/sidebar';

export interface MainLayoutProps {
  children: React.ReactNode;
  showMiniBar?: boolean;
}

export function MainLayout({ children, showMiniBar = false }: MainLayoutProps) {
  const { user, isFirstLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirstLoading && !user?.email) {
      navigate(BASE_ROUTEs.login);
    }
  }, [user, isFirstLoading, window.location.href]);

  return (
    <>
      {user?.email && (
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex grow mt-14 bg-gray-100">
            <SideBar
              user={user}
              showMiniBar={showMiniBar}
              groupData={[
                {
                  name: 'Test Group',
                  avatar: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
                },
              ]}
            />
            <section className="flex-1">{children}</section>
            <RightBar />
          </main>
        </div>
      )}

      {!user?.email && <div>Please authenticate to access</div>}
    </>
  );
}
