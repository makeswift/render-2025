import Image from 'next/image';
import { useId } from 'react';

import {
  ProductCard as ComponentsProductCard,
  ProductCardImage,
  ProductCardInfo,
  ProductCardInfoBrandName,
  ProductCardInfoPrice,
  ProductCardInfoProductName,
} from '@bigcommerce/components/product-card';
import { Rating } from '@bigcommerce/components/rating';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';

import { Pricing } from '../pricing';

export interface Product {
  entityId: number;
  name: string;
  defaultImage?: {
    altText?: string;
    url?: string;
  } | null;
  path: string;
  brand?: {
    name: string;
    path: string;
  } | null;
  prices?: {
    price?: {
      value?: number;
      currencyCode?: string;
    };
    basePrice?: {
      value?: number;
      currencyCode?: string;
    } | null;
    retailPrice?: {
      value?: number;
      currencyCode?: string;
    } | null;
    salePrice?: {
      value?: number;
      currencyCode?: string;
    } | null;
    priceRange?: {
      min?: {
        value?: number;
        currencyCode?: string;
      } | null;
      max?: {
        value?: number;
        currencyCode?: string;
      } | null;
    } | null;
  } | null;
  reviewSummary?: {
    numberOfReviews: number;
    averageRating: number;
  } | null;
  productOptions?: Array<{
    entityId: number;
  }>;
}

interface ProductCardProps {
  product: Partial<Product>;
  imageSize?: 'tall' | 'wide' | 'square';
  imagePriority?: boolean;
}

export const ProductCard = ({
  product,
  imageSize = 'square',
  imagePriority = false,
}: ProductCardProps) => {
  const summaryId = useId();

  if (!product.entityId) {
    return null;
  }

  return (
    <ComponentsProductCard key={product.entityId}>
      <ProductCardImage>
        <div
          className={cn('relative flex-auto', {
            'aspect-square': imageSize === 'square',
            'aspect-[4/5]': imageSize === 'tall',
            'aspect-[7/5]': imageSize === 'wide',
          })}
        >
          {product.defaultImage ? (
            <Image
              alt={product.defaultImage.altText ?? product.name ?? ''}
              className="object-contain"
              fill
              priority={imagePriority}
              quality={100}
              src={product.defaultImage.url ?? ''}
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>
      </ProductCardImage>
      <ProductCardInfo>
        {product.brand && <ProductCardInfoBrandName>{product.brand.name}</ProductCardInfoBrandName>}
        <ProductCardInfoProductName>
          {product.path ? (
            <Link
              prefetch={true}
              className="focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-blue-primary/20 focus:ring-0"
              href={product.path}
            >
              <span aria-hidden="true" className="absolute inset-0 bottom-20" />
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </ProductCardInfoProductName>
        {product.reviewSummary && (
          <div className="flex items-center gap-3">
            <p
              aria-describedby={summaryId}
              className={cn(
                'flex flex-nowrap text-blue-primary',
                product.reviewSummary.numberOfReviews === 0 && 'text-gray-400',
              )}
            >
              <Rating size={16} value={product.reviewSummary.averageRating || 0} />
            </p>

            <div className="text-xs font-normal text-gray-500" id={summaryId}>
              {product.reviewSummary.averageRating !== 0 && (
                <>
                  <span className="sr-only">Rating:</span>
                  {product.reviewSummary.averageRating}
                  <span className="sr-only">out of 5 stars.</span>{' '}
                </>
              )}
              <span className="sr-only">Number of reviews:</span>(
              {product.reviewSummary.numberOfReviews})
            </div>
          </div>
        )}
        <div className="flex flex-wrap items-end justify-between pt-2">
          <ProductCardInfoPrice>
            <Pricing prices={product.prices} />
          </ProductCardInfoPrice>
        </div>
      </ProductCardInfo>
    </ComponentsProductCard>
  );
};
