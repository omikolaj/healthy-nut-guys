import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ShopItem } from 'app/core/models/shop-item.model';
import { Observable, of } from 'rxjs';
import { ProductsAsyncService } from 'app/core/products/products-async.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngxs/store';
import * as Product from '../../shared/store/actions/product.actions';
import { shopItemsSchema } from 'app/shared/store/state/schemas/shop-items.schema';
import { normalize } from 'normalizr';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<ShopItem[]> {
  constructor(private store: Store, private productService: ProductsAsyncService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ShopItem[] | Observable<ShopItem[]> | Promise<ShopItem[]> {
    // dispatch an actiont o update the store once we have fetched items
    return this.productService.fetchShopItems().pipe(
      tap((shopItems: ShopItem[]) => {
        const normalizedData = normalize(shopItems, shopItemsSchema);
        this.store.dispatch(new Product.InitializeProducts(normalizedData.entities['shopItems']));
      }),
      catchError(err => {
        this.router.navigate(['']);
        return of([]);
      })
    );
  }
}
