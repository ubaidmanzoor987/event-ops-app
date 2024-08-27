import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeletons: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-12 xl:gap-16 xl:w-3/5 ">
      {/* Skeletons for Loading State */}
      {/* Title */}
      <Skeleton className="w-2/5 h-[30px] my-4" />
      <Skeleton className="w-full h-[40px]" />

      {/* Event Name */}
      <Skeleton className="w-full h-[72px]" />

      {/* Date & Time */}
      <Skeleton className="w-full h-[120px]" />

      {/* Event Description */}
      <Skeleton className="w-full h-[120px]" />

      {/* Event Video Link */}
      <Skeleton className="w-full h-[72px]" />

      {/* Banner Image */}
      <Skeleton className="w-full h-[152px]" />

      {/* Button Handlers */}
      <Skeleton className="w-2/5 h-[40px]" />
    </div>
  );
};

export default LoadingSkeletons;
