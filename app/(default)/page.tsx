import Image from 'next/image';

import { getBestSellingProducts } from '~/client/queries/get-best-selling-products';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { Hero } from '~/components/hero';
import { ProductCardCarousel } from '~/components/product-card-carousel';

export default async function Home() {
  const [bestSellingProducts, featuredProducts] = await Promise.all([
    getBestSellingProducts({ imageWidth: 500, imageHeight: 500 }),
    getFeaturedProducts({ imageWidth: 500, imageHeight: 500 }),
  ]);

  const logos = [
    {
      alt: 'Hardwear',
      src: '/images/hardwear.svg',
      link: '/shop-all/?brand=39',
      width: 120,
    },
    {
      alt: 'Dresscode',
      src: '/images/dresscode.svg',
      link: '/shop-all/?brand=40',
      width: 100,
    },
    {
      alt: 'Fuzzies',
      src: '/images/fuzzies.svg',
      link: '/shop-all/?brand=38',
      width: 124,
    },
    {
      alt: 'Talley & Twine',
      src: '/images/talley-and-twine.svg',
      link: '/shop-all/?brand=41',
      width: 160,
    },
  ];

  return (
    <>
      <Hero />

      <div className="grid h-auto w-full grid-cols-2 gap-[1px] bg-black md:h-36 md:grid-cols-4">
        {logos.map((logo, index) => (
          <div className="w-full place-content-center bg-white p-8 " key={index}>
            <div className="w-full [&>div]:![position:unset]" />
            <a href={logo.link}>
              <Image
                alt={logo.alt}
                className="!relative mx-auto !h-[unset] !w-full object-contain"
                layout="fill"
                priority={true}
                src={logo.src}
                style={{ maxWidth: logo.width }}
              />
            </a>
          </div>
        ))}
      </div>

      <div className="p-5 md:p-8 lg:p-10">
        {/* <ProductCardCarousel
          products={bestSellingProducts}
          showCart={false}
          showCompare={false}
          title="Best Selling Products"
        /> */}

        <ProductCardCarousel
          products={featuredProducts}
          showCart={false}
          showCompare={false}
          title="Featured Products"
        />
      </div>
    </>
  );
}

export const runtime = 'edge';
