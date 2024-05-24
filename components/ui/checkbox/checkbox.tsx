import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

type CheckboxType = typeof CheckboxPrimitive.Root;

export const Checkbox = forwardRef<ElementRef<CheckboxType>, ComponentPropsWithRef<CheckboxType>>(
  ({ children, className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        className={cn(
          'block h-5 w-5 border border-black/25',
          'hover:border-black/50',
          'focus:border-blue focus:outline-none',
          'focus:hover:border-blue-secondary',
          'radix-state-checked:border-blue-primary radix-state-checked:bg-blue',
          'radix-state-checked:hover:border-blue-secondary radix-state-checked:hover:bg-blue-secondary',
          'disabled:pointer-events-none disabled:bg-gray-100',
          'radix-state-checked:disabled:border-gray-400 radix-state-checked:disabled:bg-gray-400',
          className,
        )}
        ref={ref}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex flex-shrink-0 items-center justify-center">
          {children || (
            <Check absoluteStrokeWidth className="stroke-white" strokeWidth={2} size={12} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
