import { NotificationService } from './../../core/notifications/notification.service';
import { CartItemQuantiy } from 'app/core/models/cart-tem-quantity.model';
import { CartService } from './cart.service';
import { CartState } from 'app/shared/store/state/cart.state';
import { Store, Select, ofActionSuccessful, Actions } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CartItem } from 'app/core/models/cart-item.model';
import { Observable } from 'rxjs';
import { map, tap, last, filter } from 'rxjs/operators';
import * as CartActions from '../../shared/store/actions/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {
  cartItems$: Observable<{ subtotal: string; items: CartItem[] }> = this.store.select(CartState.getCartItems).pipe(
    map(cartItems => this.cartService.setTotalPriceOnEachItem(cartItems)),
    map(cartItems => this.cartService.setSubtotalPrice(cartItems))
  );

  constructor(private store: Store, private cartService: CartService, private notification: NotificationService) {}

  updateCartItemsQuantities(itemsQuantities: CartItemQuantiy[]): void {
    this.store.dispatch(new CartActions.UpdateCartItemsQuantities(itemsQuantities));
    this.notification.info('Cart quantity updated');
  }

  removeCartItem(cartItem: CartItem): void {
    this.store.dispatch(new CartActions.RemoveCartItem(cartItem));
  }
}
