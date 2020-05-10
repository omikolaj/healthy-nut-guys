import { CartItem } from 'app/core/models/cart-item.model';
import { CartItemQuantiy } from 'app/core/models/cart-tem-quantity.model';

export class AddToCart {
  static readonly type = '[Cart] AddToCart';
  constructor(public item: CartItem) {}
}

export class UpdateCartItemsQuantities {
  static readonly type = '[Cart] UpdateCartItemsQuantities';
  constructor(public payload: CartItemQuantiy[]) {}
}

export class IncrementCartItemQuantity {
  static readonly type = '[Cart] IncrementCartItemQuantity';
  constructor(public cartItemId: string) {}
}

export class UpdateSubtotal {
  static readonly type = '[Cart] UpdateSubtotal';
  constructor(public subtotal: string) {}
}

export class RemoveCartItem {
  static readonly type = '[Cart] RemoveCartItem';
  constructor(public payload: CartItem) {}
}
