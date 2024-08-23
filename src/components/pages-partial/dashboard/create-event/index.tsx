'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
// import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

import Datepicker from 'tailwind-datepicker-react';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { Separator } from '@/components/ui/seperator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FileDropzone from '@/components/common/FileDropZone';
import CustomTimezoneSelect from '@/components/ui/timezone-select';
import TimePicker from '@/components/ui/time-picker';
import { IOptions } from 'tailwind-datepicker-react/types/Options';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  LinkIcon,
} from '@/assets/svgs';
import DatePicker from '@/components/ui/datepicker';
import { Textarea } from '@/components/ui/textarea';

interface CreateEventProps {}

const options: IOptions = {
  title: '',
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  clearBtnText: 'Clear',
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-background',
    todayBtn: 'bg-calendar-active',
    clearBtn: '',
    icons:
      'hover:bg-transparent active:outline-0 active:!border-0 focus:!outline-0 focus:!ring-0 ',
    text: 'text-heading',
    disabledText: 'text-calendar-text',
    input: '',
    inputIcon: '',
    selected: 'bg-primary hover:bg-primary',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
      <div className="border-2 border-calendar-text rounded-lg p-1">
        <ArrowLeftIcon className="fill-none text-red" />
      </div>
    ),
    next: () => (
      <div className="border-2 border-calendar-text rounded-lg p-1">
        <ArrowRightIcon className="fill-none text-red" />
      </div>
    ),
  },
  datepickerClassNames: 'top-12',
  defaultDate: new Date('2022-01-01'),
  language: 'en',
  disabledDates: [],
  weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Select Date',
  inputDateFormatProp: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
};

const createEventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  date: z.string().min(1, 'Date is required'),
  timeZone: z.string().min(1, 'Timezone is required'),
  startTime: z.string().min(1, 'Start Time is required'),
  endTime: z.string().min(1, 'End Time is required'),
  profilePicture: z.string().min(1, 'Profile picture is required'),
  description: z.string().min(1, 'Description is required'),
  video: z.string().min(1, 'Video is required'),
  bannerImage: z.string().min(1, 'Banner Image is required'),
});

type FormFields = z.infer<typeof createEventSchema>;

const CreateEvent: React.FC<CreateEventProps> = () => {
  // states
  const [date, setDate] = React.useState<Date>();
  const [show, setShow] = React.useState<boolean>(false);

  // form
  const form = useForm<FormFields>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit = (vals: FormFields) => {
    // Handle form submission
  };

  const handleDateChange = (newValue: Date) => {
    setDate(newValue);
    form.setValue('date', newValue.toDateString());
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div className="py-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Event Name */}
          <div className="w-3/4 items-center ">
            <div className=" flex flex-row gap-x-6 items-center">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <div className="w-full gap-y-2 flex flex-col">
                    <Label>Name</Label>
                    <FormControl>
                      <IconInput
                        {...field}
                        type="text"
                        id="eventName"
                        aria-label="Your Event Name"
                        placeholder="Your Event Name"
                        className="bg-accent"
                        error={!!form.formState.errors.eventName}
                      />
                    </FormControl>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="w-3/4 items-center mt-16">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 ">
                <Label>Date & Time</Label>
              </div>
              <div className="col-span-6 ">
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      initialValue={field.value}
                      onDateChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </div>
              <div className="col-span-6 ">
                <Controller
                  name="timeZone"
                  control={form.control}
                  render={({ field }) => (
                    <CustomTimezoneSelect
                      initialTimezone={field.value}
                      onTimezoneChange={(timeZone) => field.onChange(timeZone)}
                    />
                  )}
                />
              </div>
              <div className="col-span-6 ">
                <Controller
                  name="startTime"
                  control={form.control}
                  render={({ field }) => (
                    <TimePicker
                      initialTime={field.value}
                      onTimeChange={(time) => field.onChange(time)}
                      placeHolder="Start Time"
                    />
                  )}
                />
              </div>
              <div className="col-span-6 ">
                <Controller
                  name="endTime"
                  control={form.control}
                  render={({ field }) => (
                    <TimePicker
                      initialTime={field.value}
                      onTimeChange={(time) => field.onChange(time)}
                      placeHolder="End Time"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="w-3/4 items-center ">
            <div className=" flex flex-row gap-x-6 items-center mt-20">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div className="w-full gap-y-2 flex flex-col">
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Add Event description"
                        error={!!form.formState.errors.description}
                      />
                    </FormControl>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Event Video Link */}
          <div className="w-3/4 items-center mt-16">
            <div className=" flex flex-row gap-x-6 items-center">
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <div className="w-full gap-y-2 flex flex-col">
                    <Label>Video</Label>
                    <FormControl>
                      <IconInput
                        {...field}
                        type="text"
                        id="video"
                        placeholder="Add Video Link"
                        className="bg-accent"
                        icon={LinkIcon}
                        iconClassName="h-4 w-4 mt-2 mr-0"
                        error={!!form.formState.errors.video}
                      />
                    </FormControl>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Banner Image */}
          <div className="w-3/4 items-center mt-16">
            <div className="col-span-12">
              <Label>Banner Image</Label>
            </div>
            <div className="col-span-9 ">
              <div className="flex flex-row gap-x-6 ">
                <Controller
                  name="bannerImage"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FileDropzone
                        onFileUpload={(file) => field.onChange(file)}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {/* Button Handlers */}
          <div className="w-full flex mt-16">
            <div className="w-1/6 flex items-center gap-x-2 ">
              <Button className="py-5 w-full" type="submit">
                <span className="font-medium text-base">Create event</span>
              </Button>
              <Button className="py-5 w-full " variant="ghost">
                <span className="font-medium text-base">Cancel</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvent;
