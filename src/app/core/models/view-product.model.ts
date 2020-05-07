import { MixCategory } from './mix-category.model';
import { SaleItem } from './sale-item.model';

export interface ViewDetails {
  id?: string;
  description?: string;
  isInStock?: boolean;
  imageSrc?: string;
  discountPrice?: number;
  isOnSale?: boolean;
  sales?: SaleItem[];
  subtitle?: string;
  name?: string;
  isCustomProduct?: boolean;
}
