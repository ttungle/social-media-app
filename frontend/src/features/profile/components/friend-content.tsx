import { userApi } from '@/api/user';
import { GoogleMapWrapper } from '@/components/google-map';
import { DEFAULT_GOOGLE_MAP_ZOOM } from '@/constants/common';
import { useAuthContext } from '@/context';
import { UserCardList } from '@/features/friend/components/user-card-list';
import { Circle, Marker } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface FriendContentProps {}

export function FriendContent(props: FriendContentProps) {
  const { t } = useTranslation('profile');
  const { user } = useAuthContext();
  const [distance, setDistance] = useState<number>(100000);
  const [distanceValue, setDistanceValue] = useState(100000);
  const timerRef = useRef<any>(null);
  const [currentLocation, setCurrentLocation] = useState(() =>
    user?.location?.coordinates && user?.location?.coordinates?.length > 0
      ? {
          lat: user?.location?.coordinates[1],
          lng: user?.location?.coordinates[0],
        }
      : undefined
  );

  const { data: friendList } = useQuery({
    queryKey: ['getUserWithin', distance],
    queryFn: async () =>
      await userApi.getUsersWithin({
        distance,
        latlng: `${user?.location?.coordinates[1]},${user?.location?.coordinates[0]}`,
        unit: 'km',
      }),
  });

  const friendListFiltered = useMemo(
    () =>
      Array.isArray(friendList?.data?.data) ? friendList?.data?.data?.filter((x: any) => x._id !== user?._id) : [],
    [friendList]
  );

  const handleInputChange = useCallback((event: any) => {
    setDistanceValue(event.target.value);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDistance(Number(event.target.value));
    }, 600);
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 mt-4 shadow">
      <p className="m-0 text-xl font-semibold">{t('friends.title')}</p>
      <p className="text-slate-400 text-sm mt-2 mb-4">{t('friends.description')}</p>

      <div className="flex items-center justify-start my-4">
        <p className="text-sm font-medium ">{t('stats.overview')}</p>
        <input
          type="text"
          value={distanceValue}
          onChange={handleInputChange}
          className={`px-2 h-9 w-24 ml-4 border rounded-lg outline-none text-sm text-gray-500`}
        />
        <p className="ml-1">m</p>
      </div>

      <GoogleMapWrapper center={currentLocation} zoom={DEFAULT_GOOGLE_MAP_ZOOM} mapContainerClassName="w-full h-[42vh]">
        {currentLocation && <Marker position={currentLocation} />}
        <Circle center={currentLocation} radius={distance} />
      </GoogleMapWrapper>

      {friendListFiltered?.length > 0 && <UserCardList userList={friendListFiltered} className="mt-8" />}

      {(!Array.isArray(friendListFiltered) || friendListFiltered?.length <= 0) && (
        <div className="my-12 text-center">{t('friends.noFriendFoundMsg')}</div>
      )}
    </div>
  );
}
