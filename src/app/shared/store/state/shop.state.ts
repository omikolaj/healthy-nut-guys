import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext, StateToken } from '@ngxs/store';
import produce from 'immer';
import * as Shop from '../actions/shop.actions';

import { Product } from 'app/core/models/product.model';
import { ProductDetails } from 'app/core/models/product-details.model';
import { SpecialOffer } from 'app/core/models/special-offer.model';
import { Category } from 'app/core/models/category.model';
import { Tag } from 'app/core/models/tag.model';
import { SaleItem } from 'app/core/models/sale-item.model';

export interface ShopStateModel {
  entities: {
    products: {
      [key: string]: Product;
    };
    productDetails: {
      [key: string]: ProductDetails;
    };
    sales: {
      [key: string]: SaleItem;
    };
    categories: {
      [key: string]: Category;
    };
    tags: {
      [key: string]: Tag;
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
      sales: {},
      categories: {},
      tags: {},
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

  @Selector([SHOP_STATE_TOKEN])
  static getProducts(state: ShopStateModel): Product[] {
    return Object.values(state.entities.products);
  }

  @Action(Shop.InitializeProducts)
  populateProducts(ctx: StateContext<ShopStateModel>, action: Shop.InitializeProducts): void {
    ctx.setState(
      produce((draft: ShopStateModel) => {
        draft.entities.products = action.payload;
      })
    );
  }

  @Action(Shop.InitializeProductDetails)
  populateProductsDetails(ctx: StateContext<ShopStateModel>, action: Shop.InitializeProductDetails): void {
    ctx.setState(
      produce((draft: ShopStateModel) => {
        draft.entities.productDetails = action.payload;
      })
    );
  }

  @Action(Shop.InitializeProductSales)
  populateProductOffers(ctx: StateContext<ShopStateModel>, action: Shop.InitializeProductSales): void {
    ctx.setState(
      produce((draft: ShopStateModel) => {
        draft.entities.sales = action.payload;
      })
    );
  }

  @Action(Shop.InitializeCategories)
  populateCategories(ctx: StateContext<ShopStateModel>, action: Shop.InitializeCategories): void {
    ctx.setState(
      produce((draft: ShopStateModel) => {
        draft.entities.categories = action.payload;
      })
    );
  }

  @Action(Shop.InitializeProductTags)
  populateTags(ctx: StateContext<ShopStateModel>, action: Shop.InitializeProductTags): void {
    ctx.setState(
      produce((draft: ShopStateModel) => {
        draft.entities.tags = action.payload;
      })
    );
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
