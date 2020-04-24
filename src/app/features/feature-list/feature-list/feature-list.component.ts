import { FeaturesFacadeService } from './../../features-facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { Feature, features } from '../feature-list.data';
import { ShopItem } from 'app/core/models/shop-item.model';

@Component({
  selector: 'thng-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: ShopItem[] = features;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }

  onViewProductDetail(feature: ShopItem): void {
    this.router.navigate([`${feature.id}`], {
      relativeTo: this.route.parent
    });
  }
}
