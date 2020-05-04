import { Injectable } from '@angular/core';
import { ProductsAsyncService } from 'app/core/products/products-async.service';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { ItemDetails } from 'app/core/models/item-details.model';
import * as Cart from '../shared/store/actions/cart.actions';
import { CartItem } from 'app/core/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturesFacadeService {
  constructor(private store: Store, private productsService: ProductsAsyncService) {}

  addToCart(cartItem: CartItem): void {
    this.store.dispatch(new Cart.AddToCart(cartItem));
  }
}
