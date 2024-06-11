import Image from 'next/image';

import { Button } from '@bigcommerce/components/button';
import {
  Slideshow,
  SlideshowAutoplayControl,
  SlideshowContent,
  SlideshowControls,
  SlideshowNextIndicator,
  SlideshowPagination,
  SlideshowPreviousIndicator,
  SlideshowSlide,
} from '@bigcommerce/components/slideshow';

const slides = [
  {
    title: 'Keep it Fuzzie',
    description:
      'Fuzzies Co. is here to bring warm and fuzzy vibes to tech with custom, vibrant illustrations',
    buttonText: 'Shop now',
    buttonLink: '/shop-all/?brand=38',
    image: '/images/hardwear-hero-1.jpeg',
    overlay: true,
  },
  {
    title: 'Never Slipping',
    description: 'Be sure to cop your never slipping',
    buttonText: 'Shop now',
    buttonLink: '/shop-all/?brand=38',
    image: '/images/hardwear-hero-3.webp',
    overlay: false,
  },
  {
    title: 'The New Silicon South',
    description: 'Silicon South Sweaters',
    buttonText: 'Shop now',
    buttonLink: '/shop-all',
    image: '/images/hardwear-hero-2.webp',
    overlay: true,
  },
  {
    title: 'Jersey of Champions',
    description: 'The Official RenderATL Jersey of 2024. Limited supplies while they last',
    buttonText: 'Shop now',
    buttonLink: '/render-championship-jersey-preorder/',
    image: '/images/hardwear-hero-4.webp',
    overlay: true,
  },
];

export const Hero = () => (
  <Slideshow className="bg-green">
    <SlideshowContent>
      {slides.map((slide, index) => (
        <SlideshowSlide key={index}>
          {slide.image && (
            <Image
              alt={slide.title}
              className="absolute inset-0 -z-20 object-cover"
              fill
              priority
              src={slide.image}
            />
          )}

          {slide.overlay && (
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/50" />
          )}

          <div className="max-w-2xl flex-1 place-content-end px-5 pb-20 pt-12 sm:px-8 sm:pb-14 md:px-10 lg:max-w-3xl">
            <h2 className="mb-3 font-header text-4xl font-semibold uppercase !leading-[1.1] tracking-wide text-white sm:text-5xl md:mb-5 lg:text-7xl">
              {slide.title}
            </h2>
            <p className="mb-5 text-lg font-light leading-normal text-white md:mb-8 md:text-xl">
              {slide.description}
            </p>
            <Button asChild className="w-fit">
              <a href={slide.buttonLink}>{slide.buttonText}</a>
            </Button>
          </div>
        </SlideshowSlide>
      ))}
    </SlideshowContent>
    <SlideshowControls>
      <SlideshowAutoplayControl />
      <SlideshowPreviousIndicator />
      <SlideshowPagination />
      <SlideshowNextIndicator />
    </SlideshowControls>
  </Slideshow>
);
