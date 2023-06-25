import * as React from 'react';
import { UserCard } from './user-card';
import { UserData } from '@/models';

export interface UserCardListProps {
  userList: Array<UserData>;
  className?: string;
}

export function UserCardList({ userList, className }: UserCardListProps) {
  return (
    <div className={`grid grid-cols-7 grid-rows-3 gap-3 ${className}`}>
      {Array.isArray(userList) && userList.map((user) => <UserCard key={user._id} userData={user} />)}
    </div>
  );
}
