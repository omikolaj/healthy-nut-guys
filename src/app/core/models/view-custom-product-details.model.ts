import { ViewProductDetails } from 'app/core/models/view-product-details.model';
import { MixCategory } from 'app/core/models/mix-category.model';
import { SaleItem } from './sale-item.model';
import { ProductDetails } from './product-details.model';
import { ViewDetails } from './view-product.model';
import { SelectOption } from './select-option.model';
import { CustomSelectOption } from './custom-select-option.model';
export interface ViewCustomProductDetails extends ViewDetails {
  mixCategories?: MixCategory[];
  selectOptions?: CustomSelectOption[];
}
