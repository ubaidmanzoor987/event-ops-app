// schema.ts
import { z } from 'zod';

// List of allowed image types
const ALLOWED_IMAGE_TYPES = [
  'image/svg+xml',
  'image/png',
  'image/jpeg',
  'image/gif',
];

export const createEventSchema = z.object({
  eventName: z.string().min(1, { message: 'Missing event name' }),
  date: z.string().min(1, { message: 'Date is required' }),
  timeZone: z.string().min(1, { message: 'Timezone is required' }),
  startTime: z.string().min(1, { message: 'Start Time is required' }),
  endTime: z.string().min(1, { message: 'End Time is required' }),
  profilePicture: z.string().optional(),
  description: z
    .string()
    .min(15, { message: 'Description must be at least 15 characters long' })
    .optional(),
  video: z
    .string()
    .optional()
    .refine((value) => !value || /^https:\/\/.+$/.test(value), {
      message: 'Video link must be a valid HTTPS URL',
    }),
  bannerImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file || (file.size > 0 && ALLOWED_IMAGE_TYPES.includes(file.type)),
      {
        message:
          'Banner Image must be a valid non-empty image file (PNG or JPEG)',
      }
    ),
});

export type IEvent = z.infer<typeof createEventSchema> & {
  id: string; // Adding an id field for unique identification
};
