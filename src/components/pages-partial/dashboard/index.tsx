import React from 'react';
import CreateEvent from './create-event';
import AppLayout from '@/components/common/layout/AppLayout';

export default function PartialDashboard() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 bg-background max-xl:px-3 overflow-y-auto">
        <div className="grid grid-cols-12 w-full mt-8">
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
