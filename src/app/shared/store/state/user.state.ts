import { UserSubscription } from './../../../core/models/user-subscription.model';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { ShopStateModel } from './shop.state';
import { Injectable } from '@angular/core';
import * as User from '../actions/user.actions';
import produce from 'immer';
export interface UserStateModel {
  entities: {
    subscription: UserSubscription | null;
  };
}

export const USER_STATE_TOKEN = new StateToken<UserStateModel>('user');

@State<UserStateModel>({
  name: USER_STATE_TOKEN,
  defaults: {
    entities: {
      subscription: null
    }
  }
})
@Injectable()
export class UserState {
  constructor() {}

  @Action(User.AddUserSubscription)
  addUserSubscription(ctx: StateContext<UserStateModel>, action: User.AddUserSubscription): void {
    ctx.setState(
      produce((draft: UserStateModel) => {
        draft.entities.subscription = action.payload;
      })
    );
  }
}
