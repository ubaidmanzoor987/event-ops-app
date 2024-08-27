'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('animate-pulse bg-accent rounded-sm', className)}
    {...props}
  />
));
Skeleton.displayName = 'Skeleton';
export { Skeleton };
