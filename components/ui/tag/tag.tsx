import { X } from 'lucide-react';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

type TagProps = ComponentPropsWithRef<'div'>;

const Tag = forwardRef<ElementRef<'div'>, TagProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        'inline-flex h-[40px] flex-row items-center whitespace-nowrap bg-gray-100 text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Tag.displayName = 'Tag';

type TagContentProps = ComponentPropsWithRef<'span'>;

const TagContent = forwardRef<ElementRef<'span'>, TagContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <span className={cn('pe-1 ps-4 font-semibold only:px-4', className)} ref={ref} {...props} />
    );
  },
);

TagContent.displayName = 'TagContent';

type TagActionProps = ComponentPropsWithRef<'button'>;

const TagAction = forwardRef<ElementRef<'button'>, TagActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center opacity-50 transition-opacity duration-150 hover:opacity-100 focus:outline-none focus:ring-inset focus-visible:ring-2 focus-visible:ring-blue',
        )}
        ref={ref}
        type="button"
        {...props}
      >
        {children || <X size={16} strokeWidth={2} absoluteStrokeWidth />}
      </button>
    );
  },
);

TagAction.displayName = 'TagAction';

export { Tag, TagContent, TagAction };
export type { TagProps, TagContentProps, TagActionProps };
