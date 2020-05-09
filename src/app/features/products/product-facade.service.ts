import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product } from 'app/core/models/product.model';
import { Observable } from 'rxjs';
import { ShopState } from 'app/shared/store/state/shop.state';
import { CustomProduct } from 'app/core/models/custom-product.model';
import { ProductState } from 'app/shared/store/state/products.state';
import * as Cart from '../../shared/store/actions/cart.actions';
import { CartItem } from 'app/core/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  @Select(ProductState.getProducts) products$: Observable<Product[]>;
  @Select(ProductState.getCustomProducts) customProducts$: Observable<CustomProduct[]>;
  constructor(private store: Store) {}

  addCartItem(cartItem: CartItem): void {
    this.store.dispatch(new Cart.AddToCart(cartItem));
  }
}
