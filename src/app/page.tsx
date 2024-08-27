import React, { Suspense } from 'react';
import DashboardScreen from '@/components/pages-partial/dashboard';
import LoadingSkeletons from './loading';
import Navbar from '@/components/navbar/Navbar';

const Page = () => {
  return (
    <Navbar>
      <Suspense fallback={<LoadingSkeletons />}>
        <DashboardScreen />
      </Suspense>
    </Navbar>
  );
};

export default Page;
