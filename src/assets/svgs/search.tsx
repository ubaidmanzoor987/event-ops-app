import { cn } from '@/lib/cn';

export const SearchIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn('h-6 w-6', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="16" height="16" fill="currentColor" fill-opacity="0.01" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6666 6.9333C10.6666 8.99517 8.99517 10.6666 6.9333 10.6666C4.87143 10.6666 3.19997 8.99517 3.19997 6.9333C3.19997 4.87143 4.87143 3.19997 6.9333 3.19997C8.99517 3.19997 10.6666 4.87143 10.6666 6.9333ZM9.9294 10.6836C9.10824 11.3406 8.06665 11.7333 6.9333 11.7333C4.28234 11.7333 2.1333 9.58427 2.1333 6.9333C2.1333 4.28234 4.28234 2.1333 6.9333 2.1333C9.58427 2.1333 11.7333 4.28234 11.7333 6.9333C11.7333 8.06665 11.3406 9.10824 10.6836 9.9294L13.7105 12.9561C13.9187 13.1644 13.9187 13.5022 13.7105 13.7105C13.5022 13.9187 13.1644 13.9187 12.9561 13.7105L9.9294 10.6836Z"
        fill="currentColor"
        fill-opacity="0.690196"
      />
    </svg>
  );
};
