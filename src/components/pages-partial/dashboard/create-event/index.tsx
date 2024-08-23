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
} from '@/assets/svgs';

interface CreateEventProps {}

const options: IOptions = {
  title: '',
  autoHide: true,
  todayBtn: true,
  clearBtn: false,
  clearBtnText: 'Clear',
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-background',
    todayBtn: '',
    clearBtn: '',
    icons:
      'hover:bg-transparent active:outline-0 active:!border-0 focus:!outline-0 focus:!ring-0 ',
    text: 'text-heading',
    disabledText: 'text-calendar-text',
    input: '',
    inputIcon: '',
    selected: '',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
      <div className="border-2 border-calendar-text rounded-xl p-1">
        <ArrowLeftIcon className="fill-none text-red" />
      </div>
    ),
    next: () => (
      <div className="border-2 border-calendar-text rounded-xl p-1">
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
                    <FormMessage className="text-destructive">
                      {form.formState.errors.eventName?.message}
                    </FormMessage>
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
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className="w-full">
                      <FormControl>
                        {/* <Datepicker
                          useRange={false}
                          value={date}
                          onChange={handleDateChange}
                          toggleIcon={() => (
                            <CalendarIcon className="h-5 w-5 text-headingColor" />
                          )}
                          containerClassName={
                            'custom-date-picker relative bg-accent w-full rounded-lg !text-subHeadingColor'
                          }
                          placeholder="Select Date"
                          inputId={field.name}
                          inputName={field.name}
                          popoverDirection="down"
                          inputClassName={
                            'relative duration-300 py-2 pr-14 pl-10 w-full !text-base text-subheadingColor rounded-lg placeholder:text-subheadingColor font-base !bg-transparent focus:border-none focus:outline-0  '
                          }
                          asSingle
                          readOnly
                        /> */}
                        <div>
                          <Datepicker
                            options={options}
                            onChange={handleDateChange}
                            show={show}
                            setShow={handleClose}
                          >
                            <div className="...">
                              <div className="...">
                                <CalendarIcon />
                              </div>
                              <input
                                type="text"
                                className="..."
                                placeholder="Select Date"
                                // value={date.to}
                                onFocus={() => setShow(true)}
                                readOnly
                              />
                            </div>
                          </Datepicker>
                        </div>
                      </FormControl>
                    </div>
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
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <div className="w-full">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="time"
                          id="startTime"
                          aria-label="Start Time"
                          placeholder="Start Time"
                          error={!!form.formState.errors.startTime}
                          className="bg-accent "
                          showIcon
                          icon={ClockIcon}
                          iconClassName="text-subheadingColor"
                        />
                      </FormControl>
                    </div>
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
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-3 flex flex-col">
              <div className="flex flex-row items-center gap-x-1">
                <p className="font-semibold text-headingColor text-sm">
                  Your photo
                </p>
              </div>
              <p className="font-normal text-subheadingColor text-sm">
                This will be displayed on your profile.
              </p>
            </div>
            <div className="col-span-9 ">
              <div className="flex flex-row gap-x-6 w-3/4 ">
                <Controller
                  name="profilePicture"
                  control={form.control}
                  render={({ field }) => {
                    const fileUrl = field.value
                      ? URL.createObjectURL(field.value as any)
                      : '';
                    return (
                      <>
                        <Avatar
                          className={`w-16 h-16 items-center justify-center flex border bg-[#F2F2F2] object-contain`}
                        >
                          <AvatarImage
                            src={fileUrl}
                            alt="Uploaded file preview"
                            style={{
                              objectFit: 'fill',
                            }}
                          />
                          <AvatarFallback>
                            {form.getValues('eventName')?.slice(0, 1)}{' '}
                          </AvatarFallback>
                        </Avatar>
                        <FileDropzone
                          onFileUpload={(file) => field.onChange(file)}
                        />
                      </>
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <Separator className="mt-6 mb-3" />

          <Separator className="mt-6 mb-3" />

          {/* Timezone */}
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-3 ">
              <p className="font-semibold text-headingColor text-sm">
                Timezone
              </p>
            </div>
            <div className="col-span-9 ">
              <div className="flex flex-col gap-y-2 w-3/4 items-center">
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
            </div>
          </div>

          <Separator className="mt-6 mb-3" />

          {/* Button Handlers */}
          <div className="w-full flex justify-end">
            <div className="w-1/6 flex items-center gap-x-2 ">
              <Button className="py-5 w-full bg-gray-100 text-gray-400 hover:bg-gray-100">
                <span className="font-medium text-base">Cancel</span>
              </Button>
              <Button className="py-5 w-full" type="submit">
                <span className="font-medium text-base">Save</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvent;
