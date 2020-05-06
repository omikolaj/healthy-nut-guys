import { Category } from 'app/core/models/category.model';
import { schema } from 'normalizr';

const tag = new schema.Entity('tags');

const category = new schema.Entity('categories');

const sale = new schema.Entity('sales');

const ingredient = new schema.Entity('ingredients');

const mixCategory = new schema.Entity('mixCategories', {
  ingredients: [ingredient]
});

const product = new schema.Entity('products', {
  mixCategories: [mixCategory],
  sales: [sale],
  tags: [tag],
  category: category
});

export const customProductsSchema = [product];
