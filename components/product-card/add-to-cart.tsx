'use client';

import { Loader2 as Spinner } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@bigcommerce/components/button';

export const AddToCart = ({ disabled = false }: { disabled?: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={disabled || pending} type="submit">
      {pending ? (
        <>
          <Spinner aria-hidden="true" className="animate-spin" />
          <span className="sr-only">Processing...</span>
        </>
      ) : (
        'Add to cart'
      )}
    </Button>
  );
};
