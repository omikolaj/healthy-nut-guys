import { ViewProductDetails } from 'app/core/models/view-product-details.model';
import { ItemDetails } from './../../../../core/models/item-details.model';
import { FeaturesFacadeService } from '../../../features-facade.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { CartItem } from 'app/core/models/cart-item.model';

@Component({
  selector: 'thng-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  @Input() itemDetails: ViewProductDetails;
  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {}
}
