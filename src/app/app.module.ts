import { ShopState } from './shared/store/state/shop.state';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingSpinnerComponent } from './app/loading-spinner/loading-spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MatBadgeModule } from '@angular/material/badge';
import { setRootInjector } from 'root-injector';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from 'environments/environment';
import { CartState, CART_STATE_TOKEN } from './shared/store/state/cart.state';
import { AuthState, AUTH_STATE_TOKEN } from './core/auth/auth.state';
import { ActingSpinnerComponent } from './app/acting-spinner/acting-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserState } from './shared/store/state/user.state';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // material icon for shopping cart
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    // core
    CoreModule,

    // NGXS Store
    NgxsModule.forRoot([CartState, ShopState, AuthState, UserState], {
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
  declarations: [AppComponent, LoadingSpinnerComponent, ActingSpinnerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setRootInjector(injector);
  }
}
