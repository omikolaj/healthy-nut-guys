import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserSubscription } from 'app/core/models/user-subscription.model';
import { SubscriptionAsyncService } from 'app/core/user/subscription/subscription-async.service';
import { Store } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import * as User from '../../shared/store/actions/user.actions';
import { NEVER } from 'rxjs';
import { AuthState } from 'app/core/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<UserSubscription> {
  constructor(private store: Store, private subscriptionAsync: SubscriptionAsyncService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = this.store.selectSnapshot(AuthState.getUserId);
    console.log('userId', userId);
    return this.subscriptionAsync.getUserSubscription(userId).pipe(
      tap(sub => this.store.dispatch(new User.AddUserSubscription(sub))),
      catchError(err => {
        this.router.navigate(['/about']);
        return err;
      })
    );
  }
}
