import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/auth.state';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    let req = null;
    if (isAuthenticated === true) {
      req = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
    }
    return next.handle(isAuthenticated === true ? req : request);
  }
}
