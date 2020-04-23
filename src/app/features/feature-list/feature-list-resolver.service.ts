import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ShopItem } from 'app/core/models/shop-item.model';
import { Observable } from 'rxjs';
import { ProductsAsyncService } from 'app/core/products/products-async.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureListResolverService implements Resolve<ShopItem[]> {
  constructor(private productService: ProductsAsyncService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ShopItem[] | Observable<ShopItem[]> | Promise<ShopItem[]> {
    // dispatch an actiont o update the store once we have fetched items
    return this.productService.fetchShopItems();
  }
}
