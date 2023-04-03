import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';

export interface PasswordFieldProps {
  form: FieldValues;
  placeholder?: string;
  className?: string;
  name: string;
}

export function PasswordField(props: PasswordFieldProps) {
  const { placeholder, className, form, name } = props;
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <input
        type="password"
        className={`p-3.5 w-full border rounded-lg outline-none ${className}`}
        placeholder={placeholder}
        {...register(name)}
      />
      {Boolean(errors[name]?.message) && <span className="text-sm text-rose-500">{errors[name]?.message}</span>}
    </>
  );
}
