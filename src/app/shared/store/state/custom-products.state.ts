import { CustomProduct } from '../../../core/models/custom-product.model';
import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext, StateToken } from '@ngxs/store';
import produce from 'immer';
import { CartItem } from 'app/core/models/cart-item.model';
import * as CartActions from '../actions/cart.actions';
import { MixCategory } from 'app/core/models/mix-category.model';
import { Ingredient } from 'app/core/models/ingredient.model';
import { CustomSackForm } from 'app/core/models/custom-sack-form.model';
import { Category } from 'app/core/models/category.model';
import { SpecialOffer } from 'app/core/models/special-offer.model';
import * as Shop from '../actions/shop.actions';
import { Tag } from 'app/core/models/tag.model';
import { SaleItem } from 'app/core/models/sale-item.model';

export interface CustomProductStateModel {
  entities: {
    customProducts: {
      [id: string]: CustomProduct;
    };
    sales: {
      [key: string]: SaleItem;
    };
    mixCategories: {
      [id: string]: MixCategory;
    };
    tags: {
      [key: string]: Tag;
    };
    ingredients: {
      [id: string]: Ingredient;
    };
    customSackForm: CustomSackForm;
  };
}

export const CUSTOM_PRODUCTS_STATE_TOKEN = new StateToken<CustomProductStateModel>('customProducts');

@State<CustomProductStateModel>({
  name: CUSTOM_PRODUCTS_STATE_TOKEN,
  defaults: {
    entities: {
      customProducts: {},
      tags: {},
      sales: {},
      mixCategories: {},
      ingredients: {},
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
export class CustomProductState {
  constructor() {}

  @Action(Shop.InitializeCustomProducts)
  populateCustomProducts(ctx: StateContext<CustomProductStateModel>, action: Shop.InitializeCustomProducts): void {
    ctx.setState(
      produce((draft: CustomProductStateModel) => {
        draft.entities.customProducts = action.payload;
      })
    );
  }

  @Action(Shop.InitializeMixCategories)
  populateMixCategories(ctx: StateContext<CustomProductStateModel>, action: Shop.InitializeMixCategories): void {
    ctx.setState(
      produce((draft: CustomProductStateModel) => {
        draft.entities.mixCategories = action.payload;
      })
    );
  }

  @Action(Shop.InitializeIngredients)
  populateIngredients(ctx: StateContext<CustomProductStateModel>, action: Shop.InitializeIngredients): void {
    ctx.setState(
      produce((draft: CustomProductStateModel) => {
        draft.entities.ingredients = action.payload;
      })
    );
  }

  @Action(Shop.InitializeCustomProductTags)
  populateTags(ctx: StateContext<CustomProductStateModel>, action: Shop.InitializeCustomProductTags): void {
    ctx.setState(
      produce((draft: CustomProductStateModel) => {
        draft.entities.tags = action.payload;
      })
    );
  }

  @Action(Shop.InitializeCustomProductSales)
  populateCustomProductOffers(ctx: StateContext<CustomProductStateModel>, action: Shop.InitializeCustomProductSales): void {
    ctx.setState(
      produce((draft: CustomProductStateModel) => {
        draft.entities.sales = action.payload;
      })
    );
  }
}
