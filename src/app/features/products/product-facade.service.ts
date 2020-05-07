import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Product } from 'app/core/models/product.model';
import { Observable } from 'rxjs';
import { ShopState } from 'app/shared/store/state/shop.state';
import { CustomProduct } from 'app/core/models/custom-product.model';
import { ProductState } from 'app/shared/store/state/products.state';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  @Select(ProductState.getProducts) products$: Observable<Product[]>;
  @Select(ProductState.getCustomProducts) customProducts$: Observable<CustomProduct[]>;
  constructor() {}
}
