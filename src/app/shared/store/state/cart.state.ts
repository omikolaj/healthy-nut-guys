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
  };
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    entities: {
      cartItems: {}
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
        draft.entities.cartItems[action.item.productId] = action.item;
      })
    );
  }
}
