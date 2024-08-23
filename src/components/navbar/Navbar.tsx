import React, { useState } from 'react';

import { cn } from '@/lib/cn';
import { ILayoutProps } from '@/lib/types';

import LeftNavbar from './Components/LeftNavbar';
import TopNavbar from './Components/TopNavbar';

interface INavbar extends ILayoutProps {}

function Navbar({ children, ...props }: INavbar) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full relative bg-background">
      <LeftNavbar open={open} setOpen={setOpen} />
      <div className=" flex flex-col w-full pl-[280px] 2xl:pl-[340px] pr-6">
        <TopNavbar {...props} />
        <div className="h-px w-full " />
        <div className={cn('flex flex-col h-full mt-4 ml-3 ')}>{children}</div>
      </div>
    </div>
  );
}

export default Navbar;
