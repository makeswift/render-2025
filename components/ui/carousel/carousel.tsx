import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  ComponentPropsWithRef,
  createContext,
  ElementRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { cn } from '~/lib/utils';
import { Button } from '../button';

const CarouselContext = createContext<UseEmblaCarouselType>([() => null, undefined]);

const Carousel = forwardRef<ElementRef<'section'>, ComponentPropsWithRef<'section'>>(
  ({ children, className, ...props }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 'auto' });

    return (
      <CarouselContext.Provider value={[emblaRef, emblaApi]}>
        <section
          aria-roledescription="carousel"
          className={cn('relative overflow-x-hidden pb-16', className)}
          ref={ref}
          {...props}
        >
          {children}
        </section>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = 'Carousel';

type ForwardedRef = ElementRef<'div'> | null;

const CarouselContent = forwardRef<ForwardedRef, ComponentPropsWithRef<'ul'>>(
  ({ children, className, ...props }, ref) => {
    const mutableRef = useRef<ForwardedRef>(null);
    const [emblaRef] = useContext(CarouselContext);

    useImperativeHandle<ForwardedRef, ForwardedRef>(ref, () => mutableRef.current, []);

    const refCallback = useCallback(
      (current: ForwardedRef) => {
        emblaRef(current);
        mutableRef.current = current;
      },
      [emblaRef],
    );

    return (
      <div ref={refCallback}>
        <ul aria-live="polite" className={cn('mt-5 flex lg:mt-8', className)} {...props}>
          {children}
        </ul>
      </div>
    );
  },
);

CarouselContent.displayName = 'CarouselContent';

interface CarouselSlideProps extends ComponentPropsWithRef<'li'> {
  index: number;
}

const CarouselSlide = forwardRef<ElementRef<'li'>, CarouselSlideProps>(
  ({ children, className, index, ...props }, ref) => {
    const [, emblaApi] = useContext(CarouselContext);
    const [slidesInView, setSlidesInView] = useState<number[]>([0]);

    useEffect(() => {
      if (!emblaApi) return;

      emblaApi.on('slidesInView', () => {
        setSlidesInView(emblaApi.slidesInView());
      });
    }, [emblaApi]);

    return (
      <li
        aria-roledescription="slide"
        className={cn(
          'min-w-0 shrink-0 grow-0 basis-full px-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
          className,
        )}
        ref={ref}
        role="tabpanel"
        {...props}
      >
        {children}
      </li>
    );
  },
);

CarouselSlide.displayName = 'CarouselSlide';

const CarouselPreviousIndicator = forwardRef<ElementRef<'button'>, ComponentPropsWithRef<'button'>>(
  ({ children, className, onClick, ...props }, ref) => {
    const [, emblaApi] = useContext(CarouselContext);
    const [isHidden, setIsHidden] = useState(false);

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    useEffect(() => {
      if (emblaApi) setIsHidden(emblaApi.scrollSnapList().length <= 1);
    }, [emblaApi]);

    return (
      <Button
        aria-label="Previous products"
        variant="subtle"
        className={cn(
          '!p-2.5 focus:outline-none focus:ring-2 focus-visible:ring-blue',
          isHidden && 'hidden',
          className,
        )}
        onClick={(e) => {
          scrollPrev();

          if (onClick) {
            onClick(e);
          }
        }}
        ref={ref}
        {...props}
      >
        {children || <ArrowLeft />}
      </Button>
    );
  },
);

CarouselPreviousIndicator.displayName = 'CarouselPreviousIndicator';

const CarouselNextIndicator = forwardRef<ElementRef<'button'>, ComponentPropsWithRef<'button'>>(
  ({ children, className, onClick, ...props }, ref) => {
    const [, emblaApi] = useContext(CarouselContext);
    const [isHidden, setIsHidden] = useState(false);

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
      if (emblaApi) setIsHidden(emblaApi.scrollSnapList().length <= 1);
    }, [emblaApi]);

    return (
      <button
        aria-label="Next products"
        className={cn(
          '!p-2.5 focus:outline-none focus:ring-2 focus-visible:ring-blue',
          isHidden && 'hidden',
          className,
        )}
        onClick={(e) => {
          scrollNext();

          if (onClick) {
            onClick(e);
          }
        }}
        ref={ref}
        {...props}
      >
        {children || <ArrowRight />}
      </button>
    );
  },
);

CarouselNextIndicator.displayName = 'CarouselNextIndicator';

interface CarouselPaginationProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  children?:
    | (({
        selectedIndex,
        scrollTo,
      }: {
        selectedIndex: number;
        scrollTo: (index: number) => void | undefined;
      }) => React.ReactNode)
    | React.ReactNode;
}

const CarouselPagination = forwardRef<ElementRef<'div'>, CarouselPaginationProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const [, emblaApi] = useContext(CarouselContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onInit = useCallback(() => {
      if (emblaApi) setScrollSnaps(emblaApi.scrollSnapList());
    }, [emblaApi]);

    const scrollTo = useCallback(
      (index: number) => emblaApi && emblaApi.scrollTo(index),
      [emblaApi],
    );

    const onSelect = useCallback(() => {
      if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;

      onInit();
      emblaApi.on('reInit', onInit);
      emblaApi.on('select', onSelect);
    }, [emblaApi, onInit, onSelect]);

    if (scrollSnaps.length <= 1) {
      return null;
    }

    if (typeof children === 'function') {
      return (
        <div
          aria-label="Slides"
          className={cn('no-wrap absolute bottom-0 flex w-full items-center justify-center gap-2')}
          ref={ref}
          role="tablist"
          {...props}
        >
          {children({ selectedIndex, scrollTo })}
        </div>
      );
    }

    return null;
  },
);

CarouselPagination.displayName = 'CarouselPagination';

interface CarouselPaginationTabProps extends ComponentPropsWithRef<'button'> {
  isSelected: boolean;
}

const CarouselPaginationTab = forwardRef<ElementRef<'button'>, CarouselPaginationTabProps>(
  ({ children, className, isSelected, ...props }, ref) => {
    return (
      <button
        aria-selected={isSelected}
        className={cn(
          "h-7 w-7 p-0.5 after:block after:h-0.5 after:w-full after:bg-gray-400 after:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue",
          isSelected && 'after:bg-black',
          className,
        )}
        ref={ref}
        role="tab"
        {...props}
      />
    );
  },
);

CarouselPaginationTab.displayName = 'CarouselPaginationTab';

export {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPreviousIndicator,
  CarouselNextIndicator,
  CarouselPagination,
  CarouselPaginationTab,
};
