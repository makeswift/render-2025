'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectContent, SelectItem } from '@bigcommerce/components/select';

export function SortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams?.get('sort') ?? 'featured';

  const onSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams ?? '');

    params.set('sort', sortValue);

    return router.push(`${pathname ?? ''}?${params.toString()}`);
  };

  return (
    <Select
      aria-label="Sort by:"
      onValueChange={onSort}
      value={value}
      className="text-[11px] sm:text-xs"
    >
      <SelectContent>
        <SelectItem value="featured">Featured items</SelectItem>
        <SelectItem value="newest">Newest items</SelectItem>
        <SelectItem value="best_selling">Best selling</SelectItem>
        <SelectItem value="a_to_z">A to Z</SelectItem>
        <SelectItem value="z_to_a">Z to A</SelectItem>
        <SelectItem value="best_reviewed">By review</SelectItem>
        <SelectItem value="lowest_price">Price: ascending</SelectItem>
        <SelectItem value="highest_price">Price: descending</SelectItem>
        <SelectItem value="relevance">Relevance</SelectItem>
      </SelectContent>
    </Select>
  );
}
