import { Token } from './token.model';
import { AuthService } from './auth.service';
import { StateToken, Selector, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as Auth from './auth.actions';
import produce from 'immer';
import { tap } from 'rxjs/operators';

export interface AuthStateModel {
  token: string | null;
  username: string | null;
  expiry_date: number | null;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: null,
    username: null,
    expiry_date: null
  }
})
@Injectable()
export class AuthState {
  constructor(public auth: AuthService) {}

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static isTokenValid(state: AuthStateModel): boolean {
    return true;
  }

  @Action(Auth.Login)
  login(ctx: StateContext<AuthStateModel>, action: Auth.Login) {
    return this.auth.login(action.payload).pipe(
      tap((token: Token) => {
        ctx.setState(
          produce((draft: AuthStateModel) => {
            draft.token = token.access_token;
            draft.username = action.payload.username;
            draft.expiry_date = token.expire_date;
          })
        );
      })
    );
  }

  @Action(Auth.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.auth.logout().pipe(
      tap(() => {
        ctx.setState(
          produce((draft: AuthStateModel) => {
            draft.token = null;
            draft.username = null;
            draft.expiry_date = null;
          })
        );
      })
    );
  }
}
