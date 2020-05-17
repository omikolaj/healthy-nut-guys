import { Product } from 'app/core/models/product.model';
import { SelectOption } from 'app/core/models/select-option.model';
import { CustomProduct } from 'app/core/models/custom-product.model';
import { CustomSelectOption } from 'app/core/models/custom-select-option.model';
import { UserSubscriptionMixCategory } from './user-subscription-mix-category.model';
export interface UserSubscriptionProduct {
  id?: string;
  customSelectOption?: CustomSelectOption;
  customProduct?: CustomProduct;
  selectOption?: SelectOption;
  product?: Product;
  subscriptionMixCategories?: UserSubscriptionMixCategory[];
}
