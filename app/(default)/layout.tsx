import { PropsWithChildren, Suspense } from 'react';

import { Footer } from '~/components/footer/server';
import { Header } from '~/components/header/server';
import { ProductSheet } from '~/components/product-sheet';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="divide-y divide-black border border-black bg-white">{children}</main>
      <Suspense fallback={null}>
        <ProductSheet />
      </Suspense>
      <Footer />
    </div>
  );
}
