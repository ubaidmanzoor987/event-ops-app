// pages/api/events/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createEventSchema, IEvent } from './schema';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');

const readEventsFromFile = (): IEvent[] => {
  const fileContent = fs.readFileSync(eventsFilePath, 'utf-8');
  return JSON.parse(fileContent);
};

const writeEventsToFile = (events: IEvent[]) => {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Validate request body against the schema
    try {
      const validatedData = createEventSchema.parse(req.body);

      const events = readEventsFromFile();

      const index = events.findIndex((event) => event.id === id);

      if (index === -1) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const updatedEvent = { ...events[index], ...validatedData };
      events[index] = updatedEvent;
      writeEventsToFile(events);

      return res.status(200).json(updatedEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
