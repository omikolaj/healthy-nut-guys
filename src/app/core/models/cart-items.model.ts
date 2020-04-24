import { ItemDetails } from 'app/core/models/item-details.model';
export interface CartItem extends ItemDetails {
  quantity?: number;
}
