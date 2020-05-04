import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import produce from 'immer';
import { CartItem } from 'app/core/models/cart-item.model';
import * as CartActions from '../actions/cart.actions';
import { CustomSack } from 'app/core/models/custom-sack.model';
import { MixCategory } from 'app/core/models/mix-category.model';
import { Ingredient } from 'app/core/models/ingredient.model';
import { CustomSackForm } from 'app/core/models/custom-sack-form.model';

export interface CustomSackStateModel {
  entities: {
    customSack: {
      [id: string]: CustomSack;
    };
    mixCategories: {
      [id: string]: MixCategory;
    };
    ingredients: {
      [id: string]: Ingredient;
    };
    customSackForm: CustomSackForm;
  };
}

@State<CustomSackStateModel>({
  name: 'customSack',
  defaults: {
    entities: {
      customSack: {},
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
export class CustomSackStateModel {
  constructor() {}
}
