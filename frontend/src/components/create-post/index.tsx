import { UserData } from '@/models';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiVideoCamera } from 'react-icons/hi';
import { MdPhotoLibrary, MdTagFaces } from 'react-icons/md';
import { Avatar } from '../avatar';
import { CreatePostDialog } from '../dialogs/create-post-dialog';

export interface CreatePostProps {
  user: UserData;
  userProfileLink?: string;
  className?: string;
}

export function CreatePost({ user, userProfileLink, className }: CreatePostProps) {
  const { t } = useTranslation();
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);

  const handleCreatePostClick = () => {
    setShowCreatePostDialog(!showCreatePostDialog);
  };

  const handleClosePostClick = () => {
    setShowCreatePostDialog(false);
  };

  return (
    <>
      <div className={`max-w-2xl mx-auto mt-4 rounded-lg bg-white shadow pt-3 px-4 ${className}`}>
        <div className="flex justify-start items-center">
          <Avatar src={user?.profilePicture ?? ''} alt="user-profile" link={userProfileLink} status={user?.status} />

          <button
            onClick={handleCreatePostClick}
            className="w-full py-2 px-3 rounded-full ml-2 bg-gray-100 outline-none text-gray-400 hover:bg-gray-200 transition-colors text-left"
          >
            {t('createPost.placeholder')} {user.username} ?
          </button>
        </div>

        <div className="border-t border-gray-300 mt-3"></div>

        <div className="flex items-center justify-around py-4">
          <button className="flex justify-center items-center">
            <HiVideoCamera className="text-rose-500 text-2xl" />
            <span className="text-sm font-medium text-gray-500 ml-1.5">Live video</span>
          </button>
          <button className="flex justify-center items-center">
            <MdPhotoLibrary className="text-green-500 text-2xl" />
            <span className="text-sm font-medium text-gray-500 ml-1.5">Photo/video</span>
          </button>
          <button className="flex justify-center items-center">
            <MdTagFaces className="text-amber-400 text-2xl" />
            <span className="text-sm font-medium text-gray-500 ml-1.5">Feeling/activity</span>
          </button>
        </div>
      </div>

      {showCreatePostDialog && (
        <CreatePostDialog
          isOpen={showCreatePostDialog}
          onClose={handleClosePostClick}
          user={user}
          userProfileLink={userProfileLink}
        />
      )}
    </>
  );
}
