import { Ingredient } from 'app/core/models/ingredient.model';
import { MixCategoryType } from './mix-category-type.enum';
export interface MixCategory {
  id?: string;
  customProductId?: string;
  inStock?: boolean;
  name?: string;
  ingredients?: Ingredient[];
  type?: MixCategoryType;
}
