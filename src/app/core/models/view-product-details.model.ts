import { MixCategory } from 'app/core/models/mix-category.model';
import { SaleItem } from './sale-item.model';
import { ProductDetails } from './product-details.model';
import { ViewDetails } from './view-product.model';
export interface ViewProductDetails extends ViewDetails {
  productDetails?: ProductDetails[];
  labelSrc?: string;
}
