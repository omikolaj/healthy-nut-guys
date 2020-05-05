import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import produce from 'immer';
import * as Shop from '../actions/shop.actions';

import { Product } from 'app/core/models/product.model';
import { ProductDetails } from 'app/core/models/product-details.model';
import { ProductOffer } from 'app/core/models/product-offer.model';
import { ShopOffer } from 'app/core/models/shop-offer.model';

export interface ShopStateModel {
  entities: {
    products: {
      [key: string]: Product;
    };
    productDetails: {
      [key: string]: ProductDetails;
    };
    productOffers: {
      [key: string]: ProductOffer;
    };
    shopOffer: {
      [key: string]: ShopOffer;
    };
  };
}

@State<ShopStateModel>({
  name: 'shop',
  defaults: {
    entities: {
      products: {},
      productDetails: {},
      productOffers: {},
      shopOffer: {}
    }
  }
})
@Injectable()
export class ShopState {
  constructor() {}

  @Action(Shop.AddShopOffer)
  addShopOffer(ctx: StateContext<ShopStateModel>, action: Shop.AddShopOffer): void {
    ctx.setState(
      produce((draft: ShopStateModel) => {
        draft.entities.shopOffer[action.payload.id] = action.payload;
      })
    );
  }
}
