import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Product } from 'app/core/models/product.model';
import { Observable } from 'rxjs';
import { ShopState } from 'app/shared/store/state/shop.state';

@Injectable({
  providedIn: 'root'
})
export class ProductListFacadeService {
  @Select(ShopState.getProducts) products$: Observable<Product[]>;

  constructor() {}
}
