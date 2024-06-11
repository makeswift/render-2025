import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { Props as FacetProps, Facets } from './facets';
import { RefineBy, Props as RefineByProps } from './refine-by';

interface Props extends FacetProps, RefineByProps, ComponentPropsWithoutRef<'aside'> {
  headingId: string;
}

export const FacetedSearch = ({
  facets,
  headingId,
  pageType,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <aside
      aria-labelledby={headingId}
      {...props}
      className="hidden w-64 border-r border-black pl-4 pr-3 md:py-4 md:pl-5 md:pr-4 lg:block lg:py-5 lg:pl-7 lg:pr-6 xl:w-72 2xl:w-80"
    >
      <h2 className="sr-only" id={headingId}>
        Filters
      </h2>

      {children}

      <RefineBy facets={facets} pageType={pageType} />

      <Facets facets={facets} pageType={pageType} />
    </aside>
  );
};
