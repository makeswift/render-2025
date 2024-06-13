import Image from 'next/image';
import Link from 'next/link';

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
            <Link href={logo.link} prefetch={true}>
              <Image
                alt={logo.alt}
                className="!relative mx-auto !h-[unset] !w-full object-contain"
                layout="fill"
                priority={true}
                src={logo.src}
                style={{ maxWidth: logo.width }}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-black py-9 text-center">
        <h2 className="mb-8 font-display text-lg font-bold uppercase text-white md:text-xl lg:text-2xl">
          Powered By
        </h2>
        <div className="mx-auto flex max-w-[98rem] flex-row items-center justify-evenly">
          <Link href="https://www.paypal.com/" target="_blank">
            <Image
              alt="PayPal Logo"
              className="!relative inline-block !h-[unset] max-w-[90px] object-contain brightness-0 invert md:max-w-[125px]"
              layout="fill"
              priority={true}
              src="/images/paypal_logo.png"
            />
          </Link>
          <Link href="https://www.catalyst.dev/" target="_blank">
            <Image
              alt="BigCommerce Logo"
              className="!relative inline-block !h-[unset] max-w-[95px] object-contain"
              layout="fill"
              priority={true}
              src="/images/bc_logo.png"
            />
          </Link>
          {/* <p className="invisible font-display text-3xl font-bold text-white md:visible">+</p> */}
          <Link href="https://www.obundle.com/" target="_blank">
            <Image
              alt="oBundle Logo"
              className="!relative inline-block !h-[unset] max-w-[85px] object-contain brightness-0 invert md:max-w-[110px]"
              layout="fill"
              priority={true}
              src="/images/oBundle_logo.png"
            />
          </Link>
        </div>
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
