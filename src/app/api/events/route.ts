import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { createEventSchema, IEvent } from './schema';
import { IncomingForm } from 'formidable';
import { Readable } from 'stream';

export interface IMockEvent {
  id: string; // Unique identifier for the event
  title: string; // Title of the event
  description: string; // Description of the event
  date: string; // Date of the event
  image: string; // URL or path to the event image
}

// Define the path to your events file
const eventsFilePath = path.join(
  process.cwd(),
  'src',
  'app',
  'api',
  'data',
  'events.json'
);

// Publicly accessible paths to your images
const imagePaths = [
  '/assets/png/image1.png',
  '/assets/png/image2.png',
  '/assets/png/image3.png',
];

export const generateMockEvents = (numTransactions: number): IMockEvent[] => {
  const events: IMockEvent[] = [];
  const descriptions = ['The Viper Room', 'The Wiltern', 'The Troubadour!'];

  for (let i = 0; i < numTransactions; i++) {
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const date = new Date().toLocaleDateString('en-US');
    const image = imagePaths[Math.floor(Math.random() * imagePaths.length)];

    events.push({
      date: date,
      description: description,
      title: faker.person.firstName(),
      id: faker.string.uuid(),
      image,
    });
  }

  return events;
};

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
    // Dynamically generate mock events (e.g., 5 events)
    const events = generateMockEvents(5);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const validatedData = createEventSchema.parse(body);

//     const events = readEventsFromFile();

//     const newEvent: IEvent = {
//       id: faker.string.uuid(),
//       ...validatedData,
//     };

//     events.push(newEvent);
//     writeEventsToFile(events);

//     return NextResponse.json(newEvent, { status: 201 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ errors: error.errors }, { status: 400 });
//     }
//     return NextResponse.json(
//       { message: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
    });
  
    // Convert ReadableStream to Node.js stream
    const stream = Readable.from(await request.text());
  
    // Convert the ReadableStream to Node.js IncomingMessage
    const req = new Readable({
      read() {
        this.push(stream.read());
        this.push(null);
      },
    });
  
    try {
      const parsedData = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });
  
      const { fields, files } = parsedData;
  
      // Validate fields
      const validatedData = createEventSchema.parse(fields);
  
      // Handle file
      const bannerImage = files.bannerImage && files.bannerImage[0];
      if (bannerImage && bannerImage.filepath) {
        validatedData.bannerImage = bannerImage.filepath;
      }
  
      // Save event data
      const events = readEventsFromFile();
      const newEvent = { id: faker.string.uuid(), ...validatedData };
      events.push(newEvent);
      writeEventsToFile(events);
  
      return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }