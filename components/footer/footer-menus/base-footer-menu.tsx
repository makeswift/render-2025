import React, { ComponentPropsWithoutRef } from 'react';

import { FooterNavGroupList, FooterNavLink } from '@bigcommerce/components/footer';
import { Link } from '~/components/link';

interface Item {
  name: string;
  path: string;
}

interface Props {
  title: string;
  items: Item[];
}

export const BaseFooterMenu = ({
  title,
  items,
  ...props
}: Props & ComponentPropsWithoutRef<'div'>) => {
  return (
    <div {...props}>
      <h3 className="mb-4 font-display text-sm font-bold uppercase text-pink">{title}</h3>
      <FooterNavGroupList>
        {items.map((item) => (
          <FooterNavLink asChild key={item.path}>
            <Link href={item.path}>{item.name}</Link>
          </FooterNavLink>
        ))}
      </FooterNavGroupList>
    </div>
  );
};
