'use client';

import React from 'react';
import ComingSoon from '@/components/common/ComingSoon';
import AppLayout from '@/components/common/layout/AppLayout';

export default function PartialSettings() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-8">
        <ComingSoon />
      </div>
    </AppLayout>
  );
}
