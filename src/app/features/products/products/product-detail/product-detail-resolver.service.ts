import { Injectable } from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsAsyncService } from 'app/core/products/products-async.service';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import * as Product from '../../../../shared/store/actions/shop.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<ItemDetails> {
  constructor(private productService: ProductsAsyncService, private router: Router, private store: Store) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ItemDetails | Observable<ItemDetails> | Promise<ItemDetails> {
    const itemId = route.paramMap.get('id');
    if (!itemId) {
      // handle error here
      this.router.navigate(['']);
      return of({});
    }
    // dispatch action to update store
    return this.productService.fetchItemDetails(itemId).pipe(
      tap((itemDetails: ItemDetails) => {
        this.store.dispatch(new Product.AddProductDetails(itemDetails));
      })
    );
  }
}
