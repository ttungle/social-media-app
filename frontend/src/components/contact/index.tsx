import { UserFriendListData } from '@/models';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AvatarWithText } from '../avatar-with-text';
import { BASE_ROUTEs } from '@/constants/base-routes';

export interface ContactListProps {
  users: Array<UserFriendListData>;
}

export function ContactList({ users }: ContactListProps) {
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 font-semibold">Contacts</p>
        <BiDotsVerticalRounded className="text-gray-500 font-semibold text-xl" />
      </div>
      <div>
        {users.map((user, index) => (
          <AvatarWithText
            key={index}
            name={user?.username}
            src={user?.profilePicture ?? ''}
            status={user?.status}
            link={`${BASE_ROUTEs.friends}/${user?.id}`}
            className="my-3"
          />
        ))}
      </div>
    </div>
  );
}
