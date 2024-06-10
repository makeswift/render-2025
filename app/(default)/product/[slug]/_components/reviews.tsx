import { Rating } from '@bigcommerce/components/rating';
import { getProductReviews } from '~/client/queries/get-product-reviews';

import { ProductReviewSchema } from './product-review-schema';

interface Props {
  productId: number;
}

export const Reviews = async ({ productId }: Props) => {
  const product = await getProductReviews(productId);
  const reviews = product?.reviews;

  if (!reviews) {
    return null;
  }

  return (
    <>
      <h3 className="mb-4 mt-8 font-display text-xs font-bold uppercase md:text-sm">
        Reviews
        {reviews.length > 0 && (
          <span className="ms-2 ps-1 font-normal opacity-50">
            <span className="sr-only">Count:</span>
            {reviews.length}
          </span>
        )}
      </h3>

      <ul className="space-y-4">
        {reviews.length === 0 ? (
          <p>This product hasn't been reviewed yet.</p>
        ) : (
          reviews.map((review) => {
            return (
              <li key={review.entityId}>
                <p className="text-blue-primary mb-3 flex flex-nowrap">
                  <Rating value={review.rating} />
                  <span className="sr-only">Rating: ${review.rating} out of 5 stars</span>
                </p>
                <h4 className="text-base font-semibold leading-relaxed">{review.title}</h4>
                <p className="mb-2 text-sm leading-relaxed opacity-50">
                  Posted by {review.author.name} on{' '}
                  {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
                    new Date(review.createdAt.utc),
                  )}
                </p>
                <p className="leading-relaxed">{review.text}</p>
              </li>
            );
          })
        )}
      </ul>
      {reviews.length > 0 && <ProductReviewSchema productId={productId} reviews={reviews} />}
    </>
  );
};
