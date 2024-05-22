import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

export const Badge = forwardRef<ElementRef<'span'>, ComponentPropsWithRef<'span'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        className={cn(
          'absolute -end-2.5 top-0.5 h-6 w-6 place-content-center rounded-full border-2 border-gold bg-green text-center font-sans text-[10px] font-semibold leading-none text-white',
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
