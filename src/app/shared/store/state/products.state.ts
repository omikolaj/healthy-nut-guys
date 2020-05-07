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
import { CustomProduct } from 'app/core/models/custom-product.model';
import { CustomSackForm } from 'app/core/models/custom-sack-form.model';

export interface ProductsStateModel {
  entities: {
    products: {
      [key: string]: Product;
    };
    customProducts: {
      [id: string]: CustomProduct;
    };
    customSackForm: CustomSackForm;
    categories: {
      [key: string]: Category;
    };
  };
}

export const PRODUCTS_STATE_TOKEN = new StateToken<ProductsStateModel>('products');

@State<ProductsStateModel>({
  name: PRODUCTS_STATE_TOKEN,
  defaults: {
    entities: {
      products: {},
      customProducts: {},
      categories: {},
      customSackForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    }
  }
})
@Injectable()
export class ProductState {
  constructor() {}

  @Selector([PRODUCTS_STATE_TOKEN])
  static getProducts(state: ProductsStateModel): Product[] {
    return Object.values(state.entities.products);
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  static getCustomProducts(state: ProductsStateModel): CustomProduct[] {
    return Object.values(state.entities.customProducts);
  }

  @Action(Shop.InitializeProducts)
  populateProducts(ctx: StateContext<ProductsStateModel>, action: Shop.InitializeProducts): void {
    ctx.setState(
      produce((draft: ProductsStateModel) => {
        draft.entities.products = action.payload;
      })
    );
  }

  @Action(Shop.InitializeCustomProducts)
  populateCustomProducts(ctx: StateContext<ProductsStateModel>, action: Shop.InitializeCustomProducts): void {
    ctx.setState(
      produce((draft: ProductsStateModel) => {
        draft.entities.customProducts = action.payload;
      })
    );
  }

  @Action(Shop.InitializeCategories)
  populateCategories(ctx: StateContext<ProductsStateModel>, action: Shop.InitializeCategories): void {
    ctx.setState(
      produce((draft: ProductsStateModel) => {
        draft.entities.categories = action.payload;
      })
    );
  }
}
