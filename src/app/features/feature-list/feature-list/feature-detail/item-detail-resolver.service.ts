import { Injectable } from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsAsyncService } from 'app/core/products/products-async.service';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailResolverService implements Resolve<ItemDetails> {
  constructor(private productService: ProductsAsyncService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ItemDetails | Observable<ItemDetails> | Promise<ItemDetails> {
    const itemId = route.paramMap.get('id');
    if (!itemId) {
      // handle error here
    }
    // dispatch action to update store
    return this.productService.fetchItemDetails(itemId);
  }
}
