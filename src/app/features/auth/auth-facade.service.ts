import { NotificationService } from './../../core/notifications/notification.service';
import { Router, Params } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthState } from 'app/core/auth/auth.state';
import { ApplicationUser } from 'app/core/auth/application-user.model';
import { AuthAsyncService } from 'app/core/auth/auth-async.service';
import { tap, catchError } from 'rxjs/operators';
import * as Auth from '../../core/auth/auth.actions';
import { LoggedIn } from 'app/core/auth/logged-in.model';
import { NEVER } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  constructor(private router: Router, private store: Store, private authAsync: AuthAsyncService, private notification: NotificationService) {}

  login(user: ApplicationUser): void {
    this.authAsync
      .login(user)
      .pipe(
        tap(token =>
          this.store.dispatch(new Auth.Login({ email: user.email, access_token: token.access_token, expire_date: token.expire_date } as LoggedIn))
        ),
        tap(token => {
          const payload = this.decodeJwt(token.access_token);
          this.router.navigate(['../users', `${payload['sub']}`, 'dashboard']);
        }),
        catchError(err => {
          if (err['status'] === 401) {
            this.notification.error('Email or password are incorrect');
          }
          return NEVER;
        })
      )
      .subscribe();
  }

  logout(): void {
    this.authAsync
      .logout()
      .pipe(
        tap(_ => this.store.dispatch(new Auth.Logout())),
        tap(_ => {
          this.notification.success("You've been logged out");
          this.router.navigate(['/about']);
        }),
        catchError(err => {
          this.router.navigate(['/about']);
          this.notification.success("You've been logged out");
          return NEVER;
        })
      )
      .subscribe();
  }

  private decodeJwt(jwt: string) {
    try {
      return jwt_decode(jwt);
    } catch (error) {
      return null;
    }
  }
}
