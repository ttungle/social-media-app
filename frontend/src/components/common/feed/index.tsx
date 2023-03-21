import { AvatarWithText } from '../avatar-with-text';
import { GrClose } from 'react-icons/gr';
import { IconButton } from '../buttons/icon-button';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { TbShare3 } from 'react-icons/tb';
import { PostData, UserData } from '@/models';
import { ImageGallery } from '../image-gallery';

export interface FeedProps {
  user: UserData;
  post: PostData;
}

export function Feed(props: FeedProps) {
  const { user, post } = props;

  const handleLikeClick = () => {};
  const handleCommentClick = () => {};
  const handleShareClick = () => {};

  return (
    <div className="max-w-2xl mx-auto mt-4 rounded-lg bg-white shadow">
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
          <span className="text-sm ml-2 text-gray-500">82K</span>
        </div>
        <div>
          <span className="text-sm text-gray-500 mr-4">1.9K comments</span>
          <span className="text-sm text-gray-500">430 shares</span>
        </div>
      </div>

      <div className="border-t border-gray-300 mx-4"></div>

      <div className="flex justify-around items-center py-2 mx-10">
        <button onClick={handleLikeClick} className="flex justify-center items-center">
          <AiOutlineLike className="text-gray-500 text-2xl" />
          <span className="text-sm font-medium text-gray-500 ml-1.5">Like</span>
        </button>

        <button onClick={handleCommentClick} className="flex justify-center items-center">
          <BiMessage className="text-gray-500 text-2xl" />
          <span className="text-sm font-medium text-gray-500 ml-1.5">Comments</span>
        </button>

        <button onClick={handleShareClick} className="flex justify-center items-center">
          <TbShare3 className="text-gray-500 text-2xl" />
          <span className="text-sm font-medium text-gray-500 ml-1.5">Shares</span>
        </button>
      </div>
    </div>
  );
}
