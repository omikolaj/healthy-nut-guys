import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext, StateToken } from '@ngxs/store';
import produce from 'immer';
import * as Shop from '../actions/shop.actions';

import { Product } from 'app/core/models/product.model';
import { ProductDetails } from 'app/core/models/product-details.model';
import { SpecialOffer } from 'app/core/models/special-offer.model';

export interface ShopStateModel {
  entities: {
    products: {
      [key: string]: Product;
    };
    productDetails: {
      [key: string]: ProductDetails;
    };
    productOffers: {
      [key: string]: SpecialOffer;
    };
    shopOffer: {
      [key: string]: SpecialOffer;
    };
  };
}

export const SHOP_STATE_TOKEN = new StateToken<ShopStateModel>('shop');

@State<ShopStateModel>({
  name: SHOP_STATE_TOKEN,
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

  @Selector([SHOP_STATE_TOKEN])
  static getShopOffer(state: ShopStateModel): SpecialOffer | null {
    return Object.values(state.entities.shopOffer)[0] || null;
  }

  @Action(Shop.AddShopOffer)
  addShopOffer(ctx: StateContext<ShopStateModel>, action: Shop.AddShopOffer): void {
    ctx.setState(
      produce((draft: ShopStateModel) => {
        draft.entities.shopOffer[action.payload.id] = action.payload;
      })
    );
  }
}
