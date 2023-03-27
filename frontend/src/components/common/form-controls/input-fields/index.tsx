import * as React from 'react';

export interface InputFieldProps {
  placeholder?: string;
  type?: string;
}

export function InputField(props: InputFieldProps) {
  const { placeholder, type } = props;
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        className="w-full py-2 px-3 rounded-full ml-2 bg-gray-100 outline-none"
      />
    </>
  );
}
