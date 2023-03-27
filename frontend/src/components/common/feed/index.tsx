import { AvatarWithText } from '../../avatar-with-text';
import { GrClose } from 'react-icons/gr';
import { IconButton } from '../buttons/icon-button';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { TbShare3 } from 'react-icons/tb';
import { PostData, UserData } from '@/models';
import { ImageGallery } from '../../image-gallery';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export interface FeedProps {
  user: UserData;
  post: PostData;
  className?: string;
}

export function Feed(props: FeedProps) {
  const { user, post, className } = props;
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);

  const numberOfLikes = useMemo(() => (Array.isArray(post.likes) ? post.likes.length : null), [post]);
  const numberOfComments = useMemo(() => (Array.isArray(post.comments) ? post.comments.length : null), [post]);
  const numberOfShares = useMemo(() => (Array.isArray(post.shares) ? post.shares.length : null), [post]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {};
  const handleShareClick = () => {};

  return (
    <div className={`max-w-2xl mx-auto mt-4 rounded-lg bg-white shadow ${className}`}>
      <div className="flex items-center justify-between px-4 pt-3">
        <AvatarWithText src={user?.profilePicture ?? ''} name={user?.username ?? ''} time="2d" privacy="public" />
        <IconButton>
          <GrClose className="text-lg" />
        </IconButton>
      </div>

      <div className="text-sm p-4">{post?.description}</div>

      <ImageGallery images={post?.images} />

      <div className="flex justify-between items-center py-3 px-4">
        <div>
          <button className="p-1 bg-gradient-to-t from-blue-700 to-sky-400 rounded-full">
            <AiFillLike className="text-white text-xs" />
          </button>
          <span className="text-sm ml-2 text-gray-500">
            {isLiked ? `${t('feed.likedInfo')} ${numberOfLikes} ${t('feed.likedOthers')}` : numberOfLikes}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500 mr-4">{numberOfComments}</span>
          <span className="text-sm text-gray-500">{numberOfShares}</span>
        </div>
      </div>

      <div className="border-t border-gray-300 mx-4"></div>

      <div className="flex justify-around items-center pb-2 pt-1 mx-3">
        <button
          onClick={handleLikeClick}
          className="flex justify-center items-center px-14 py-1 rounded-md hover:bg-gray-100"
        >
          {!isLiked && <AiOutlineLike className="text-gray-500 text-2xl" />}
          {isLiked && <AiFillLike className="text-primary text-2xl " />}
          <span className={clsx('text-sm font-medium ml-1.5', { 'text-primary': isLiked, 'text-gray-500': !isLiked })}>
            {t('button.like')}
          </span>
        </button>
        <button
          onClick={handleCommentClick}
          className="flex justify-center items-center px-14 py-1 rounded-md hover:bg-gray-100"
        >
          <BiMessage className="text-gray-500 text-2xl" />
          <span className="text-sm font-medium text-gray-500 ml-1.5">{t('button.comment')}</span>
        </button>
        <button
          onClick={handleShareClick}
          className="flex justify-center items-center px-14 py-1 rounded-md hover:bg-gray-100"
        >
          <TbShare3 className="text-gray-500 text-2xl" />
          <span className="text-sm font-medium text-gray-500 ml-1.5">{t('button.share')}</span>
        </button>
      </div>
    </div>
  );
}
