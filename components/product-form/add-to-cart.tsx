'use client';

import { ShoppingCart, Loader2 as Spinner } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@bigcommerce/components/button';

export const AddToCart = ({ disabled = false }: { disabled?: boolean }) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <Button disabled={disabled || isSubmitting} type="submit" className="flex-1">
      {isSubmitting ? (
        <>
          <Spinner aria-hidden="true" className="animate-spin" />
          <span className="sr-only">Processing...</span>
        </>
      ) : (
        <>
          <ShoppingCart aria-hidden="true" size={20} strokeWidth={2} absoluteStrokeWidth />
          <span>Add to cart</span>
        </>
      )}
    </Button>
  );
};
