import { ProductOption } from './product-option.model';

export interface CustomSelectOption extends ProductOption {
  customProductId?: string;
  price?: number;
}
