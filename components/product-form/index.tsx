'use client';

import { AlertCircle, Check, Heart } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Button } from '@bigcommerce/components/button';
import { getProduct } from '~/client/queries/get-product';
import { ExistingResultType } from '~/client/util';

import { Link } from '../link';

import { handleAddToCart } from './_actions/add-to-cart';
import { AddToCart } from './add-to-cart';
import { CheckboxField } from './fields/checkbox-field';
import { DateField } from './fields/date-field';
import { MultiLineTextField } from './fields/multi-line-text-field';
import { MultipleChoiceField } from './fields/multiple-choice-field';
import { NumberField } from './fields/number-field';
import { QuantityField } from './fields/quantity-field';
import { TextField } from './fields/text-field';
import { ProductFormData, useProductForm } from './use-product-form';

type Product = ExistingResultType<typeof getProduct>;

export const productFormSubmit = async (data: ProductFormData) => {
  const result = await handleAddToCart(data);
  const quantity = Number(data.quantity);

  if (result?.error) {
    toast.error(result.error || 'Something went wrong. Please try again.', {
      icon: <AlertCircle className="text-red-100" />,
    });

    return;
  }

  toast.success(
    () => (
      <div className="flex items-center gap-3">
        <span>
          {quantity} {quantity === 1 ? 'Item' : 'Items'} added to{' '}
          <Link className="text-blue-primary hover:text-blue-secondary font-semibold" href="/cart">
            your cart
          </Link>
        </span>
      </div>
    ),
    { icon: <Check className="text-green-100" /> },
  );
};

export const ProductForm = ({ product }: { product: Product }) => {
  const { handleSubmit, register, ...methods } = useProductForm();

  return (
    <FormProvider handleSubmit={handleSubmit} register={register} {...methods}>
      <form onSubmit={handleSubmit(productFormSubmit)} className="space-y-4">
        <input type="hidden" value={product.entityId} {...register('product_id')} />

        {product.productOptions?.map((option) => {
          if (option.__typename === 'MultipleChoiceOption') {
            return <MultipleChoiceField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'CheckboxOption') {
            return <CheckboxField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'NumberFieldOption') {
            return <NumberField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'MultiLineTextFieldOption') {
            return <MultiLineTextField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'TextFieldOption') {
            return <TextField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'DateFieldOption') {
            return <DateField key={option.entityId} option={option} />;
          }

          return null;
        })}

        <QuantityField />

        <div className="flex w-full gap-x-2">
          <AddToCart disabled={product.availabilityV2.status === 'Unavailable'} />

          {/* NOT IMPLEMENTED YET */}
          <Button type="submit" variant="secondary" className="group !px-3">
            <Heart aria-hidden="true" size={20} strokeWidth={2} absoluteStrokeWidth />
            <span className="sr-only">Save to wishlist</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
