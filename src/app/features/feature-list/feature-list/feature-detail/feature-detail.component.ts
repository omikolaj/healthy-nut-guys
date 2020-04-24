import { CartItemsState } from './../../../../shared/store/state/cart-items.state';
import { itemDetails } from './../../feature-list.data';
import { FeaturesFacadeService } from './../../../features-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartItem } from 'app/core/models/cart-items.model';
import { tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'thng-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailComponent implements OnInit {
  itemDetails: ItemDetails;
  constructor(private route: ActivatedRoute, private facade: FeaturesFacadeService) {}

  ngOnInit(): void {
    this.itemDetails = this.route.snapshot.data['itemDetails'] as ItemDetails;
  }

  onAddToCart(): void {
    const cartItem: CartItem = {
      ...this.itemDetails,
      cartItemId: uuid()
    };
    this.facade.addToCart(cartItem);
  }
}
