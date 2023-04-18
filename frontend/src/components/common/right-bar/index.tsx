import { userApi } from '@/api/user';
import { useAuthContext } from '@/context';
import { useQuery } from '@tanstack/react-query';
import { BirthdayInfo } from '../../birthday-info';
import { ContactList } from '../../contact';
import { SponsoredBox } from '../../sponsored-box';

export interface RightBarProps {}

export function RightBar(props: RightBarProps) {
  const { user } = useAuthContext();
  const { data: userFriendList } = useQuery({
    queryKey: ['getUserFriendList', user?._id],
    queryFn: async () => await userApi.getUserFriendList(user?._id!),
  });

  return (
    <>
      <div className="fixed right-0 w-[360px] pt-7 divide-y pr-4">
        <SponsoredBox />
        <BirthdayInfo content="Jessica and 2 others have birthday today." />
        {userFriendList?.data?.friends && <ContactList users={userFriendList?.data?.friends} />}
      </div>
      <div className="w-[360px]"></div>
    </>
  );
}
