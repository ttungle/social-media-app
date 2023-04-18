import { useAuthContext } from '@/context';
import { PostData } from '@/models';
import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BiDotsVerticalRounded, BiMessage } from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { TbShare3 } from 'react-icons/tb';
import { AvatarWithText } from '../../avatar-with-text';
import { ImageGallery } from '../../image-gallery';
import { IconButton } from '../buttons/icon-button';
import { PopperWrapper } from '../popper-wrapper';
import { CreatePostDialog } from '@/components/dialogs/create-post-dialog';
import { FieldValues } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@/api/post';

export interface FeedProps {
  post: PostData;
  className?: string;
  onDelete?: (postId: string) => void;
  refetchFn?: () => void;
}

export function Feed(props: FeedProps) {
  const { post, className, onDelete, refetchFn } = props;
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [openMenu, setOpenMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(() => post.likes.includes(user?._id!));
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const refElement = useRef<any>(null);

  const { mutate } = useMutation({
    mutationKey: ['updatePost'],
    mutationFn: async ({ postId, payload }: any) => await postApi.updatePost(postId, payload),
    onSuccess: () => {
      if (refetchFn) refetchFn();
      setShowCreatePostDialog(false);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const { mutate: toggleLike } = useMutation({
    mutationKey: ['toggleLikePost'],
    mutationFn: async (postId: string) => await postApi.likePost(postId),
  });

  const numberOfLikes = useMemo(
    () => (Array.isArray(post.likes) ? post.likes.filter((item) => item !== user?._id).length : null),
    [post]
  );
  const numberOfComments = useMemo(() => (Array.isArray(post.comments) ? post.comments.length : null), [post]);
  const numberOfShares = useMemo(() => (Array.isArray(post.shares) ? post.shares.length : null), [post]);

  const handleOpenMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    toggleLike(post._id);
  };

  const handleDeleteClick = () => {
    if (!onDelete) return;
    onDelete(`${post._id}`);
  };

  const handleEditClick = () => {
    setShowCreatePostDialog(!showCreatePostDialog);
  };

  const handleClosePostClick = () => {
    setShowCreatePostDialog(false);
  };

  const handlePostSubmit = (values: FieldValues) => {
    const { images, ...restValue } = values;
    const formData = new FormData();

    if (Boolean(images)) {
      images?.forEach((image: File) => formData.append('images', image, `${image.name}`));
    }

    if (user?._id) formData.append('userId', user._id);

    for (const [key, value] of Object.entries(restValue)) {
      formData.append(key, value as any);
    }

    mutate({ postId: post._id, payload: formData });
  };

  const handleCommentClick = () => {};
  const handleShareClick = () => {};

  return (
    <>
      <div className={`max-w-2xl mx-auto mt-4 rounded-lg bg-white shadow ${className}`}>
        <div className="flex items-center justify-between px-4 pt-3">
          <AvatarWithText src={user?.profilePicture ?? ''} name={user?.username ?? ''} time="2d" privacy="public" />
          <div ref={refElement}>
            <IconButton onClick={handleOpenMenuClick} className="p-2.5 text-gray-900 rounded-full">
              <BiDotsVerticalRounded className="text-lg" />
            </IconButton>
            <IconButton onClick={handleDeleteClick} className="p-2.5 text-gray-900 rounded-full">
              <GrClose className="text-lg" />
            </IconButton>
          </div>
        </div>

        <div className="text-sm p-4">{post?.description}</div>

        <ImageGallery images={post?.images} />

        <div className="flex justify-between items-center py-3 px-4">
          <div>
            <button className="p-1 bg-gradient-to-t from-blue-700 to-sky-400 rounded-full">
              <AiFillLike className="text-white text-xs" />
            </button>
            <span className="text-sm ml-2 text-gray-500">
              {isLiked &&
                numberOfLikes !== null &&
                numberOfLikes > 0 &&
                `${t('feed.likedInfo')} ${numberOfLikes} ${t('feed.likedOthers')}`}

              {isLiked && numberOfLikes === 0 && `${t('feed.likedYou')}`}
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
            <span
              className={clsx('text-sm font-medium ml-1.5', { 'text-primary': isLiked, 'text-gray-500': !isLiked })}
            >
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

      {openMenu && (
        <PopperWrapper refElement={refElement} onClose={() => setOpenMenu(false)}>
          <ul className="py-2">
            <li
              onClick={handleEditClick}
              className="flex justify-start items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              <BsPencil className="text-lg" />
              <p className="ml-2 font-medium">Edit Post</p>
            </li>
          </ul>
        </PopperWrapper>
      )}

      {showCreatePostDialog && (
        <CreatePostDialog
          postData={post}
          isOpen={showCreatePostDialog}
          onClose={handleClosePostClick}
          onSubmit={handlePostSubmit}
          user={user}
        />
      )}
    </>
  );
}
