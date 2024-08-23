'use client';

import React from 'react';

import timezones from '@/lib/timezones.json';
import { ITimezone } from '@/lib/types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { GlobeIcon } from '@/assets/svgs';

interface TimezoneSelectProps {
  onTimezoneChange: (timezone: string) => void;
  initialTimezone?: string | undefined;
}

const TimezoneSelect: React.FC<TimezoneSelectProps> = ({
  onTimezoneChange,
  initialTimezone,
}) => {
  const [selectedTimezone, setSelectedTimezone] = React.useState<
    string | undefined
  >(initialTimezone);

  React.useEffect(() => {
    setSelectedTimezone(initialTimezone);
  }, [initialTimezone]);

  const handleChange = (timezone: string) => {
    setSelectedTimezone(timezone);
    onTimezoneChange(timezone);
  };

  return (
    <Select onValueChange={handleChange} value={selectedTimezone}>
      <SelectTrigger
        iconColor="fill-border stroke-border ml-3"
        className="bg-accent"
      >
        <div className="flex flex-row gap-x-2">
          <GlobeIcon className='h-6 w-6' />
          <SelectValue placeholder="Select Timezone" />
        </div>
      </SelectTrigger>
      <SelectContent className="overflow-y-auto h-[400px]">
        {timezones.map((timezone: ITimezone) => (
          <SelectItem key={timezone.value} value={timezone.value}>
            <span>{timezone.text}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimezoneSelect;
