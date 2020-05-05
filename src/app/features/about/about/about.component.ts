import { AboutFacadeService } from './../about-facade.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'thng-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = '../../../../assets/release-butler.png';

  constructor(private facade: AboutFacadeService) {}

  ngOnInit() {
    this.facade.getShopOffer();
  }
}
