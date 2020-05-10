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
import { CartState } from './shared/store/state/cart.state';

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
    NgxsModule.forRoot([CartState, ShopState], {
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
      key: CartState
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setRootInjector(injector);
  }
}
