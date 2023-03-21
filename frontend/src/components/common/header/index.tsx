import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillMessage } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { SelectItemData, SelectionField } from '../form-controls/selection-fields';

const localData = [
  { label: 'English', value: 'en' },
  { label: 'Tiếng Việt', value: 'vi' },
];

export function Header() {
  const { i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);

  const handleAvatarClick = () => {
    setOpenMenu(true);
  };

  const handleAvatarBlur = () => {
    setOpenMenu(false);
  };

  const handleSelectChange = (value: SelectItemData) => {
    i18n.changeLanguage(value?.value);
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow shadow-gray-300">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-14 items-center justify-between">
            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
              <a href="#" className="flex flex-shrink-0 items-center text-primary font-bold text-2xl no-underline">
                LTT Social
              </a>
            </div>

            <div className="flex items-center justify-center w-4/12 bg-gray-100 px-3 rounded-full">
              <BiSearch style={{ marginRight: '12px', fontSize: '1.25rem' }} />
              <input placeholder="search LTT-Social" className="h-10 w-full outline-none bg-gray-100 text-base" />
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <SelectionField data={localData} onChange={handleSelectChange} className="mr-4 ml-auto" />
              <button type="button" className="rounded-full mr-3 p-2.5 bg-slate-200 hover:bg-slate-300">
                <AiFillMessage style={{ fontSize: '1.25rem' }} />
              </button>

              <button type="button" className="rounded-full bg-slate-200 p-2.5 hover:bg-slate-300 ">
                <IoMdNotifications style={{ fontSize: '1.25rem' }} />
              </button>

              <div className="relative ml-3">
                <div>
                  <button
                    className="flex rounded-full bg-slate-200 text-sm"
                    onClick={handleAvatarClick}
                    onBlur={handleAvatarBlur}
                  >
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
                {openMenu && (
                  <>
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        <a href="#" className={'block px-4 py-2 text-sm text-gray-700'}>
                          Your Profile
                        </a>
                      </div>
                      <div>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                          Settings
                        </a>
                      </div>
                      <div>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                          Sign out
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
