import { shopItems, itemDetails } from './../../product-list.data';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';
import { ActivatedRoute } from '@angular/router';
import { FeaturesFacadeService } from 'app/features/features-facade.service';
import { CartItem } from 'app/core/models/cart-items.model';
import * as uuid from 'uuid';

@Component({
  selector: 'thng-product-detail-custom-sack',
  templateUrl: './product-detail-custom-sack.component.html',
  styleUrls: ['./product-detail-custom-sack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailCustomSackComponent implements OnInit {
  itemDetails: ItemDetails;
  constructor(private route: ActivatedRoute, private facade: FeaturesFacadeService) {}

  ngOnInit(): void {
    this.itemDetails = itemDetails.find(i => i.title.toLocaleLowerCase().includes('custom'));
  }

  onAddToCart(): void {
    const cartItem: CartItem = {
      ...this.itemDetails,
      cartItemId: uuid()
    };
    this.facade.addToCart(cartItem);
  }
}
