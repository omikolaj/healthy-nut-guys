import { MixCategory } from 'app/core/models/mix-category.model';
import { UserSubscriptionMixCategoryIngredient } from './user-subscription-mix-category-ingredient.model';
export interface UserSubscriptionMixCategory {
  id?: string;
  mixCategory?: MixCategory;
  ingredients?: UserSubscriptionMixCategoryIngredient[];
}
