import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

const ProductCard = forwardRef<ElementRef<'div'>, ComponentPropsWithRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'group relative flex flex-col items-start overflow-visible px-4 md:px-5',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ProductCard.displayName = 'ProductCard';

const ProductCardImage = forwardRef<ElementRef<'div'>, ComponentPropsWithRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

ProductCardImage.displayName = 'ProductCardImage';

const ProductCardBadge = forwardRef<ElementRef<'span'>, ComponentPropsWithRef<'span'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        className={cn('absolute start-0 top-4 bg-black px-4 py-1 text-white', className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  },
);

ProductCardBadge.displayName = 'ProductCardBadge';

const ProductCardInfo = forwardRef<ElementRef<'div'>, ComponentPropsWithRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn('flex w-full flex-1 flex-col gap-1 py-4 md:py-5', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ProductCardInfo.displayName = 'ProductCardInfo';

const ProductCardInfoBrandName = forwardRef<ElementRef<'p'>, ComponentPropsWithRef<'p'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <p className={cn('text-base text-black/50', className)} {...props} ref={ref}>
        {children}
      </p>
    );
  },
);

ProductCardInfoBrandName.displayName = 'ProductCardInfoBrandName';

const ProductCardInfoProductName = forwardRef<ElementRef<'h3'>, ComponentPropsWithRef<'h3'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        className={cn(
          'font-display text-sm font-bold uppercase !leading-tight lg:text-base',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

ProductCardInfoProductName.displayName = 'ProductCardInfoProductName';

const ProductCardInfoPrice = forwardRef<ElementRef<'div'>, ComponentPropsWithRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={cn('text-base', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

ProductCardInfoPrice.displayName = 'ProductCardInfoPrice';

export {
  ProductCard,
  ProductCardImage,
  ProductCardBadge,
  ProductCardInfo,
  ProductCardInfoBrandName,
  ProductCardInfoProductName,
  ProductCardInfoPrice,
};
