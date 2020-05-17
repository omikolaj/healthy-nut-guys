import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoginPasswordResetService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (route.queryParamMap.get('userId') && route.queryParamMap.get('code')) {
      console.log('route', route.queryParamMap.get('userId'));
      this.router.navigate(['auth/password-reset'], {
        queryParams: { userId: route.queryParamMap.get('userId'), code: route.queryParamMap.get('code') }
      });
    }

    return true;
  }
}
