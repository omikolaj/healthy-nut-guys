import { CartItem } from 'app/core/models/cart-items.model';
import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import * as Cart from 'app/shared/store/actions/cart.actions';
import produce from 'immer';

export interface CartItemsStateModel {
  entities: {
    [id: string]: CartItem;
  };
}

@State<CartItemsStateModel>({
  name: 'cartItems',
  defaults: {
    entities: {}
  }
})
@Injectable()
export class CartItemsState {
  constructor() {}

  @Selector()
  static getCartItems(state: CartItemsStateModel): CartItem[] {
    return Object.values(state.entities) || [];
  }

  @Action(Cart.AddToCart)
  addToCart(ctx: StateContext<CartItemsStateModel>, action: Cart.AddToCart): void {
    ctx.setState(
      produce((draft: CartItemsStateModel) => {
        draft.entities[action.item.cartItemId] = action.item;
      })
    );
  }

  // @Action(Cart.IncrementQuantity)
  // incrementQuantity(ctx: StateContext<CartItemsStateModel>, action: Cart.IncrementQuantity): void {
  //   ctx.setState(
  //     produce((draft: CartItemsStateModel) => {
  //       draft.entities[action.itemId].quantity += 1;
  //     })
  //   );
  // }

  // @Action(Cart.DecrementQuantity)
  // decrementQuantity(ctx: StateContext<CartItemsStateModel>, action: Cart.DecrementQuantity): void {
  //   ctx.setState(
  //     produce((draft: CartItemsStateModel) => {
  //       draft.entities[action.itemId].quantity -= 1;
  //     })
  //   );
  // }
}
