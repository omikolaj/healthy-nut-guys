import { schema } from 'normalizr';

const tag = new schema.Entity('tags');

const category = new schema.Entity('categories');

const sale = new schema.Entity('sales');

const productDetails = new schema.Entity('productDetails');

const product = new schema.Entity('products', {
  category: category,
  productDetails: [productDetails],
  tags: [tag],
  sales: [sale]
});

export const productsSchema = [product];
