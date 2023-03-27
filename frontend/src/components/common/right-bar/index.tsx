import * as React from 'react';
import { SponsoredBox } from '../../sponsored-box';
import { BirthdayInfo } from '../../birthday-info';
import { ContactList } from '../../contact';
import { UserData } from '@/models';

export interface RightBarProps {}

const users: Array<UserData> = [
  {
    id: '1',
    email: 'thanhtungle@gmail.com',
    username: 'Tung Le 1',
    profilePicture: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
    status: 'active',
  },
  {
    id: '1',
    email: 'thanhtungle@gmail.com',
    username: 'Tung Le 2',
    profilePicture: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
    status: 'inactive',
  },
  {
    id: '1',
    email: 'thanhtungle@gmail.com',
    username: 'Tung Le 3',
    profilePicture: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
    status: 'active',
  },
];

export function RightBar(props: RightBarProps) {
  return (
    <>
      <div className="fixed right-0 w-[360px] pt-7 divide-y pr-4">
        <SponsoredBox />
        <BirthdayInfo content="Jessica and 2 others have birthday today." />
        <ContactList users={users} />
      </div>
      <div className="w-[360px]"></div>
    </>
  );
}
