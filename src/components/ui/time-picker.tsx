'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

interface TimePickerProps {
  onTimeChange: (time: string) => void;
  initialTime?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange, initialTime }) => {
  const [is24HourFormat, setIs24HourFormat] = React.useState(true);
  const [selectedHour, setSelectedHour] = React.useState<string | undefined>();
  const [selectedMinute, setSelectedMinute] = React.useState<string | undefined>();
  const [selectedPeriod, setSelectedPeriod] = React.useState<string | undefined>(initialTime?.includes('PM') ? 'PM' : 'AM');

  React.useEffect(() => {
    if (initialTime) {
      const [time, period] = initialTime.split(' ');
      const [hour, minute] = time.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedPeriod(period || 'AM');
    }
  }, [initialTime]);

  const handleTimeChange = () => {
    let formattedTime = `${selectedHour || '00'}:${selectedMinute || '00'}`;
    if (!is24HourFormat && selectedPeriod) {
      formattedTime += ` ${selectedPeriod}`;
    }
    onTimeChange(formattedTime);
  };

  const generateHourOptions = () => {
    const hours = [];
    if (is24HourFormat) {
      for (let hour = 0; hour < 24; hour++) {
        hours.push(hour.toString().padStart(2, '0'));
      }
    } else {
      for (let hour = 1; hour <= 12; hour++) {
        hours.push(hour.toString());
      }
    }
    return hours;
  };

  const generateMinuteOptions = () => {
    const minutes = [];
    for (let minute = 0; minute < 60; minute += 15) {
      minutes.push(minute.toString().padStart(2, '0'));
    }
    return minutes;
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {/* Hour Picker */}
        <Select onValueChange={(value) => { setSelectedHour(value); handleTimeChange(); }} value={selectedHour}>
          <SelectTrigger className="bg-accent">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {generateHourOptions().map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Minute Picker */}
        <Select onValueChange={(value) => { setSelectedMinute(value); handleTimeChange(); }} value={selectedMinute}>
          <SelectTrigger className="bg-accent">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {generateMinuteOptions().map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* AM/PM Picker (only for 12-hour format) */}
        {!is24HourFormat && (
          <Select onValueChange={(value) => { setSelectedPeriod(value); handleTimeChange(); }} value={selectedPeriod}>
            <SelectTrigger className="bg-accent">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Toggle 24-hour/12-hour format */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={is24HourFormat}
            onChange={() => {
              setIs24HourFormat(!is24HourFormat);
              handleTimeChange();
            }}
            className="mr-2"
          />
          24-hour format
        </label>
      </div>
    </div>
  );
};

export default TimePicker;
