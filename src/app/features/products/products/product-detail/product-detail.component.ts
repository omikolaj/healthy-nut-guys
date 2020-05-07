import { ViewProductDetails } from 'app/core/models/view-product-details.model';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
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
