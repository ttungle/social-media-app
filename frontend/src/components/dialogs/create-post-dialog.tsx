import { UserData } from '@/models';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { MdPhotoLibrary, MdTagFaces } from 'react-icons/md';
import { Avatar } from '../avatar';
import { ContainedButton } from '../common/buttons/contained-button';
import { DialogWrapper } from '../common/dialog-wrapper';
import { DialogAction } from '../common/dialog-wrapper/dialog-action';
import { DialogContent } from '../common/dialog-wrapper/dialog-content';
import { UploadImageField } from '../common/form-controls/upload-image-field';

export interface CreatePostDialogProps {
  user: UserData | null;
  userProfileLink?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FieldValues) => void;
}

export function CreatePostDialog(props: CreatePostDialogProps) {
  const { user, userProfileLink, isOpen, onClose, onSubmit } = props;
  const { t } = useTranslation();
  const [showImageField, setShowImageField] = useState(false);
  const [previewImageURLs, setPreviewImageURLs] = useState<string[]>([]);
  const [images, setImages] = useState<Blob[] | null>(null);
  const form = useForm({
    defaultValues: {
      description: '',
    },
  });

  const { register, handleSubmit } = form;

  const handleCloseClick = () => {
    if (!onClose) return;
    onClose();
  };

  const handleSubmitPost = (values: FieldValues) => {
    if (!onSubmit) return;
    onSubmit({ ...values, images });
  };

  const handleAddImageClick = () => {
    setShowImageField(!showImageField);
  };

  const handleFileChange = (files: any) => {
    if (!files) {
      setPreviewImageURLs([]);
      setImages([]);
      setShowImageField(false);
      return;
    }

    const fileURLs = Object.values(files).map((file: any) => URL.createObjectURL(file));
    setPreviewImageURLs(fileURLs);
    setImages(Object.values(files));
  };

  return (
    <>
      {isOpen && (
        <DialogWrapper>
          <DialogContent className="divide-y ">
            <div className="relative px-4 py-4">
              <h3 className="text-center text-xl font-semibold">{t('createPost.dialogTitle')}</h3>
              <button
                onClick={handleCloseClick}
                className="absolute top-1/2 right-0 -translate-y-1/2 mr-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <GrClose className="text-xl " />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-start items-center pl-2">
                <Avatar
                  src={user?.profilePicture ?? ''}
                  alt="user-profile"
                  link={userProfileLink}
                  status={user?.status}
                />
                <span className="ml-3">{user?.username}</span>
              </div>

              <form id="create-post-form" onSubmit={handleSubmit(handleSubmitPost)}>
                <textarea
                  {...register('description')}
                  rows={5}
                  className="mt-6 outline-none resize-none w-full text-2xl"
                ></textarea>

                {showImageField && (
                  <UploadImageField form={form} name="images" onChange={handleFileChange} values={previewImageURLs} />
                )}
              </form>

              <div className="flex justify-between items-center px-4 py-2 border rounded-lg">
                <span className="font-medium">{t('createPost.addToPostDesc')}</span>
                <div className="flex">
                  <button
                    onClick={handleAddImageClick}
                    className="flex justify-center items-center mr-2 p-2 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <MdPhotoLibrary className="text-green-500 text-3xl" />
                  </button>
                  <button className="flex justify-center items-center p-2 rounded-full hover:bg-gray-100 transition-all">
                    <MdTagFaces className="text-amber-400 text-3xl" />
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogAction className="sm:px-4">
            <ContainedButton
              form="create-post-form"
              className="bg-primary text-white hover:opacity-9 p-2 transition-all w-full font-medium"
            >
              {t('button.post')}
            </ContainedButton>
          </DialogAction>
        </DialogWrapper>
      )}
    </>
  );
}
