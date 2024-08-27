import React, { Suspense } from 'react';
import DashboardScreen from '@/components/pages-partial/dashboard';
import LoadingSkeletons from './loading';

const Page = () => {
  return (
    <Suspense fallback={<LoadingSkeletons />}>
      <DashboardScreen />
    </Suspense>
  );
};

export default Page;
