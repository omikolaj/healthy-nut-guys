import { FeaturesFacadeService } from '../../features-facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { ShopItem } from 'app/core/models/shop-item.model';
import { shopItems } from '../product-list.data';

@Component({
  selector: 'thng-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  products: ShopItem[] = shopItems;

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
