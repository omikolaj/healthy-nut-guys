import { SpecialOfferService } from './../../../shared/shop/special-offer.service';
import { NotificationService } from 'app/core/core.module';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { ShopServiceFacadeService } from 'app/core/shop/shop-service-facade.service';
import { filter, tap, take, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'thng-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [SpecialOfferService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = '../../../../assets/release-butler.png';
  unsubscribed$: Subject<void> = new Subject();

  constructor(private facade: ShopServiceFacadeService, private offer: SpecialOfferService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.facade.shopOffer$
      .pipe(
        takeUntil(this.unsubscribed$),
        filter(offer => offer !== null),
        tap(offer => console.log('offer: ', offer)),
        tap(offer => {
          const message = this.offer.determineOfferMessage(offer);
          this.notification.banner(message, 'Dismiss');
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribed$.next();
    this.unsubscribed$.complete();
  }
}
