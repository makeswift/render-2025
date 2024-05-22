import { PropsWithChildren, Suspense } from 'react';

import { Footer } from '~/components/footer/server';
import { Header } from '~/components/header/server';
import { ProductSheet } from '~/components/product-sheet';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="divide-y divide-black border border-black">{children}</main>
      <Suspense fallback={null}>
        <ProductSheet />
      </Suspense>
      <Footer />
    </>
  );
}
