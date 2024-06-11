import { getBestSellingProducts } from '~/client/queries/get-best-selling-products';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { Hero } from '~/components/hero';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import Image from 'next/image';
import Link from 'next/link';
import { link } from 'fs';

export default async function Home() {
  const [bestSellingProducts, featuredProducts] = await Promise.all([
    getBestSellingProducts({ imageWidth: 500, imageHeight: 500 }),
    getFeaturedProducts({ imageWidth: 500, imageHeight: 500 }),
  ]);

  const logos = [
    {
      alt: 'Hardwear',
      src: '/images/hardwear.svg',
      width: 120,
      link: '/render-hardwear/',
    },
    {
      alt: 'Dresscode',
      src: '/images/dresscode.svg',
      width: 100,
      link: 'dresscode',
    },
    {
      alt: 'Fuzzies',
      src: '/images/fuzzies.svg',
      width: 124,
      link: 'fuzzies',
    },
    {
      alt: 'Talley & Twine',
      src: '/images/talley-and-twine.svg',
      width: 160,
      link: 'talley-twine',
    },
  ];

  return (
    <>
      <Hero />

      <div className="grid h-auto w-full grid-cols-2 gap-[1px] bg-black md:h-36 md:grid-cols-4">
        {logos.map((logo, index) => (
          <Link className="w-full place-content-center bg-white p-8" href={logo.link}>
            <div className="w-full [&>div]:![position:unset]"></div>
            <Image
              key={index}
              alt={logo.alt}
              className="!relative mx-auto !h-[unset] !w-full object-contain"
              layout="fill"
              priority={true}
              src={logo.src}
              style={{ maxWidth: logo.width }}
            />
          </Link>
        ))}
      </div>

      <div className="">
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
