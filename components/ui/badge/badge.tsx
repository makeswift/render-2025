import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

export const Badge = forwardRef<ElementRef<'span'>, ComponentPropsWithRef<'span'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        className={cn(
          'absolute end-0 top-0.5 h-5 w-5 place-content-center rounded-full bg-black text-center font-sans text-[10px] font-semibold text-white ring-2 ring-pink',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
