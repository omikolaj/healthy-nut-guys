import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import produce from 'immer';
import { CartItem } from 'app/core/models/cart-item.model';
import * as CartActions from '../actions/cart.actions';

export interface CartStateModel {
  entities: {
    cartItems: {
      [id: string]: CartItem;
    };
    subtotal: string;
  };
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    entities: {
      cartItems: {},
      subtotal: '0.0'
    }
  }
})
@Injectable()
export class CartState {
  constructor() {}

  @Selector()
  static getCartItems(state: CartStateModel) {
    return Object.values(state.entities.cartItems);
  }

  @Action(CartActions.AddToCart)
  addItemToCart(ctx: StateContext<CartStateModel>, action: CartActions.AddToCart): void {
    ctx.setState(
      produce((draft: CartStateModel) => {
        draft.entities.cartItems[action.item.id] = action.item;
      })
    );
  }

  @Action(CartActions.UpdateCartItemsQuantities)
  updateCartItemsQuantities(ctx: StateContext<CartStateModel>, action: CartActions.UpdateCartItemsQuantities): void {
    ctx.setState(
      produce((draft: CartStateModel) => {
        action.payload.map(cartQuantity => {
          draft.entities.cartItems[cartQuantity.cartItemId].quantity = parseInt(cartQuantity.quantity);
        });
      })
    );
  }

  @Action(CartActions.IncrementCartItemQuantity)
  updateCartItemQuantity(ctx: StateContext<CartStateModel>, action: CartActions.IncrementCartItemQuantity): void {
    ctx.setState(
      produce((draft: CartStateModel) => {
        draft.entities.cartItems[action.cartItemId].quantity += 1;
      })
    );
  }

  @Action(CartActions.UpdateSubtotal)
  updateSubtotal(ctx: StateContext<CartStateModel>, action: CartActions.UpdateSubtotal): void {
    ctx.setState(
      produce((draft: CartStateModel) => {
        draft.entities.subtotal = action.subtotal;
      })
    );
  }

  @Action(CartActions.RemoveCartItem)
  removeCartItem(ctx: StateContext<CartStateModel>, action: CartActions.RemoveCartItem): void {
    ctx.setState(
      produce((draft: CartStateModel) => {
        delete draft.entities.cartItems[action.payload.id];
      })
    );
  }
}
