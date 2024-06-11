import { Counter } from '@bigcommerce/components/counter';
import { Label } from '@bigcommerce/components/label';

import { useProductFieldController } from '../use-product-form';

export const QuantityField = () => {
  const { field } = useProductFieldController({
    name: 'quantity',
    rules: { required: true, min: 1 },
    defaultValue: 1,
  });

  return (
    <div className="my-5 w-28">
      <Label className="sr-only" htmlFor="quantity">
        Quantity
      </Label>
      <Counter
        id="quantity"
        min={1}
        name={field.name}
        onChange={field.onChange}
        value={Number(field.value)}
      />
    </div>
  );
};
