import { StateToken, Selector, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as Auth from './auth.actions';
import produce from 'immer';

export interface AuthStateModel {
  token: string | null;
  username: string | null;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: null,
    username: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Auth.Login)
  login(ctx: StateContext<AuthStateModel>, action: Auth.Login) {
    ctx.setState(
      produce((draft: AuthStateModel) => {
        draft.token = action.payload.token;
        draft.username = action.payload.username;
      })
    );
  }

  @Action(Auth.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState(
      produce((draft: AuthStateModel) => {
        draft.token = null;
        draft.username = null;
      })
    );
  }
}
