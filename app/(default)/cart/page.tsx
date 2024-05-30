import { Trash2 as Trash } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Suspense } from 'react';

import { Button } from '@bigcommerce/components/button';
import { getCheckoutUrl } from '~/client/management/get-checkout-url';
import { getCart } from '~/client/queries/get-cart';

import { removeProduct } from './_actions/remove-products';
import { CartItemCounter } from './_components/cart-item-counter';

export const metadata = {
  title: 'Cart',
};

const EmptyCart = () => (
  <div className="flex h-full flex-col">
    <h1 className="pb-6 text-4xl font-black lg:pb-10 lg:text-5xl">Your cart</h1>
    <div className="flex grow flex-col items-center justify-center gap-6 border-t border-t-gray-200 py-20">
      <h2 className="text-xl font-bold lg:text-2xl">Your cart is empty</h2>
      <p className="text-center">
        Looks like you have not addded anything to your cart. Go ahead & explore top categories.
      </p>
    </div>
  </div>
);

const CheckoutButton = async ({ cartId }: { cartId: string }) => {
  const checkoutUrl = await getCheckoutUrl(cartId);

  return (
    <Button asChild>
      <a href={checkoutUrl} className="w-full">
        Proceed to checkout
      </a>
    </Button>
  );
};

export default async function CartPage() {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return <EmptyCart />;
  }

  const cart = await getCart(cartId);

  if (!cart) {
    return <EmptyCart />;
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cart.currencyCode,
  });
  const extractCartlineItemsData = ({
    entityId,
    productEntityId,
    quantity,
    variantEntityId,
  }: (typeof cart.lineItems.physicalItems)[number]) => ({
    lineItemEntityId: entityId,
    productEntityId,
    quantity,
    variantEntityId,
  });

  return (
    <div>
      <h1 className="border-b border-black p-4 font-display text-xl font-bold uppercase sm:p-6 md:mb-0 md:text-2xl lg:p-8 lg:text-3xl">
        Your cart
      </h1>
      <div className="flex flex-col lg:flex-row">
        <ul className="flex-1">
          {cart.lineItems.physicalItems.map((product) => (
            <li
              key={product.entityId}
              className="flex flex-col items-start gap-4 border-t border-black px-4 py-4 first:border-t-0 sm:flex-row sm:items-center md:pl-4 md:pr-6 lg:gap-4 lg:pl-6 lg:pr-10"
            >
              <div className="flex flex-1 items-center gap-x-3">
                <Image alt={product.name} height={96} src={product.imageUrl ?? ''} width={96} />

                <div className="flex-1">
                  <p className="text-base opacity-50">{product.brand}</p>
                  <p className="font-display text-sm font-bold uppercase md:text-base">
                    {product.name}
                  </p>

                  {product.selectedOptions.length > 0 && (
                    <div className="mt-2">
                      {product.selectedOptions.map((selectedOption) => {
                        switch (selectedOption.__typename) {
                          case 'CartSelectedMultipleChoiceOption':
                            return (
                              <div key={selectedOption.entityId}>
                                <span>{selectedOption.name}:</span>{' '}
                                <span className="font-semibold">{selectedOption.value}</span>
                              </div>
                            );

                          case 'CartSelectedCheckboxOption':
                            return (
                              <div key={selectedOption.entityId}>
                                <span>{selectedOption.name}:</span>{' '}
                                <span className="font-semibold">{selectedOption.value}</span>
                              </div>
                            );

                          case 'CartSelectedNumberFieldOption':
                            return (
                              <div key={selectedOption.entityId}>
                                <span>{selectedOption.name}:</span>{' '}
                                <span className="font-semibold">{selectedOption.number}</span>
                              </div>
                            );

                          case 'CartSelectedMultiLineTextFieldOption':
                            return (
                              <div key={selectedOption.entityId}>
                                <span>{selectedOption.name}:</span>{' '}
                                <span className="font-semibold">{selectedOption.text}</span>
                              </div>
                            );

                          case 'CartSelectedTextFieldOption':
                            return (
                              <div key={selectedOption.entityId}>
                                <span>{selectedOption.name}:</span>{' '}
                                <span className="font-semibold">{selectedOption.text}</span>
                              </div>
                            );

                          case 'CartSelectedDateFieldOption':
                            return (
                              <div key={selectedOption.entityId}>
                                <span>{selectedOption.name}:</span>{' '}
                                <span className="font-semibold">
                                  {Intl.DateTimeFormat().format(new Date(selectedOption.date.utc))}
                                </span>
                              </div>
                            );
                        }

                        return null;
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full items-center gap-x-4 sm:w-auto">
                <CartItemCounter itemData={extractCartlineItemsData(product)} />

                <p className="flex-1 text-base font-bold">${product.extendedSalePrice.value}</p>

                <form action={removeProduct} className="h-5">
                  <input name="lineItemEntityId" type="hidden" value={product.entityId} />
                  <button type="submit">
                    <Trash size={20} strokeWidth={1.5} absoluteStrokeWidth />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>

        <div className="w-full border-t border-black p-5 lg:w-[420px] lg:border-l lg:border-t-0 lg:p-8">
          <div className="flex justify-between pb-1">
            <span className="text-base font-semibold">Subtotal</span>
            <span className="text-base">
              {currencyFormatter.format(cart.totalExtendedListPrice.value)}
            </span>
          </div>

          <div className="flex justify-between pb-1">
            <span className="text-base font-semibold">Discounts</span>
            <span className="text-base">
              {currencyFormatter.format(cart.totalDiscountedAmount.value)}
            </span>
          </div>

          <div className="mb-6 mt-3 flex justify-between">
            <span className="text-lg font-bold lg:text-xl">Total</span>
            <span className="text-lg font-bold lg:text-xl">
              {currencyFormatter.format(cart.totalExtendedSalePrice.value)}
            </span>
          </div>

          <Suspense fallback="Loading...">
            <CheckoutButton cartId={cartId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export const runtime = 'edge';
