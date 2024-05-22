import { getBestSellingProducts } from '~/client/queries/get-best-selling-products';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { Hero } from '~/components/hero';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import Image from 'next/image';

export default async function Home() {
  const [bestSellingProducts, featuredProducts] = await Promise.all([
    getBestSellingProducts({ imageWidth: 500, imageHeight: 500 }),
    getFeaturedProducts({ imageWidth: 500, imageHeight: 500 }),
  ]);

  const logos = [
    {
      alt: 'Talley & Twine',
      src: '/images/talley-and-twine.svg',
      width: 160,
      height: 24,
    },
    {
      alt: 'Talley & Twine',
      src: '/images/talley-and-twine.svg',
      width: 160,
      height: 24,
    },
    {
      alt: 'Talley & Twine',
      src: '/images/talley-and-twine.svg',
      width: 160,
      height: 24,
    },
    {
      alt: 'Talley & Twine',
      src: '/images/talley-and-twine.svg',
      width: 160,
      height: 24,
    },
  ];

  return (
    <>
      <Hero />

      <div className="flex h-36 w-full divide-x divide-black bg-white">
        {logos.map((logo, index) => (
          <div className="w-full place-content-center p-8 ">
            <Image
              key={index}
              alt={logo.alt}
              className="mx-auto object-contain"
              width={logo.width}
              height={logo.height}
              priority={true}
              src={logo.src}
            />
          </div>
        ))}
      </div>

      <div className="p-5 md:p-8 lg:p-10">
        <ProductCardCarousel
          products={bestSellingProducts}
          showCart={false}
          showCompare={false}
          title="Best Selling Products"
        />

        {/* <ProductCardCarousel
          products={featuredProducts}
          showCart={false}
          showCompare={false}
          title="Featured Products"
        /> */}
      </div>
    </>
  );
}

export const runtime = 'edge';
