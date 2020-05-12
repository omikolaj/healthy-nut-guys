import { ApiPrefixInterceptor } from './core/http-interceptors/api-prefix.interceptor.service';
import { ShopState } from './shared/store/state/shop.state';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingSpinnerComponent } from './app/loading-spinner/loading-spinner.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MatBadgeModule } from '@angular/material/badge';
import { setRootInjector } from 'root-injector';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpStatusInterceptorService } from './core/http-interceptors/http-status.interceptor.service';
import { HttpStatusInterceptor } from './core/http-interceptors/http-status.interceptor';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from 'environments/environment';
import { CartState, CART_STATE_TOKEN } from './shared/store/state/cart.state';
import { AuthState, AUTH_STATE_TOKEN } from './core/auth/auth.state';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // material icon for shopping cart
    MatBadgeModule,
    MatProgressBarModule,

    // core
    CoreModule,

    // NGXS Store
    NgxsModule.forRoot([CartState, ShopState, AuthState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: true
      },
      compatibility: {
        strictContentSecurityPolicy: true
      }
    }),
    NgxsStoragePluginModule.forRoot({
      key: [CART_STATE_TOKEN, AUTH_STATE_TOKEN]
    }),

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent, LoadingSpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpStatusInterceptor,
      multi: true,
      deps: [HttpStatusInterceptorService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setRootInjector(injector);
  }
}
