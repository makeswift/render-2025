import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCategory } from '~/client/queries/get-category';
import { Link } from '~/components/link';
import { ProductCard } from '~/components/product-card';

import { Breadcrumbs } from '../../_components/breadcrumbs';
import { FacetedSearch } from '../../_components/faceted-search';
import { MobileSideNav } from '../../_components/mobile-side-nav';
import { SortBy } from '../../_components/sort-by';
import { SubCategories } from '../../_components/sub-categories';
import { fetchFacetedSearch } from '../../fetch-faceted-search';

interface Props {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryId = Number(params.slug);

  const category = await getCategory({
    categoryId,
  });

  const title = category?.name;

  return {
    title,
  };
}

export default async function Category({ params, searchParams }: Props) {
  const categoryId = Number(params.slug);
  const search = await fetchFacetedSearch({ ...searchParams, category: [params.slug] });

  // We will only need a partial of this query to fetch the category name and breadcrumbs.
  // The rest of the arguments are useless at this point.
  const category = await getCategory({
    categoryId,
  });

  if (!category) {
    return notFound();
  }

  const productsCollection = search.products;
  const products = productsCollection.items;
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
    <div>
      <Breadcrumbs breadcrumbs={category.breadcrumbs.items} category={category.name} />

      <div className="flex w-full flex-col flex-wrap items-center gap-4 border-b border-black px-4 pb-4 sm:px-6 md:flex-row lg:px-8 lg:pb-5">
        <div className="flex w-full flex-1 items-center justify-between md:w-auto">
          <h1 className="font-display text-xl font-bold uppercase md:mb-0 md:text-2xl lg:text-3xl">
            {category.name}
          </h1>
          <div className="flex-1 shrink-0 text-right text-sm">
            {/* TODO: Plural vs. singular items */}
            {productsCollection.collectionInfo?.totalItems} items
          </div>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <SortBy />
          <MobileSideNav>
            <FacetedSearch
              facets={search.facets.items}
              headingId="mobile-filter-heading"
              pageType="category"
            >
              <SubCategories categoryId={categoryId} />
            </FacetedSearch>
          </MobileSideNav>
        </div>
      </div>

      <div className="flex">
        <FacetedSearch
          facets={search.facets.items}
          headingId="desktop-filter-heading"
          pageType="category"
        >
          <SubCategories categoryId={categoryId} />
        </FacetedSearch>

        <section aria-labelledby="product-heading" className="flex-1">
          <h2 className="sr-only" id="product-heading">
            Products
          </h2>

          <div className="-mr-[1px] grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                imagePriority={index <= 3}
                imageSize="square"
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
              <Link href={`${category.path}?before=${String(startCursor)}`}>
                <span className="sr-only">Previous</span>
                <ArrowLeft aria-hidden="true" className="inline-block h-6 w-6" />
              </Link>
            ) : (
              <ArrowLeft aria-hidden="true" className="inline-block h-6 w-6 opacity-15" />
            )}

            {hasNextPage ? (
              <Link href={`${category.path}?after=${String(endCursor)}`}>
                <span className="sr-only">Next</span>
                <ArrowRight aria-hidden="true" className="inline-block h-6 w-6" />
              </Link>
            ) : (
              <ArrowRight aria-hidden="true" className="inline-block h-6 w-6 opacity-15" />
            )}
          </nav>
        </section>
      </div>
    </div>
  );
}

export const runtime = 'edge';
