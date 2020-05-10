import { CartState } from 'app/shared/store/state/cart.state';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product } from 'app/core/models/product.model';
import { Observable } from 'rxjs';
import { ShopState } from 'app/shared/store/state/shop.state';
import { CustomProduct } from 'app/core/models/custom-product.model';
import { ProductState } from 'app/shared/store/state/products.state';
import * as Cart from '../../shared/store/actions/cart.actions';
import { CartItem } from 'app/core/models/cart-item.model';
import { NotificationService } from 'app/core/core.module';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  @Select(ProductState.getProducts) products$: Observable<Product[]>;
  @Select(ProductState.getCustomProducts) customProducts$: Observable<CustomProduct[]>;
  get cartItems() {
    return this.store.selectSnapshot<CartItem[]>(CartState.getCartItems);
  }

  constructor(private store: Store, private notification: NotificationService) {}

  addCartItem(cartItem: CartItem): void {
    this.store.dispatch(new Cart.AddToCart(cartItem));
    this.notification.info(`${cartItem.selectOption.option} ${cartItem.title} added to cart`);
  }

  incrementCartItemQuantity(cartItem: CartItem): void {
    this.store.dispatch(new Cart.IncrementCartItemQuantity(cartItem.id));
    this.notification.info(`${cartItem.selectOption.option} ${cartItem.title} added to cart`);
  }
}
