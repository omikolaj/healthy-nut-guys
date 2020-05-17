import { LocalStorageService } from './../../core/local-storage/local-storage.service';
import { ApplicationUser } from './../../core/auth/application-user.model';
import { NotificationService } from './../../core/notifications/notification.service';
import { Router, Params, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthState } from 'app/core/auth/auth.state';
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
  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private authAsync: AuthAsyncService,
    private notification: NotificationService,
    private localStorage: LocalStorageService
  ) {}

  login(user: ApplicationUser): void {
    this.authAsync
      .login(user)
      .pipe(
        tap(token => {
          const payload = this.decodeJwt(token.access_token);
          this.store.dispatch(
            new Auth.Login({
              email: user.email,
              access_token: token.access_token,
              expire_date: token.expire_date,
              id: payload['sub']
            } as LoggedIn)
          );
        }),
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

  recoverPassword(email: string): void {
    this.authAsync
      .recoverPassword(email)
      .pipe(tap(_ => this.notification.infoExplicit('Please check your email for recovery link', 7000)))
      .subscribe();
  }

  resetPassword(newPassword: string): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const code = this.route.snapshot.queryParamMap.get('code');
    if (userId) {
      if (code) {
        this.authAsync
          .resetPassword(userId, code, newPassword)
          .pipe(
            tap(_ => this.notification.infoExplicit('Password successfully updated', 7000)),
            tap(_ => this.router.navigate(['auth/login'], { queryParams: { userId: null, code: null }, queryParamsHandling: 'merge' }))
          )
          .subscribe();
      }
    }
  }

  signUp(newUser: ApplicationUser): void {
    this.authAsync
      .signUp(newUser)
      .pipe(
        tap(token =>
          this.store.dispatch(new Auth.Login({ email: newUser.email, access_token: token.access_token, expire_date: token.expire_date } as LoggedIn))
        ),
        tap(token => {
          const payload = this.decodeJwt(token.access_token);
          this.router.navigate(['../users', `${payload['sub']}`, 'dashboard']);
        }),
        catchError(err => {
          this.notification.error('Error occured signing up');
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
        tap(_ => this.localStorage.removeItem('auth')),
        tap(_ => {
          this.notification.success("You've been logged out");
          this.router.navigate(['/about']);
        }),
        catchError(err => {
          this.localStorage.removeItem('auth');
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
