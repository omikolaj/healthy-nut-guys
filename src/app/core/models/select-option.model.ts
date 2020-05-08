import { ProductOption } from './product-option.model';

export interface SelectOption extends ProductOption {
  productDetailsId?: string;
}
