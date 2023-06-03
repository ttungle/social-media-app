import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

export interface SelectItemData {
  label: string;
  value: string;
}

export interface SelectionFieldProps {
  form?: FieldValues;
  name?: string;
  data: Array<SelectItemData>;
  className?: string;
  onChange?: (values: SelectItemData) => void;
}

export function SelectionField(props: SelectionFieldProps) {
  const { form, name, data, className, onChange } = props;
  const [selected, setSelected] = useState(() => data[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (form?.getValues(name)) {
      setSelected(data.filter((item) => item.value === form.getValues(name))[0]);
    }
  }, [data, form]);

  const handleDropdownClick = () => {
    setOpen(!open);
  };

  const handleItemClick = (item: SelectItemData) => {
    setSelected(item);
    setOpen(false);

    if (form) form?.setValue(name, item.value);

    if (!onChange) return;
    onChange(item);
  };

  return (
    <>
      <div className={`relative inline-block text-left ${className}`}>
        <div>
          <button
            type="button"
            onClick={handleDropdownClick}
            className={`inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${className}`}
          >
            {selected.label}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {open && (
          <div
            className={`absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full`}
          >
            <div className="py-1" role="none">
              {data.map((item, index) => (
                <span
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="text-gray-700 block px-4 py-2 min-h-[36px] text-sm cursor-pointer hover:bg-gray-100"
                >
                  {item?.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
