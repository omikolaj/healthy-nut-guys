import { ShopState } from '../../shared/store/state/shop.state';
import { tap, filter, take } from 'rxjs/operators';
import { Store, Selector, Select } from '@ngxs/store';
import { ShopAsyncService } from './shop-async.service';
import { Injectable } from '@angular/core';
import * as Shop from '../../shared/store/actions/shop.actions';
import { Observable } from 'rxjs';
import { SpecialOffer } from '../models/special-offer.model';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceFacadeService {
  @Select(ShopState.getShopOffer) shopOffer$: Observable<SpecialOffer>;

  constructor(private shopAsync: ShopAsyncService, private store: Store) {}

  getShopOffer(): void {
    this.shopAsync
      .fetchShopOffer()
      .pipe(
        take(1),
        filter(offer => offer !== null),
        tap(offer => this.store.dispatch(new Shop.AddShopOffer(offer)))
      )
      .subscribe();
  }
}
