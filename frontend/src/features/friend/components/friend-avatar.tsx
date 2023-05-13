import { BASE_ROUTEs } from '@/constants/base-routes';
import { getMediaUrl } from '@/utils';
import { useNavigate } from 'react-router-dom';

export interface FriendAvatarProps {
  src: string; 
  userId: string;
}

export function FriendAvatar({src, userId}: FriendAvatarProps) {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate(`${BASE_ROUTEs.friends}/${userId}`);
  };

  return (
    <div
      className="w-full cursor-pointer"
      onClick={handleImageClick}
      style={{
        paddingBottom: '100%',
        background: `url("${getMediaUrl(src)}") no-repeat center/cover`,
      }}
    ></div>
  );
}
