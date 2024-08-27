'use client';

import React from 'react';
import ComingSoon from '@/components/common/ComingSoon';

export default function PartialEvent() {
  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 my-8">
      <ComingSoon />
    </div>
  );
}
