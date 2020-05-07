import { schema } from 'normalizr';

const category = new schema.Entity('categories');
const product = new schema.Entity('products', {
  category: category
});

export const productsSchema = [product];
