import { ProductListFacadeService } from './../product-list-facade.service';
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
  productList$ = this.facade.products$;

  constructor(private router: Router, private route: ActivatedRoute, private facade: ProductListFacadeService) {}

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }

  onViewProductDetail(item: ShopItem): void {
    if (item.name.toLocaleLowerCase().includes('custom')) {
      // route to custom detail page
      this.router.navigate(['custom-sack'], { relativeTo: this.route.parent });
    } else {
      this.router.navigate([`${item.id}`], {
        relativeTo: this.route.parent
      });
    }
  }
}
