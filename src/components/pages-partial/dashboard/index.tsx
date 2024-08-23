'use client';

import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';

import CreateEvent from './create-event';

export default function PartialDashboard() {
  return (
    <AppLayout description="You're looking smarted already">
      <div className="flex flex-col self-stretch w-full gap-y-4 my-8">
        <div className="grid grid-cols-12 w-full gap-4">
          <div className="col-span-12 flex flex-col items-start">
            <p className="font-medium text-2xl text-headingColor">
              Create an Event
            </p>
            <p className="font-medium text-sm text-subheadingColor">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
            </p>
          </div>
          <div className="col-span-12 ">
            <div className="flex w-full flex-col ">
              <CreateEvent />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
