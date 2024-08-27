import { LogoIcon } from '@/assets/svgs';

export default function Loading() {
  return (
    <div className="bg-brand-light w-full h-[100vh] flex items-center justify-center ">
      <div className="flex justify-start items-center pl-4 animate-zoom">
        <LogoIcon className="w-32 h-20 text-headingColor " />
      </div>
    </div>
  );
}
