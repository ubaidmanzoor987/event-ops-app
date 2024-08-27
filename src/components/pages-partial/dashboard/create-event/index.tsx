'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { zodResolver } from '@hookform/resolvers/zod';
import FileDropzone from '@/components/common/FileDropZone';
import CustomTimezoneSelect from '@/components/ui/timezone-select';
import TimePicker from '@/components/ui/time-picker';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CloseIcon, ErrorIcon, LinkIcon } from '@/assets/svgs';
import { Textarea } from '@/components/ui/textarea';
import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import CustomToast from '@/components/common/CustomToast';
import DatePicker from '@/components/ui/datepicker';
import Spinner from '@/components/common/Spinner';

interface CreateEventProps {}

const createEventSchema = z.object({
  eventName: z.string().min(1, { message: 'Event name is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  timeZone: z.string().min(1, { message: 'Timezone is required' }),
  startTime: z.string().min(1, { message: 'Start Time is required' }),
  endTime: z.string().min(1, { message: 'End Time is required' }),
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
  const [show, setShow] = React.useState<boolean>(false);

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventName: '',
      bannerImage: '',
      date: '',
      description: '',
      endTime: '',
      startTime: '',
      timeZone: '',
      video: '',
    },
  });

  const onSubmit = async (eventData: FormFields) => {
    const formData = new FormData();

    Object.keys(eventData).forEach((key) => {
      const value = eventData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      const response = await createEvent(formData);

      toast.custom((t) => <CustomToast t={t} title={eventData.eventName} />);
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  return (
    <div className="flex flex-col w-full gap-12 xl:gap-16 xl:w-3/5 ">
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="  mt-2 p-1">
          {Object.values(form.formState.errors).map((error, index) => (
            <div
              key={'error-' + index}
              className="bg-red-100 text-red-700 p-2 rounded-lg flex gap-3 mt-2 "
            >
              <ErrorIcon />
              <p className="text-sm">{error?.message?.toString()}</p>{' '}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col items-start">
        <p
          className="font-medium text-2xl text-headingColor"
          data-cy="page-title"
          data-testid="page-title"
        >
          Create an Event
        </p>
        <p
          className="font-medium text-sm text-subheadingColor"
          data-cy="page-description"
          data-testid="page-description"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12 xl:gap-16 mb-12 xl:mb-16"
          data-testid="event-form"
        >
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
                        data-cy="event-name"
                        data-testid="event-name"
                      />
                    </FormControl>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="w-full items-center">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 ">
                <Label>Date & Time</Label>
              </div>
              <div className="col-span-6" onFocus={() => setShow(true)}>
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
                      dataCy="event-time"
                      dataCyList="event-time-list"
                      dataTestId="event-start-time"
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
                      dataCy="event-end-time"
                      dataCyList="event-end-time-list"
                      dataTestId="event-end-time" 
                    />
                  )}
                />
              </div>
            </div>
          </div>

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
                        data-cy="event-description"
                        data-testid="event-description"
                      />
                    </FormControl>
                  </div>
                )}
              />
            </div>
          </div>

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
                        data-cy="event-video"
                        data-testid="event-video"
                      />
                    </FormControl>
                  </div>
                )}
              />
            </div>
          </div>

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
                        data-testid="event-banner-image"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex">
            <div className="flex items-center gap-x-2 ">
              <Button
                className="py-5 min-w-[150px] font-medium text-base"
                type="submit"
                data-cy="event-submit"
                data-testid="event-submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Create event'}
              </Button>
              <Button
                className="py-5 w-full "
                variant="ghost"
                type="button"
                data-testid="event-cancel"
              >
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
