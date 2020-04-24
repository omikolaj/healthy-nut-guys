import { ShopItemsState } from './../shared/store/state/shop-items.state';
import { Injectable } from '@angular/core';
import { ProductsAsyncService } from 'app/core/products/products-async.service';
import { Select, Store } from '@ngxs/store';
import { CartItemsState } from 'app/shared/store/state/cart-items.state';
import { CartItem } from 'app/core/models/cart-items.model';
import { Observable } from 'rxjs';
import * as Cart from '../shared/store/actions/cart.actions';
import { ItemDetails } from 'app/core/models/item-details.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturesFacadeService {
  @Select(CartItemsState.getCartItems) cartItems$: Observable<CartItem[]>;
  @Select(ShopItemsState.getItemDetailsById) itemDetailsByIdFN: Observable<(id: string) => ItemDetails>;
  constructor(private store: Store, private productsService: ProductsAsyncService) {}

  addToCart(cartItem: CartItem): void {
    this.store.dispatch(new Cart.AddToCart(cartItem));
  }
}
