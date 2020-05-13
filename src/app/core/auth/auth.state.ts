import { Token } from './token.model';
import { StateToken, Selector, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as Auth from './auth.actions';
import produce from 'immer';
import { tap } from 'rxjs/operators';

export interface AuthStateModel {
  token: string | null;
  email: string | null;
  expiry_date: number | null;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: null,
    email: null,
    expiry_date: null
  }
})
@Injectable()
export class AuthState {
  constructor() {}

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state?.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state?.token;
  }

  @Selector()
  static isTokenValid(state: AuthStateModel): boolean {
    return true;
  }

  @Action(Auth.Login)
  login(ctx: StateContext<AuthStateModel>, action: Auth.Login) {
    ctx.setState(
      produce((draft: AuthStateModel) => {
        draft.token = action.payload.access_token;
        draft.email = action.payload.email;
        draft.expiry_date = action.payload.expire_date;
      })
    );
  }

  @Action(Auth.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState(
      produce((draft: AuthStateModel) => {
        draft.token = null;
        draft.email = null;
        draft.expiry_date = null;
      })
    );
  }
}
