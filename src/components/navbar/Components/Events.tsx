import * as React from 'react';
import { IEvent } from '@/lib/types';
import EventCard from '@/components/common/EventCard';
import { Skeleton } from '@/components/ui/skeleton';


export function Events() {
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/events', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log({ result });
      setEvents(result);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        {isLoading ? (
          <div className="flex gap-2 col-span-12">
            <Skeleton className="w-14 h-14" />
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className=" h-5" />
              <Skeleton className=" h-8" />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
