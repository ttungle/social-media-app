import { ContainedButton } from '@/components/common/buttons/contained-button';
import { InputField } from '@/components/common/form-controls/input-fields';
import { OutlinedInput } from '@/components/common/form-controls/input-fields/outlined-input';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { PasswordField } from '@/components/common/form-controls/password-field';

export interface LoginPageProps {}

const data = [
  'English (UK)',
  'Tiếng Việt',
  '中文(台灣)',
  '한국어',
  '日本語',
  'Français (France)',
  'ภาษาไทย',
  'Español',
  'Português (Brasil)',
  'Deutsch',
  'Italiano',
];

export function LoginPage(props: LoginPageProps) {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const handleFormSubmit = (values: FieldValues) => {
    console.log('values: ', values);
  };

  return (
    <div className="grid grid-rows-5 gap-4 h-screen">
      <div className="row-span-3 bg-gray-100">
        <div className="container h-full max-w-screen-xl grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start justify-center">
            <div className="text-primary text-5xl font-bold">LTT Social</div>
            <div className="mt-4 text-2xl font-medium text-gray-800">
              LTT Social helps you connect and share with the people in your life.
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white w-[400px] p-4 rounded-lg">
              <OutlinedInput type="email" name="email" form={form} placeholder="Email address and or phone number" />
              <PasswordField name="password" form={form} placeholder="Password" className="mt-4" />
              <ContainedButton type="submit" className="bg-primary w-full text-white py-3 mt-4 font-bold text-lg">
                {t('button.login')}
              </ContainedButton>
              <p className="text-sm text-primary text-center my-4 cursor-pointer hover:underline">Forgot password</p>
              <div className="border-t"></div>
              <ContainedButton className="bg-green-500 w-full text-white py-3 mt-4 font-bold text-lg hover:bg-green-600">
                {t('button.createAccount')}
              </ContainedButton>
            </form>
          </div>
        </div>
      </div>
      <div className="container max-w-screen-xl row-span-2 py-6">
        {data.map((item, index) => (
          <a key={index} href="#" className="text-sm mx-1 font-light hover:underline">
            {item}
          </a>
        ))}

        <div className="border-t mt-4"> </div>
      </div>
    </div>
  );
}
