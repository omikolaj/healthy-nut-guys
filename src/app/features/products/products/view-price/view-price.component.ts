import { SpecialOffer } from 'app/core/models/special-offer.model';
import { Moment } from 'moment';
import { SaleItem } from 'app/core/models/sale-item.model';
import { Offer } from './../../../../core/models/offer.model';
import { ProductDetails } from 'app/core/models/product-details.model';
import { ViewCustomProductDetails } from 'app/core/models/view-custom-product-details.model';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ViewProductDetails } from 'app/core/models/view-product-details.model';
import { CustomSelectOption } from 'app/core/models/custom-select-option.model';
import { OfferType } from 'app/core/enum/offer-type.enum';
import { ViewSale } from 'app/core/models/view-sale.model';
import * as moment from 'moment';
import { ShopState } from 'app/shared/store/state/shop.state';
import { Observable } from 'rxjs';
import { Select, Selector } from '@ngxs/store';

@Component({
  selector: 'thng-view-price',
  templateUrl: './view-price.component.html',
  styleUrls: ['./view-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPriceComponent implements OnInit {
  @Select(ShopState.getShopOffer) shopOffer$: Observable<SpecialOffer>;
  @Input() itemSale: ViewSale;
  offerType = OfferType;
  context = { name: 'World' };
  moment = date => moment(date).format('L');
  constructor() {}

  ngOnInit(): void {
    console.log('sale', this.itemSale);
  }

  get isPercentOff(): boolean {
    if (this.itemSale) {
      return this.itemSale.sales.some(s => s.type === OfferType.PercentOff);
    }
  }

  get isAmountOff(): boolean {
    if (this.itemSale) {
      return this.itemSale.sales.some(s => s.type === OfferType.AmountOff);
    }
  }

  get isFreeShipping(): boolean {
    if (this.itemSale) {
      return this.itemSale.sales.some(s => s.type === OfferType.FreeShipping);
    }
  }
}
