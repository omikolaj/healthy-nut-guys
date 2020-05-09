import { ProductOption } from './product-option.model';

export interface CartItem {
  productId: string;
  imageSrc: string;
  title: string;
  selectOption: ProductOption;
  quantity?: number;
  itemPrice: number;
  isCustomProduct?: boolean;
  id?: string;
  totalPrice?: number;
}
