import { SaleItem } from './sale-item.model';
import { SelectOption } from './select-option.model';
import { Tag } from './tag.model';
import { MixCategory } from './mix-category.model';
import { Category } from 'app/core/models/category.model';
import { CustomProductType } from './custom-product-type.enum';

export interface CustomProduct {
  id?: string;
  categoryId?: string;
  name?: string;
  description?: string;
  subtitle?: string;
  imageSrc?: string;
  type?: CustomProductType;
  price?: number;
  isOnSale?: boolean;
  sales?: SaleItem[];
  category?: Category;
  mixCategories?: MixCategory[];
  tags?: Tag[];
  selectOptions?: SelectOption[];
  isInStock?: boolean;
}
