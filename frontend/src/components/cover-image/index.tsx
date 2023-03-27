import { FiPlus } from 'react-icons/fi';
import { HiPencil } from 'react-icons/hi';
import { HiCamera } from 'react-icons/hi2';
import { ProfileAvatar } from '../avatar/profile-avatar';
import { ContainedButton } from '../common/buttons/contained-button';

export interface CoverImageProps {
  className?: string;
}

export function CoverImage({ className = '' }: CoverImageProps) {
  return (
    <div className="mx-auto container">
      <div className={`relative ${className}`}>
        <img src="https://wallpaper.dog/large/20503610.jpg" className="h-[463px] w-full rounded-b-lg object-cover" />
        <div className="absolute top-3/4 left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-black via-transparent rounded-b-lg opacity-70" />
        <ContainedButton className="absolute right-9 bottom-4 z-10 bg-white">
          <HiCamera className="text-2xl text-gray-800" />
          <span className="font-medium text-sm ml-1 text-gray-800">Add cover photo</span>
        </ContainedButton>

        <div className="flex justify-between items-end absolute left-0 -bottom-32 right-0 z-10 px-9">
          <div className="flex justify-center items-center">
            <ProfileAvatar
              src="https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg"
              className="w-40 h-40"
            />
            <span className="text-3xl font-semibold text-gray-800 ml-4">Tung Le</span>
          </div>

          <div className="flex justify-center items-center mb-4">
            <ContainedButton className="bg-primary">
              <FiPlus className="text-lg text-white" />
              <span className="font-medium text-sm ml-1 text-white">Add story</span>
            </ContainedButton>

            <ContainedButton className="bg-gray-300 ml-2">
              <HiPencil className="text-lg" />
              <span className="font-medium text-sm ml-1 text-gray-800">Edit profile</span>
            </ContainedButton>
          </div>
        </div>
      </div>
      <div className="bg-white h-36 w-full"></div>
      <div className="border-t border-gray-300"></div>
      <div className="bg-white h-12 w-full rounded-b-lg shadow"></div>
    </div>
  );
}
