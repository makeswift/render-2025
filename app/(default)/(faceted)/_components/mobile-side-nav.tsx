'use client';

import { ListFilter } from 'lucide-react';
import { PropsWithChildren, useEffect, useState } from 'react';

import { Button } from '@bigcommerce/components/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '@bigcommerce/components/sheet';

export const MobileSideNav = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [children]);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className="w-full !pl-3 sm:w-auto lg:hidden" variant="secondary">
          <ListFilter size={16} strokeWidth={2} absoluteStrokeWidth className="me-3 shrink-0" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetOverlay className="bg-transparent, backdrop-blur-none lg:hidden">
        <SheetContent className="lg:hidden">
          <SheetHeader>
            <SheetTitle asChild>
              <h2>Filters</h2>
            </SheetTitle>
            <SheetClose />
          </SheetHeader>
          {children}
        </SheetContent>
      </SheetOverlay>
    </Sheet>
  );
};
