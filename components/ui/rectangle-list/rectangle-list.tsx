import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

const RectangleList = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>
>(({ children, className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('flex flex-wrap gap-2', className)}
    orientation="horizontal"
    ref={ref}
    {...props}
  >
    {children}
  </RadioGroupPrimitive.Root>
));

RectangleList.displayName = 'RectangleList';

const RectangleListItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    className={cn(
      'border-2 px-3 py-2 font-semibold text-black transition-colors hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue disabled:border-gray-100 disabled:text-gray-400 disabled:hover:border-gray-100',
      'text-sm data-[state=checked]:border-pink',
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </RadioGroupPrimitive.Item>
));

RectangleListItem.displayName = 'RectangleListItem';

export { RectangleList, RectangleListItem };
