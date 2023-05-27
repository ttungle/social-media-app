import { ContainedButton } from '@/components/common/buttons/contained-button';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { DialogAction } from '@/components/common/dialog-wrapper/dialog-action';
import { DialogContent } from '@/components/common/dialog-wrapper/dialog-content';
import { OutlinedInput } from '@/components/common/form-controls/input-fields/outlined-input';
import { UserData } from '@/models';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';

export interface EditProfileDialogProps {
  userData: UserData | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FieldValues) => void;
}

export function EditProfileDialog(props: EditProfileDialogProps) {
  const { t } = useTranslation('profile');
  const { userData, isOpen, onClose, onSubmit } = props;
  const [uploadedFiles, setUploadedFiles] = useState(() => ({ profile: '', cover: '' }));
  const [avatarUrl, setAvatarUrl] = useState(() => '');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(() => '');
  const form = useForm({
    defaultValues: {
      bio: '',
      work: '',
      currentCity: '',
      hometown: '',
    },
  });

  const { handleSubmit } = form;

  const handleCloseClick = () => {
    if (!onClose) return;
    onClose();
  };

  const handleProfileSubmit = (values: FieldValues) => {
    if (!onSubmit) return;
    const formData = new FormData();

    if (Boolean(uploadedFiles.profile)) formData.append('profile', uploadedFiles.profile);
    if (Boolean(uploadedFiles.cover)) formData.append('cover', uploadedFiles.cover);

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    onSubmit(formData);
  };

  const handleProfilePictureChange = (file: any) => {
    setUploadedFiles({ ...uploadedFiles, profile: file.target.files[0] });
    setAvatarUrl(URL.createObjectURL(file.target.files[0]));
  };

  const handleCoverPhotoChange = (file: any) => {
    setUploadedFiles({ ...uploadedFiles, cover: file.target.files[0] });
    setCoverPhotoUrl(URL.createObjectURL(file.target.files[0]));
  };

  return (
    <>
      {isOpen && (
        <DialogWrapper>
          <DialogContent className="divide-y ">
            <div className="relative px-4 py-4">
              <h3 className="text-center text-xl font-semibold">{t('profile:editProfileDialog.title')}</h3>
              <button
                onClick={handleCloseClick}
                className="absolute top-1/2 right-0 -translate-y-1/2 mr-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <GrClose className="text-xl " />
              </button>
            </div>
            <form id="edit-profile-form" className="p-4" onSubmit={handleSubmit(handleProfileSubmit)}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold my-1">{t('editProfileDialog.profilePicture')}</h3>
                <label
                  htmlFor="edit-profile-picture"
                  className="px-4 py-1 rounded-md text-blue-500 cursor-pointer hover:bg-gray-100"
                >
                  {t('common:button.add')}
                  <input
                    id="edit-profile-picture"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleProfilePictureChange}
                  />
                </label>
              </div>
              {avatarUrl && <img alt="cover-profile-preview" src={avatarUrl} className="max-h-64 m-auto" />}
              {!avatarUrl && <div className="h-32 w-32 m-auto bg-gray-200 rounded-full" />}

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold my-1">{t('editProfileDialog.coverPhoto')}</h3>
                <label
                  htmlFor="edit-profile-cover-photo"
                  className="px-4 py-1 rounded-md text-blue-500 cursor-pointer hover:bg-gray-100"
                >
                  {t('common:button.add')}
                  <input
                    id="edit-profile-cover-photo"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleCoverPhotoChange}
                  />
                </label>
              </div>
              {coverPhotoUrl && <img alt="cover-photo-preview" src={coverPhotoUrl} className="max-h-64 m-auto" />}
              {!coverPhotoUrl && <div className="h-48 w-4/5 m-auto bg-gray-200 rounded-lg" />}

              <h3 className="text-lg font-semibold my-1">{t('editProfileDialog.bio')}</h3>
              <OutlinedInput form={form} name="bio" placeholder="Describe who you are" />

              <h3 className="text-lg font-semibold mt-6">{t('editProfileDialog.profileHeading')}</h3>
              <p className="text-sm">{t('editProfileDialog.profileDescription')}</p>
              <h4 className="text-base font-medium mt-4 mb-1">{t('editProfileDialog.work')}</h4>
              <OutlinedInput form={form} name="work" placeholder="Add a workplace" />
              <h4 className="text-base font-medium mt-4 mb-1">{t('editProfileDialog.currentCity')}</h4>
              <OutlinedInput form={form} name="currentCity" placeholder="Current city" />
              <h4 className="text-base font-medium mt-4 mb-1">{t('editProfileDialog.homeTown')}</h4>
              <OutlinedInput form={form} name="hometown" placeholder="Add home town" />
            </form>
          </DialogContent>
          <DialogAction className="sm:px-4">
            <ContainedButton
              onClick={handleCloseClick}
              className="bg-gray-300 text-gray-800 hover:opacity-9 p-2 transition-all font-medium mr-2"
            >
              {t('common:button.cancel')}
            </ContainedButton>
            <ContainedButton
              form="edit-profile-form"
              className="bg-primary text-white hover:opacity-9 p-2 transition-all font-medium"
            >
              {t('common:button.save')}
            </ContainedButton>
          </DialogAction>
        </DialogWrapper>
      )}
    </>
  );
}
