import { Category } from 'app/core/models/category.model';
import { SpecialOffer } from './special-offer.model';
import { ProductDetails } from './product-details.model';
import { Tag } from './tag.model';

export interface Product {
  id?: string;
  categoryId?: string;
  name?: string;
  description?: string;
  subtitle?: string;
  imageSrc?: string;
  price?: number;
  isOnSale?: boolean;
  sales?: SpecialOffer[];
  category?: Category;
  productDetails?: ProductDetails[];
  tags?: Tag[];
}
