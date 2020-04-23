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

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // material icon for shopping cart
    MatBadgeModule,

    // core
    CoreModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
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
