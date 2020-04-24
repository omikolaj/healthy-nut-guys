import { CartItem } from './../../../core/models/cart-items.model';
import { ItemDetails } from 'app/core/models/item-details.model';

export class AddToCart {
  static readonly type = '[Cart] AddToCart';
  constructor(public item: CartItem) {}
}

export class RemoveFromCart {
  static readonly type = '[Cart] RemoveFromCart';
  constructor(public itemId: string) {}
}

export class IncrementQuantity {
  static readonly type = '[Cart] IncrementQuantity';
  constructor(public itemId: string) {}
}

export class DecrementQuantity {
  static readonly type = '[Cart] DecrementQuantity';
  constructor(public itemId: string) {}
}
