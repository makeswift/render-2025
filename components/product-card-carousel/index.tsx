import { useId } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
  CarouselSlide,
} from '@bigcommerce/components/carousel';

import { Product, ProductCard } from '../product-card';

import { Pagination } from './pagination';

export const ProductCardCarousel = ({
  title,
  products,
  showCart = true,
  showCompare = true,
}: {
  title: string;
  products: Array<Partial<Product>>;
  showCart?: boolean;
  showCompare?: boolean;
}) => {
  const id = useId();

  if (products.length === 0) {
    return null;
  }

  const groupedProducts = products.reduce<Array<Array<Partial<Product>>>>((batches, _, index) => {
    if (index % 4 === 0) {
      batches.push([]);
    }

    const product = products[index];

    if (batches[batches.length - 1] && product) {
      batches[batches.length - 1]?.push(product);
    }

    return batches;
  }, []);

  return (
    <Carousel aria-labelledby="title">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold uppercase md:text-xl lg:text-2xl" id="title">
          {title}
        </h2>
        <span className="no-wrap flex">
          <CarouselPreviousIndicator />
          <CarouselNextIndicator />
        </span>
      </div>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselSlide
            aria-label={`${index + 1} of ${groupedProducts.length}`}
            id={`${id}-slide-${index + 1}`}
            index={index}
            key={index}
          >
            <ProductCard
              imageSize="square"
              key={product.entityId}
              product={product}
              showCart={showCart}
              showCompare={showCompare}
            />
          </CarouselSlide>
        ))}
      </CarouselContent>
      <Pagination groupedProducts={groupedProducts} id={id} />
    </Carousel>
  );
};
