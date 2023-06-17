import * as React from 'react';
import { FieldValues } from 'react-hook-form';

export interface OutlinedInputProps {
  form: FieldValues;
  placeholder?: string;
  className?: string;
  name: string;
  type?: string;
}

export function OutlinedInput(props: OutlinedInputProps) {
  const { type, placeholder, className, form, name } = props;
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <>
      <input
        type={type}
        className={`p-3.5 w-full border rounded-lg outline-none ${className} ${
          errors[name]?.message && 'border-rose-500'
        }`}
        placeholder={placeholder}
        {...register(name)}
      />
      {Boolean(errors[name]?.message) && <span className="text-sm text-rose-500">{errors[name]?.message}</span>}
    </>
  );
}
