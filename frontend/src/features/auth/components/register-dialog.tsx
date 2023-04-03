import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { DialogAction } from '@/components/common/dialog-wrapper/dialog-action';
import { DialogContent } from '@/components/common/dialog-wrapper/dialog-content';
import { OutlinedInput } from '@/components/common/form-controls/input-fields/outlined-input';
import { PasswordField } from '@/components/common/form-controls/password-field';
import { useAuthContext } from '@/context';
import { RegisterPayloadData } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import * as yup from 'yup';

export interface RegisterDialogProps {
  setShowDialog: (value: boolean) => void;
}

export function RegisterDialog({ setShowDialog }: RegisterDialogProps) {
  const { register } = useAuthContext();

  const schema = yup.object({
    username: yup.string().required('Please enter your user name.'),
    email: yup.string().email('Please enter your email.').required('Please enter your valid email.'),
  });

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const handleFormSubmit = (values: FieldValues) => {
    register(values as RegisterPayloadData);
  };

  const handleCloseDialog = () => {
    if (!setShowDialog) return;

    setShowDialog(false);
  };

  return (
    <DialogWrapper>
      <DialogContent className="pb-4 pt-5 sm:pb-4">
        <div className="flex justify-between items-start pb-4 px-4 border-b">
          <div>
            <h3 className="text-3xl font-bold leading-6 text-gray-900 text-left">Sign Up</h3>
            <p className="mt-2 text-gray-800">It's quick and easy.</p>
          </div>
          <button onClick={handleCloseDialog} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <GrClose className="text-xl " />
          </button>
        </div>
        <form id="register-form" className="mt-5 px-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <OutlinedInput form={form} name="username" placeholder="User name" className="bg-gray-100" />
          <OutlinedInput form={form} name="email" placeholder="Email" className="mt-3 bg-gray-100" />
          <PasswordField form={form} name="password" placeholder="Password" className="mt-3 bg-gray-100" />
          <PasswordField
            form={form}
            name="passwordConfirm"
            placeholder="Password Confirm"
            className="mt-3 bg-gray-100"
          />
        </form>
      </DialogContent>
      <DialogAction align="center">
        <button
          type="submit"
          form="register-form"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-16 py-2 text-lg font-bold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
        >
          Sign Up
        </button>
      </DialogAction>
    </DialogWrapper>
  );
}
