import { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/cn';

import {
  DashboardIcon,
  CalendarIcon,
  EventIcon,
  OffersIcon,
  SettingsIcon,
  LogoIcon,
} from '@/assets/svgs';
import Image from '@/components/ui/next-image';
import {
  settingsUrl,
  calendarUrl,
  dashboardUrl,
  eventsUrl,
  offersUrl,
} from '@/configs/constants';

interface NavItemProps {
  to: string;
  label: string;
  Symbol: React.ElementType;
  currentPath: string;
  onClick: () => void;
}

const normalizePath = (path: string) => path.replace(/\/+$/, '');

const NavItem = memo(
  ({ to, label, Symbol, currentPath, onClick }: NavItemProps) => {
    const currentPathNormalized = normalizePath(currentPath);
    const toNormalized = normalizePath(to);

    const active = currentPathNormalized.includes(toNormalized);

    return (
      <Link href={to}>
        <div
          className={cn([
            'text-lg text-secondary w-full group hover:bg-primary-hover hover:text-heading cursor-pointer p-3 flex space-x-3 items-center rounded-lg',
            active && 'bg-primary-background text-primary font-extrabold',
          ])}
          onClick={onClick}
        >
          <Symbol
            className={cn([
              'w-5 group-hover:scale-125 transition-transform ',
              active && ' stroke-brand fill-none',
            ])}
          />
          <p className="font-medium text-md">{label}</p>
        </div>
      </Link>
    );
  }
);

const navItems = [
  { to: dashboardUrl, label: 'Dashboard', Symbol: DashboardIcon },
  { to: calendarUrl, label: 'Calendar', Symbol: CalendarIcon },
  { to: eventsUrl, label: 'Events', Symbol: EventIcon },
  { to: offersUrl, label: 'Offers & Deals', Symbol: OffersIcon },
  { to: settingsUrl, label: 'Settings', Symbol: SettingsIcon },
];

NavItem.displayName = 'NavItem';

interface LeftNavbarProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const LeftNavbar = ({ open, setOpen }: LeftNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickSettings = () => {
    router.push(settingsUrl);
  };

  return (
    <div
      className={cn(
        'fixed z-30 h-full bg-background col-span-3 transition-all duration-300 flex-none border-r-2 ',
        open && 'w-full'
      )}
    >
      <div className="h-full w-full overflow-hidden ">
        <div className="flex flex-col justify-between h-full min-w-[15rem] 2xl:min-w-[18rem] ">
          <div className="h-full no-scrollbar px-2 ">
            <div className="flex justify-start items-center pl-4 ">
              <LogoIcon className="w-32 h-20 text-headingColor " />
            </div>
            <div className="h-px w-full mb-4" />
            <div className="flex flex-col pb-3 space-y-2">
              {navItems.map(({ to, label, Symbol }) => (
                <NavItem
                  key={to}
                  to={to}
                  label={label}
                  Symbol={Symbol}
                  currentPath={pathname}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 px-3 ">
            <div className="flex-shrink-0 px-3 ">
              <Link
                href={settingsUrl}
                className="py-5 flex items-center space-x-4 cursor-pointer"
              >
                <SettingsIcon
                  className="w-5 h-5 cursor-point"
                  onClick={handleClickSettings}
                />
                <p className="font-medium text-base text-headingColor">
                  Settings
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
