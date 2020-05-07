import { Ingredient } from 'app/core/models/ingredient.model';
export interface MixCategory {
  id?: string;
  customProductId?: string;
  inStock?: boolean;
  name?: string;
  ingredients?: Ingredient[];
}
