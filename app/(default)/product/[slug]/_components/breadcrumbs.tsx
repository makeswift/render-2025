import { getProduct } from '~/client/queries/get-product';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';

interface Props {
  productId: number;
}

export const BreadCrumbs = async ({ productId }: Props) => {
  const product = await getProduct(productId);
  const category = product?.categories?.[0];

  if (!category) {
    return null;
  }

  return (
    <nav>
      <ul className="flex flex-wrap items-center px-3 py-4 sm:px-6 lg:px-8">
        {category.breadcrumbs.map((breadcrumb, i, arr) => {
          const isLast = arr.length - 1 === i;

          return (
            <li
              className={cn('p-1 ps-0 hover:text-pink', {
                'font-semibold': !isLast,
                'font-extrabold': isLast,
              })}
              key={breadcrumb.name}
            >
              <Link href="#">{breadcrumb.name}</Link>
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
