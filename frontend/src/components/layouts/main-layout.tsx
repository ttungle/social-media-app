import * as React from 'react';
import { Header } from '../common/header';
import { SideBar } from '../common/sidebar';
import { RightBar } from '../common/right-bar';
import { UserData } from '@/models';

export interface MainLayoutProps {
  children: React.ReactNode;
  showMiniBar?: boolean;
}

const user: UserData = {
  id: '1',
  email: 'thanhtungle@gmail.com',
  username: 'Fan Page',
  profilePicture: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
};

export function MainLayout({ children, showMiniBar = false }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex grow mt-14 bg-gray-100">
        <SideBar
          user={user}
          showMiniBar={showMiniBar}
          groupData={[
            {
              name: 'Test Group 1',
              avatar: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
            },
          ]}
        />
        <section className="flex-1">{children}</section>
        <RightBar />
      </main>
    </div>
  );
}
