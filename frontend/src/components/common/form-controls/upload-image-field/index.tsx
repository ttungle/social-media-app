import * as React from 'react';
import { FieldValues } from 'react-hook-form';
import { MdClose, MdPhoneIphone } from 'react-icons/md';
import { IconButton } from '../../buttons/icon-button';
import { GrClose } from 'react-icons/gr';

export interface UploadImageFieldProps {
  form: FieldValues;
  name: string;
  values: string[];
  onChange: (files: any) => void;
}

export function UploadImageField(props: UploadImageFieldProps) {
  const { form, name, values, onChange } = props;
  const { register } = form;

  const handleFileChange = (event: any) => {
    if (!onChange || !event.target.files) return;

    onChange(event.target.files);
  };

  const handleRemoveClick = () => {
    onChange(null);
  };

  return (
    <div className="w-full mb-4 border rounded-lg p-1 border-gray-300">
      <div className="relative h-64 mb-4 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer rounded-lg overflow-y-scroll">
        <div className="absolute top-0 right-0">
          <IconButton
            onClick={handleRemoveClick}
            className="p-1.5 rounded-full bg-white border border-gray-400 hover:bg-gray-100 transition-all"
          >
            <GrClose className="text-md text-black" />
          </IconButton>
        </div>
        {values.length > 0 && values.map((url, index) => <img key={index} src={url} />)}
      </div>

      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full">
            <MdPhoneIphone className="block text-2xl" />
          </div>
          <p className="text-xs ml-3">Add photos and videos from your device.</p>
        </div>
        <label
          htmlFor="image-upload"
          className="block py-1.5 w-14 rounded-lg bg-gray-300 cursor-pointer text-center hover:bg-gray-400"
        >
          <input id="image-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
          <span className="text-sm font-medium">Add</span>
        </label>
      </div>
    </div>
  );
}
