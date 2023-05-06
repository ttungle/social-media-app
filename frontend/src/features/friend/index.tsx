import { userApi } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { UserCardList } from './components/user-card-list';
import { useTranslation } from 'react-i18next';

export interface FriendPageProps {}

export default function FriendPage(props: FriendPageProps) {
  const { t } = useTranslation('friend');

  const { data: suggestionFriends } = useQuery({
    queryKey: ['getSuggestionFriends'],
    queryFn: async () => await userApi.getSuggestionFriends(),
  });

  return (
    <div className="p-8 mt-2">
      <h2 className="font-semibold text-xl mb-3">{t('header')}</h2>

      <UserCardList userList={suggestionFriends?.data?.users ?? []} />
    </div>
  );
}
