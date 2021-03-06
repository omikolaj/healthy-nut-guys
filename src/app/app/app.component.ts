import { Router } from '@angular/router';
import { HttpStatusInterceptorService } from 'app/core/http-interceptors/http-status.interceptor.service';
import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

import { routeAnimations, LocalStorageService, selectSettingsStickyHeader, selectEffectiveTheme } from '../core/core.module';
import { actionSettingsChangeAnimationsPageDisabled } from '../core/settings/settings.actions';
import { Store as ngrxStore, select } from '@ngrx/store';
import { ShopServiceFacadeService } from '../core/shop/shop-service-facade.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.state';

@Component({
  selector: 'thng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  loading$ = this.httpStatusService.loading$;
  acting$ = this.httpStatusService.acting$;
  faFacebookF = faFacebookF;
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = '../../assets/healthy_nut_guys_logo.png';
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];
  navigation = [
    { link: 'about', label: 'thng.menu.about' },
    { link: 'products', label: 'thng.menu.shop' }
  ];
  navigationSideMenu = [...this.navigation, { link: 'cart', label: 'thng.menu.cart' }];

  isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  cartItemsQuantity$ = this.facade.cartItems$.pipe(map(cartItems => cartItems.map(c => c.quantity).reduce((a, b) => a + b, 0)));

  constructor(
    private router: Router,
    private ngrxStore: ngrxStore,
    private storageService: LocalStorageService,
    private httpStatusService: HttpStatusInterceptorService,
    private facade: ShopServiceFacadeService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.ngrxStore.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
    this.stickyHeader$ = this.ngrxStore.pipe(select(selectSettingsStickyHeader));
    // if commented back in don't forget to comment back in HTML template code for this
    // this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.ngrxStore.pipe(select(selectEffectiveTheme));

    // see if there are any shop offers
    this.facade.getShopOffer();
  }

  onLoginClick() {
    //this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    //this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    //this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  onDashboardClick(): void {
    const userId = this.facade.userId;
    this.router.navigate(['users', `${userId}`, 'dashboard']);
  }
}
