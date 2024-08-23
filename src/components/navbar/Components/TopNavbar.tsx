import React from 'react';

import UserImage from '@/assets/png/Avatar (1).png';
import { NotificationIcon, SearchIcon, SearchRightIcon } from '@/assets/svgs';
import { getAuthDataSelector } from '@/store/features/auth/authSelector';
import { useAppSelector } from '@/store/hooks';
import NextImage from '@/components/ui/next-image';
import { ILayoutProps } from '@/lib/types';
import { IconInput } from '@/components/ui/icon-input';

interface ITopNavbar extends ILayoutProps {}

const TopNavbar = ({}: ITopNavbar) => {
  // redux
  const { user } = useAppSelector(getAuthDataSelector);

  return (
    <div className="mx-2 min-h-[70px] flex w-full items-center justify-between">
      <div className="flex flex-row gap-x-2 items-center">
        <div className="flex flex-row gap-x-1 w-full">
          <div className="flex flex-col justify-center">
            <IconInput
              icon={SearchIcon}
              placeholder="Search ShowOps"
              rightIcon={SearchRightIcon}
              showRightIcon
              rightIconClassName="w-8 h-8"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-4 items-center justify-center  ">
        <NotificationIcon className="w-10 h-10  cursor-pointer" />
        <div className="py-4 flex flex-row justify-center items-center">
          <NextImage
            className="w-10 h-10 rounded-full"
            src={UserImage}
            alt="User Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
