import * as React from 'react';
import { Header } from '../common/header';
import { SideBar } from '../common/sidebar';
import { RightBar } from '../common/right-bar';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex grow">
        <SideBar
          showMiniBar={false}
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
