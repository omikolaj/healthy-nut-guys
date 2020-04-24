import { CartItemsState } from './../shared/store/state/cart-items.state';
import { HttpStatusInterceptorService } from 'app/core/http-interceptors/http-status.interceptor.service';
import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../core/core.module';
import { actionSettingsChangeAnimationsPageDisabled, actionSettingsChangeLanguage } from '../core/settings/settings.actions';
import { Loading } from 'app/core/decorators/loading.decorator';
import { CartItem } from 'app/core/models/cart-items.model';
import { Select } from '@ngxs/store';

@Component({
  selector: 'thng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  loading$ = this.httpStatusService.loading$;
  faFacebookF = faFacebookF;
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = '../../assets/healthy_nut_guys_logo.png';
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];
  navigation = [
    { link: 'about', label: 'thng.menu.about' },
    { link: 'feature-list', label: 'thng.menu.shop' }
  ];
  navigationSideMenu = [...this.navigation, { link: 'cart', label: 'thng.menu.cart' }];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  @Select(CartItemsState.getCartItems) cartItems$: Observable<CartItem[]>;

  constructor(private store: Store, private storageService: LocalStorageService, private httpStatusService: HttpStatusInterceptorService) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    // if commented back in don't forget to comment back in HTML template code for this
    // this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
