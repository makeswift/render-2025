import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

const Footer = forwardRef<ElementRef<'footer'>, ComponentPropsWithRef<'footer'>>(
  ({ children, className, ...props }, ref) => (
    <footer className={cn('bg-black text-white', className)} ref={ref} {...props}>
      {children}
    </footer>
  ),
);

Footer.displayName = 'Footer';

const FooterSection = forwardRef<ElementRef<'section'>, ComponentPropsWithRef<'div'>>(
  ({ children, className, ...props }, ref) => (
    <section
      className={cn(
        'flex flex-col gap-x-10 gap-y-10 px-5 py-8 2xl:container sm:flex-row sm:px-6 md:py-10 lg:px-10 2xl:mx-auto 2xl:px-0',
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </section>
  ),
);

FooterSection.displayName = 'FooterSection';

const FooterNav = forwardRef<ElementRef<'nav'>, ComponentPropsWithRef<'nav'>>(
  ({ children, className, ...props }, ref) => (
    <nav
      aria-label="Footer navigation"
      className={cn('grid flex-auto auto-cols-fr gap-8 sm:grid-flow-col', className)}
      ref={ref}
      {...props}
    >
      {children}
    </nav>
  ),
);

FooterNav.displayName = 'FooterNav';

const FooterNavGroupList = forwardRef<ElementRef<'ul'>, ComponentPropsWithRef<'ul'>>(
  ({ children, className, ...props }, ref) => (
    <ul className={cn('flex flex-col gap-3', className)} ref={ref} {...props}>
      {children}
    </ul>
  ),
);

FooterNavGroupList.displayName = 'FooterNavGroupList';

interface FooterNavLinkProps extends ComponentPropsWithRef<'a'> {
  asChild?: boolean;
}

const FooterNavLink = forwardRef<ElementRef<'li'>, FooterNavLinkProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';

    return (
      <li ref={ref}>
        <Comp
          className={cn('text-sm opacity-70 transition-opacity hover:opacity-100', className)}
          {...props}
        >
          {children}
        </Comp>
      </li>
    );
  },
);

FooterNavLink.displayName = 'FooterNavLink';

export { Footer, FooterSection, FooterNav, FooterNavGroupList, FooterNavLink };
