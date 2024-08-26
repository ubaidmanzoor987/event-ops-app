import * as React from 'react';
import { IEvent } from '@/lib/types';
import { generateMockEvents } from '@/lib/mocks';
import EventCard from '@/components/common/EventCard';

const mockedEvents = generateMockEvents(3);

export function Events() {
  const [events, setEvents] = React.useState<IEvent[]>([]);

  React.useEffect(() => {
    setEvents(mockedEvents);
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-event-heading text-sm font-bold">
        Today&apos;s Events
      </p>
      <div className="grid grid-cols-12 gap-y-3">
        {events.map((event) => (
          <div className="col-span-12" key={event.id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
