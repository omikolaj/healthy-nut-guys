import { CartState } from 'app/shared/store/state/cart.state';
import { Store, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CartItem } from 'app/core/models/cart-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {
  @Select(CartState.getCartItems) cartItems$: Observable<CartItem[]>;

  constructor(private store: Store) {}
}
