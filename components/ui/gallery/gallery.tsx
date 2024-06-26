import { Slot } from '@radix-ui/react-slot';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  ComponentPropsWithRef,
  createContext,
  ElementRef,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';

import { cn } from '~/lib/utils';

interface Image {
  url: string;
  altText: string;
}

const GalleryContext = createContext<{
  images: Image[] | [];
  selectedImageIndex: number;
  setSelectedImageIndex: React.Dispatch<React.SetStateAction<number>>;
}>({
  images: [],
  selectedImageIndex: 0,
  setSelectedImageIndex: () => null,
});

const ThumbnailContext = createContext<{
  index: number;
}>({
  index: 0,
});

const GalleryPreviousIndicator = forwardRef<ElementRef<'button'>, ComponentPropsWithRef<'button'>>(
  ({ children, className, onClick, ...props }, ref) => {
    const { images, selectedImageIndex, setSelectedImageIndex } = useContext(GalleryContext);
    const previousIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;

    return (
      <button
        aria-label="Previous product image"
        className={cn(
          'group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue',
          className,
        )}
        onClick={(e) => {
          setSelectedImageIndex(previousIndex);

          if (onClick) {
            onClick(e);
          }
        }}
        ref={ref}
        {...props}
      >
        {children || (
          <ArrowLeft
            strokeWidth={2}
            absoluteStrokeWidth
            className="transition-transform group-hover:-translate-x-1.5"
          />
        )}
      </button>
    );
  },
);

GalleryPreviousIndicator.displayName = 'GalleryPreviousIndicator';

const GalleryNextIndicator = forwardRef<ElementRef<'button'>, ComponentPropsWithRef<'button'>>(
  ({ children, className, onClick, ...props }, ref) => {
    const { images, selectedImageIndex, setSelectedImageIndex } = useContext(GalleryContext);
    const nextIndex = selectedImageIndex + 1 < images.length ? selectedImageIndex + 1 : 0;

    return (
      <button
        aria-label="Next product image"
        className={cn(
          'group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue',
          className,
        )}
        onClick={(e) => {
          setSelectedImageIndex(nextIndex);

          if (onClick) {
            onClick(e);
          }
        }}
        ref={ref}
        {...props}
      >
        {children || (
          <ArrowRight
            strokeWidth={2}
            absoluteStrokeWidth
            className="transition-transform group-hover:translate-x-1.5"
          />
        )}
      </button>
    );
  },
);

GalleryNextIndicator.displayName = 'GalleryNextIndicator';

const GalleryControls = forwardRef<ElementRef<'div'>, ComponentPropsWithRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    const { images } = useContext(GalleryContext);

    if (images.length <= 1) {
      return null;
    }

    return (
      <div
        className={cn(
          'absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between md:inset-x-0',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children || (
          <>
            <GalleryPreviousIndicator />
            <GalleryNextIndicator />
          </>
        )}
      </div>
    );
  },
);

GalleryControls.displayName = 'GalleryControls';

interface GalleryImageProps extends Omit<ComponentPropsWithRef<'img'>, 'children'> {
  children?: (({ selectedImage }: { selectedImage?: Image }) => React.ReactNode) | React.ReactNode;
}

const GalleryImage = forwardRef<ElementRef<'img'>, GalleryImageProps>(
  ({ className, children, ...props }, ref) => {
    const { images, selectedImageIndex } = useContext(GalleryContext);
    const selectedImage = images.length > 0 ? images[selectedImageIndex] : undefined;

    if (typeof children === 'function') {
      return children({ selectedImage });
    }

    if (selectedImage) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={selectedImage.altText}
          className={cn('h-full w-full object-contain', className)}
          ref={ref}
          sizes="100vw"
          src={selectedImage.url}
          {...props}
        />
      );
    }
  },
);

GalleryImage.displayName = 'GalleryImage';

const GalleryContent = forwardRef<ElementRef<'figure'>, ComponentPropsWithRef<'figure'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <figure
        className={cn('relative aspect-square h-full max-h-[600px] w-full', className)}
        ref={ref}
        {...props}
      >
        {children}
      </figure>
    );
  },
);

GalleryContent.displayName = 'GalleryContent';

const GalleryThumbnailList = forwardRef<ElementRef<'nav'>, ComponentPropsWithRef<'nav'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <nav
        aria-label="Thumbnail navigation"
        className={cn('mt-2 flex w-full flex-wrap items-center justify-center gap-2', className)}
        ref={ref}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

GalleryThumbnailList.displayName = 'GalleryThumbnailList';

interface GalleryThumbnailItemProps extends ComponentPropsWithRef<'button'> {
  imageIndex: number;
}

const GalleryThumbnailItem = forwardRef<ElementRef<'button'>, GalleryThumbnailItemProps>(
  ({ className, children, imageIndex, onClick, ...props }, ref) => {
    const { selectedImageIndex, setSelectedImageIndex } = useContext(GalleryContext);
    const isActive = selectedImageIndex === imageIndex;

    return (
      <button
        aria-label="Enlarge product image"
        aria-pressed={isActive}
        className={cn(
          'inline-block h-16 w-16 flex-shrink-0 flex-grow-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue md:h-24 md:w-24',
          className,
        )}
        onClick={(e) => {
          setSelectedImageIndex(imageIndex);

          if (onClick) {
            onClick(e);
          }
        }}
        ref={ref}
        type="button"
        {...props}
      >
        <ThumbnailContext.Provider value={{ index: imageIndex }}>
          {children}
        </ThumbnailContext.Provider>
      </button>
    );
  },
);

GalleryThumbnailItem.displayName = 'GalleryThumbnailItem';

interface GalleryThumbnailProps extends ComponentPropsWithRef<'img'> {
  asChild?: boolean;
}

const GalleryThumbnail = forwardRef<ElementRef<'img'>, GalleryThumbnailProps>(
  ({ asChild, className, ...props }, ref) => {
    const { selectedImageIndex } = useContext(GalleryContext);
    const { index } = useContext(ThumbnailContext);

    const isActive = selectedImageIndex === index;

    const Comp = asChild ? Slot : 'img';

    return (
      <Comp
        className={cn(
          'flex cursor-pointer items-center justify-center border border-black/25 transition-colors hover:border-black',
          isActive && 'border-2 border-pink hover:border-pink',
          'h-full w-full object-contain',
          className,
        )}
        height={94}
        ref={ref}
        width={94}
        {...props}
      />
    );
  },
);

GalleryThumbnail.displayName = 'GalleryThumbnail';

interface GalleryProps extends ComponentPropsWithRef<'div'> {
  images: Image[] | [];
  defaultImageIndex?: number;
}

const Gallery = forwardRef<ElementRef<'div'>, GalleryProps>(
  ({ className, children, images, defaultImageIndex = 0, ...props }, ref) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(defaultImageIndex);

    useEffect(() => {
      setSelectedImageIndex(defaultImageIndex);
    }, [defaultImageIndex]);

    return (
      <GalleryContext.Provider value={{ images, selectedImageIndex, setSelectedImageIndex }}>
        <div aria-live="polite" className={cn(className)} ref={ref} {...props}>
          {children}
        </div>
      </GalleryContext.Provider>
    );
  },
);

Gallery.displayName = 'Gallery';

export {
  Gallery,
  GalleryThumbnail,
  GalleryThumbnailItem,
  GalleryThumbnailList,
  GalleryContent,
  GalleryImage,
  GalleryControls,
  GalleryNextIndicator,
  GalleryPreviousIndicator,
};
