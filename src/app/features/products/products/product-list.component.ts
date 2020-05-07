import { Product } from 'app/core/models/product.model';
import { CustomProduct } from 'app/core/models/custom-product.model';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { ShopItem } from 'app/core/models/shop-item.model';
import { shopItems } from '../product-list.data';
import { map } from 'rxjs/operators';
import { ProductFacadeService } from '../product-facade.service';

@Component({
  selector: 'thng-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  productList$ = combineLatest([this.facade.products$, this.facade.customProducts$]).pipe(
    map(([products, customProducts]: [Product[], CustomProduct[]]) => {
      return [...products, ...customProducts] as Product[];
    })
  );

  constructor(private router: Router, private route: ActivatedRoute, private facade: ProductFacadeService) {}

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }

  onViewProductDetail(item: ShopItem): void {
    this.router.navigate([`${item.id}`], {
      relativeTo: this.route.parent
    });
  }
}
