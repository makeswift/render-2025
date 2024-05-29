import * as SelectPrimitive from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';
import { Check, ChevronDown } from 'lucide-react';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

const selectVariants = cva(
  'group w-auto inline-flex items-center justify-center relative overflow-hidden border-2 font-display font-bold uppercase leading-none text-black transition duration-150 px-3 py-2.5 text-xs md:px-4 md:pr-3 focus:ring-0 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-blue group gap-x-2 bg-transparent text-black border-2 border-black hover:border-pink disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-400 disabled:hover:text-gray-400',
  {
    variants: {
      variant: {
        success:
          'border-green-100 focus:border-green-100 focus:ring-green-100/20 disabled:border-gray-200 hover:border-green-200',
        error:
          'border-red-100 focus:border-red-100 focus:ring-red-100/20 disabled:border-gray-200 hover:border-red-200',
      },
    },
  },
);

type SelectType = typeof SelectPrimitive.Root;
type SelectTriggerType = typeof SelectPrimitive.Trigger;

interface SelectProps extends ComponentPropsWithRef<SelectType> {
  variant?: 'success' | 'error';
  placeholder?: string;
  className?: string;
  'aria-label'?: string;
}

// We need to pass the ref to the Trigger component so we need to type it as such.
const Select = forwardRef<ElementRef<SelectTriggerType>, SelectProps>(
  ({ children, placeholder, className, variant, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          aria-label={ariaLabel}
          className={cn(selectVariants({ variant, className }))}
          ref={ref}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          {/* TODO: For the sake of moving fast we are leaving this in, but in the future we need to figure out how enable custom icons */}
          <SelectPrimitive.Icon>
            <ChevronDown size={16} strokeWidth={2} absoluteStrokeWidth />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        {children}
      </SelectPrimitive.Root>
    );
  },
);

Select.displayName = SelectPrimitive.Root.displayName;

type SelectContentType = typeof SelectPrimitive.Content;

const SelectContent = forwardRef<
  ElementRef<SelectContentType>,
  ComponentPropsWithRef<SelectContentType>
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        {...props}
        className={cn(
          'relative w-full border border-black bg-white max-h-radix-select-content-available-height data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        ref={ref}
      >
        <SelectPrimitive.Viewport className="w-full min-w-[var(--radix-select-trigger-width)] h-radix-select-content-available-height">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

SelectContent.displayName = SelectPrimitive.Content.displayName;

type SelectItemType = typeof SelectPrimitive.Item;

const SelectItem = forwardRef<ElementRef<SelectItemType>, ComponentPropsWithRef<SelectItemType>>(
  ({ children, className, ...props }, ref) => {
    return (
      <SelectPrimitive.Item
        {...props}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center justify-between overflow-visible px-4 py-2 text-black/50 outline-none transition-colors hover:bg-pink/20 hover:text-black data-[disabled]:pointer-events-none data-[state="checked"]:bg-pink data-[state="checked"]:text-black data-[disabled]:opacity-50',
          className,
        )}
        ref={ref}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        {/* TODO: For the sake of moving fast we are leaving this in, but in the future we need to figure out how enable custom indicators */}
        <SelectPrimitive.ItemIndicator>
          <Check size={16} strokeWidth={2} absoluteStrokeWidth />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  },
);

SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectContent, SelectItem };
