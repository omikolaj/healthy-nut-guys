import { CustomProduct } from './../../core/models/custom-product.model';
import { NotificationService } from 'app/core/core.module';
import { catchError, map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ShopItem } from 'app/core/models/shop-item.model';
import { Observable, of, forkJoin } from 'rxjs';
import { ProductsAsyncService } from 'app/core/products/products-async.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngxs/store';
import * as Shop from '../../shared/store/actions/shop.actions';
import { productsSchema } from 'app/shared/store/state/schemas/products.schema';
import { normalize } from 'normalizr';
import { Product } from 'app/core/models/product.model';
import { customProductsSchema } from 'app/shared/store/state/schemas/custom-products.schema';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<[Product[], CustomProduct[]]> {
  constructor(
    private store: Store,
    private productService: ProductsAsyncService,
    private router: Router,
    private notification: NotificationService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): [Product[], CustomProduct[]] | Observable<[Product[], CustomProduct[]]> | Promise<[Product[], CustomProduct[]]> {
    return forkJoin(
      this.productService.fetchProducts().pipe(
        filter(pro => pro.length > 0),
        map((products: Product[]) => normalize(products, productsSchema)),
        tap(data => {
          this.store.dispatch([
            new Shop.InitializeProducts(data.entities['products']),
            new Shop.InitializeProductDetails(data.entities['productDetails']),
            new Shop.InitializeProductSales(data.entities['sales']),
            new Shop.InitializeProductTags(data.entities['tags'])
          ]);
        }),
        filter(data => Object.keys(data.entities['categories']).length > 0)
      ),
      this.productService.fetchCustomProducts().pipe(
        filter(customPro => customPro.length > 0),
        map((customProducts: CustomProduct[]) => normalize(customProducts, customProductsSchema)),
        tap(data => {
          this.store.dispatch([
            new Shop.InitializeCustomProducts(data.entities['products']),
            new Shop.InitializeMixCategories(data.entities['mixCategories']),
            new Shop.InitializeIngredients(data.entities['ingredients']),
            new Shop.InitializeCustomProductSales(data.entities['sales']),
            new Shop.InitializeCustomProductTags(data.entities['tags'])
          ]);
        }),
        filter(data => Object.keys(data.entities['categories']).length > 0)
      )
    ).pipe(
      // merge categories
      tap(data => this.store.dispatch([new Shop.InitializeCategories({ ...data[0].entities['categories'], ...data[1].entities['categories'] })])),
      catchError(err => {
        this.notification.error('Error occured. Please try again later');
        this.router.navigate(['']);
        return of(err);
      })
    );
  }
}
