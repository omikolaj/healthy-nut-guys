import { CartItem } from 'app/core/models/cart-item.model';

export class AddToCart {
  static readonly type = '[Cart] AddToCart';
  constructor(public item: CartItem) {}
}
