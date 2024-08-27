import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { createEventSchema, IEvent } from './schema';
import { formatFileSize } from '../utils';

// Define the path to your events file
const eventsFilePath = path.join(
  process.cwd(),
  'src',
  'app',
  'api',
  'data',
  'events.json'
);

// Helper functions to read and write events
const readEventsFromFile = (): IEvent[] => {
  const fileContent = fs.readFileSync(eventsFilePath, 'utf-8');
  return JSON.parse(fileContent);
};

const writeEventsToFile = (events: IEvent[]) => {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
};

// Handler for GET and POST requests
export async function GET() {
  try {
    // Read events from events.json file
    const events = readEventsFromFile();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formValues = await request.formData();
    const formDataObj: Record<string, any> = {};

    formValues.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const validatedData = createEventSchema.parse(formDataObj);

    // Print the size of the banner image file if it exists
    if (validatedData.bannerImage) {
      const size = formatFileSize(validatedData.bannerImage.size ?? 0);
      console.log('Image File Size', size);
    }

    const events = readEventsFromFile();

    const newEvent: IEvent = {
      id: faker.string.uuid(),
      ...validatedData,
    };

    events.push(newEvent);
    writeEventsToFile(events);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Failed to Create event' },
      { status: 400 }
    );
  }
}
