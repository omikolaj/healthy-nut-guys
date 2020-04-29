import { ShopItem } from 'app/core/models/shop-item.model';
import { Injectable } from '@angular/core';
import { Action, StateContext, State, Selector } from '@ngxs/store';
import * as Product from '../actions/product.actions';
import produce from 'immer';
import { ItemDetails } from 'app/core/models/item-details.model';

export interface ShopItemsStateModel {
  entities: {
    shopItems: {
      [id: string]: ShopItem;
    };
    shopItemsDetails: {
      [id: string]: ItemDetails;
    };
  };
}

@State<ShopItemsStateModel>({
  name: 'shopItems',
  defaults: {
    entities: {
      shopItems: {},
      shopItemsDetails: {}
    }
  }
})
@Injectable()
export class ShopItemsState {
  constructor() {}

  @Selector()
  static getItemDetailsById(state: ShopItemsStateModel): (id: string) => ItemDetails {
    return (id: string): ItemDetails => {
      return Object.values(state.entities.shopItemsDetails).find(item => item.id === id);
    };
  }

  @Action(Product.InitializeProducts)
  initializeProducts(ctx: StateContext<ShopItemsStateModel>, action: Product.InitializeProducts): void {
    if (action.products) {
      ctx.setState(
        produce((draft: ShopItemsStateModel) => {
          draft.entities.shopItems = action.products;
        })
      );
    }
  }

  // Adds fetched product details to the store
  @Action(Product.AddProductDetails)
  addProductDetails(ctx: StateContext<ShopItemsStateModel>, action: Product.AddProductDetails): void {
    if (action.productDetails) {
      ctx.setState(
        produce((draft: ShopItemsStateModel) => {
          draft.entities.shopItemsDetails[action.productDetails.id] = action.productDetails;
        })
      );
    }
  }
}
