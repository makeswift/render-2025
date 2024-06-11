'use client';

import { ChevronDown, User } from 'lucide-react';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@bigcommerce/components/navigation-menu';
import { getCategoryTree } from '~/client/queries/get-category-tree';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';

type CategoryTree = Awaited<ReturnType<typeof getCategoryTree>>;

export const BaseHeaderNav = ({
  className,
  inCollapsedNav = false,
  categoryTree,
}: {
  className?: string;
  inCollapsedNav?: boolean;
  categoryTree: CategoryTree;
}) => {
  return (
    <>
      <NavigationMenuList
        className={cn(!inCollapsedNav && '', inCollapsedNav && 'flex-col items-start', className)}
      >
        {categoryTree.map((category) => (
          <NavigationMenuItem className={cn(inCollapsedNav && 'w-full')} key={category.path}>
            {category.children.length > 0 ? (
              <>
                <NavigationMenuTrigger className="gap-1">
                  <>
                    <NavigationMenuLink asChild>
                      <Link className="grow" href={category.path} prefetch={true}>
                        {category.name}
                      </Link>
                    </NavigationMenuLink>
                    <span className={cn(inCollapsedNav && 'p-3 lg:p-0 lg:pr-3')}>
                      <ChevronDown
                        size={16}
                        strokeWidth={2.5}
                        absoluteStrokeWidth={true}
                        aria-hidden="true"
                        className={cn(
                          '-translate-y-[1px] cursor-pointer transition duration-200 group-data-[state=open]/button:-rotate-180',
                        )}
                      />
                    </span>
                  </>
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={cn(
                    !inCollapsedNav && 'mx-auto flex max-w-3xl flex-row gap-20',
                    inCollapsedNav && 'ps-3',
                  )}
                >
                  {category.children.map((childCategory1) => (
                    <ul className={cn(inCollapsedNav && 'pb-4')} key={childCategory1.entityId}>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href={childCategory1.path}
                          className="font-display text-sm uppercase"
                        >
                          {childCategory1.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      {childCategory1.children.map((childCategory2) => (
                        <NavigationMenuItem key={childCategory2.entityId}>
                          <NavigationMenuLink
                            className="py-2 font-sans !text-base font-normal normal-case lg:!text-sm"
                            href={childCategory2.path}
                          >
                            {childCategory2.name}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </ul>
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link href={category.path} prefetch={true}>{category.name}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuList
        className={cn(
          'mt-4 border-t border-black/20 pt-4 lg:hidden',
          !inCollapsedNav && 'hidden',
          inCollapsedNav && 'flex-col items-start',
        )}
      >
        <NavigationMenuItem className={cn(inCollapsedNav && 'w-full')}>
          <NavigationMenuLink href="/login">
            Your Account <User />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </>
  );
};
