import { NotificationService } from 'app/core/core.module';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ShopItem } from 'app/core/models/shop-item.model';
import { Observable, of } from 'rxjs';
import { ProductsAsyncService } from 'app/core/products/products-async.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngxs/store';
import * as Shop from '../../shared/store/actions/shop.actions';
import { productsSchema } from 'app/shared/store/state/schemas/products.schema';
import { normalize } from 'normalizr';
import { Product } from 'app/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<Product[]> {
  constructor(
    private store: Store,
    private productService: ProductsAsyncService,
    private router: Router,
    private notification: NotificationService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    // dispatch an actiont o update the store once we have fetched items
    return this.productService.fetchProducts().pipe(
      tap((products: Product[]) => {
        const normalizedData = normalize(products, productsSchema);
        console.log('normalizedData', normalizedData);
        this.store.dispatch([
          new Shop.InitializeProducts(normalizedData.entities['products']),
          new Shop.InitializeProductDetails(normalizedData.entities['productDetails']),
          new Shop.InitializeProductOffers(normalizedData.entities['productOffers']),
          new Shop.InitializeCategories(normalizedData.entities['categories']),
          new Shop.InitializeTags(normalizedData.entities['tags'])
        ]);
      }),
      catchError(err => {
        this.notification.error('Error occured. Please try again later');
        this.router.navigate(['']);
        return of([]);
      })
    );
  }
}
