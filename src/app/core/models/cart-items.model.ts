import { ItemDetails } from './item-details.model';

export interface CartItem extends ItemDetails {
  cartItemId: string;
}
