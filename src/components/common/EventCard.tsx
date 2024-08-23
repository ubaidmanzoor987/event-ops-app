import React from 'react';
import { IEvent } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface EventCardProps {
  event: IEvent | null;
  className?: string;
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ event, className, ...props }, ref) => {
    return (
      <>
        <div
          className={cn(
            'w-full rounded-2xl bg-white min-h-[90px] p-3 flex flex-row justify-between',
            className
          )}
          {...props}
          ref={ref}
        >
          <div className="flex flex-row gap-x-2">
            <Avatar
              className={`w-10 h-10 items-center justify-center flex border `}
            >
              <AvatarImage src={event?.image} />
              <AvatarFallback>
                {event?.title.slice(0, 1)} {event?.title.slice(2, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-x-2 ">
              <p className="text-headingColor text-sm font-semibold  ">
                {event?.title}
              </p>
              <p className="text-headingColor text-sm font-normal break-all">
                {event?.description}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
);

EventCard.displayName = 'EventCard';

export default EventCard;
