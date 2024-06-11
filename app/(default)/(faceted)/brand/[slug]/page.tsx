import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBrand } from '~/client/queries/get-brand';
import { Link } from '~/components/link';
import { ProductCard } from '~/components/product-card';

import { FacetedSearch } from '../../_components/faceted-search';
import { MobileSideNav } from '../../_components/mobile-side-nav';
import { SortBy } from '../../_components/sort-by';
import { fetchFacetedSearch } from '../../fetch-faceted-search';

interface Props {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brandId = Number(params.slug);

  const brand = await getBrand({
    brandId,
  });

  const title = brand?.name;

  return {
    title,
  };
}

export default async function Brand({ params, searchParams }: Props) {
  const brandId = Number(params.slug);

  const search = await fetchFacetedSearch({ ...searchParams, brand: [params.slug] });

  const brand = await getBrand({
    brandId,
  });

  if (!brand) {
    notFound();
  }

  const productsCollection = search.products;
  const products = productsCollection.items;
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
    <div>
      <div className="flex w-full flex-col flex-wrap items-center gap-4 border-b border-black px-4 py-4 sm:px-6 md:flex-row lg:px-8 lg:py-5">
        <div className="flex w-full flex-1 items-center justify-between md:w-auto">
          <h1 className="font-display text-xl font-bold uppercase md:mb-0 md:text-2xl lg:text-3xl">
            {brand.name}
          </h1>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <SortBy />
            <MobileSideNav>
              <FacetedSearch
                facets={search.facets.items}
                headingId="mobile-filter-heading"
                pageType="brand"
              />
            </MobileSideNav>
          </div>
        </div>
      </div>

      <div className="flex">
        <FacetedSearch
          className="mb-8 hidden lg:block"
          facets={search.facets.items}
          headingId="desktop-filter-heading"
          pageType="brand"
        />

        <section aria-labelledby="product-heading" className="flex-1">
          <h2 className="sr-only" id="product-heading">
            Products
          </h2>

          <div className="-mr-[1px] grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                imagePriority={index <= 3}
                imageSize="wide"
                key={product.entityId}
                product={product}
              />
            ))}
          </div>

          <nav
            aria-label="Pagination"
            className="-mt-[1px] space-x-3 border-t border-black bg-gray-200 py-4 text-center md:py-6"
          >
            {hasPreviousPage ? (
              <Link href={`${brand.path}?before=${String(startCursor)}`}>
                <span className="sr-only">Previous</span>
                <ChevronLeft aria-hidden="true" className="inline-block h-6 w-6" />
              </Link>
            ) : (
              <ChevronLeft aria-hidden="true" className="inline-block h-6 w-6 opacity-15" />
            )}

            {hasNextPage ? (
              <Link href={`${brand.path}?after=${String(endCursor)}`}>
                <span className="sr-only">Next</span>
                <ChevronRight aria-hidden="true" className="inline-block h-6 w-6" />
              </Link>
            ) : (
              <ChevronRight aria-hidden="true" className="inline-block h-6 w-6 opacity-15" />
            )}
          </nav>
        </section>
      </div>
    </div>
  );
}

export const runtime = 'edge';
