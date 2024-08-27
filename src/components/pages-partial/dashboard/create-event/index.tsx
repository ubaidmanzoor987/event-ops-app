'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { zodResolver } from '@hookform/resolvers/zod';
import FileDropzone from '@/components/common/FileDropZone';
import CustomTimezoneSelect from '@/components/ui/timezone-select';
import TimePicker from '@/components/ui/time-picker';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CloseIcon, ErrorIcon, LinkIcon } from '@/assets/svgs';
import DatePicker from '@/components/ui/datepicker';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

interface CreateEventProps {}

const createEventSchema = z.object({
  eventName: z.string().min(1, { message: 'Missing event name' }),
  date: z.string().min(1, { message: 'Date is required' }),
  timeZone: z.string().min(1, { message: 'Timezone is required' }),
  startTime: z.string().min(1, { message: 'Start Time is required' }),
  endTime: z.string().min(1, { message: 'End Time is required' }),
  profilePicture: z.string().optional(),
  description: z
    .string()
    .min(15, 'Description must be at least 15 characters long')
    .optional(),
  video: z
    .string()
    .optional()
    .refine((value) => !value || /^https:\/\/.+$/.test(value), {
      message: 'Video link must be a valid HTTPS URL',
    }),
  bannerImage: z
    .any()
    .optional()
    .refine((file) => !file || (file && file.size > 0), {
      message: 'Banner Image must be a valid, non-empty file',
    }),
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

  const onSubmit = async (eventData: FormFields) => {
    // Handle form submission
    console.log({ eventData });
    const formData = new FormData();

    // Append form fields
    Object.keys(eventData).forEach((key) => {
      const value = eventData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log({ result });
    } catch (error) {
      console.error('Error creating event:', error);
    }

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-background shadow-lg rounded-lg pointer-events-auto flex ring-2 ring-accent ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex justify-between items-center mt-1">
            <p className="text-base font-medium text-headingColor">
              Emilia Gates
            </p>
            <p className=" text-base  font-medium  text-primary">Edit Event</p>
          </div>
        </div>
        <div className="flex ">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full p-4 flex items-center justify-center "
          >
            <CloseIcon className="text-red w-8 h-8" />
          </button>
        </div>
      </div>
    ));
  };

  const handleDateChange = (newValue: Date) => {
    setDate(newValue);
    form.setValue('date', newValue.toDateString());
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  console.log(form.formState.errors);
  return (
    <div className="flex flex-col w-full gap-12 xl:gap-16 xl:w-3/5 ">
      {/* Error Message Display */}
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {Object.values(form.formState.errors).map((error, index) => (
            <div key={'error-' + index} className="flex gap-3">
              <ErrorIcon />
              <p className="text-sm">{error?.message?.toString()}</p>{' '}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col items-start">
        <p className="font-medium text-2xl text-headingColor">
          Create an Event
        </p>
        <p className="font-medium text-sm text-subheadingColor">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12 xl:gap-16 mb-12 xl:mb-16"
        >
          {/* Event Name */}
          <div className="w-full items-center ">
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
          <div className="w-full items-center">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 ">
                <Label>Date & Time</Label>
              </div>
              <div
                className="col-span-6"
                onFocus={() => setShow(true)}
                // onBlur={() => setShow(false)}
              >
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      initialValue={field.value}
                      onDateChange={(date) => field.onChange(date)}
                      show={show}
                      setShow={setShow}
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
          <div className="w-full items-center ">
            <div className=" flex flex-row gap-x-6 items-center ">
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
          <div className="w-full items-center">
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
          <div className="w-full ">
            <div className="col-span-12 mb-1">
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
                        error={
                          form.formState.errors?.bannerImage?.message as string
                        }
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {/* Button Handlers */}
          <div className="w-full flex">
            <div className="flex items-center gap-x-2 ">
              <Button className="py-5 w-full" type="submit">
                <span className="font-medium text-base">Create event</span>
              </Button>
              <Button className="py-5 w-full " variant="ghost" type="submit">
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
