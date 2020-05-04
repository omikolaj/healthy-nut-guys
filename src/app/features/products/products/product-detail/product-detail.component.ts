import { ItemDetails } from './../../../../core/models/item-details.model';
import { FeaturesFacadeService } from '../../../features-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { CartItem } from 'app/core/models/cart-item.model';

@Component({
  selector: 'thng-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  itemDetails: ItemDetails;
  constructor(private route: ActivatedRoute, private facade: FeaturesFacadeService) {}

  ngOnInit(): void {
    this.itemDetails = this.route.snapshot.data['itemDetails'] as ItemDetails;
  }

  onAddToCart(): void {}
}
