import { ProductDetails } from 'app/core/models/product-details.model';
import { SelectOption } from 'app/core/models/select-option.model';
import { ProductComponentService } from './../../../../core/products/product-component.service';
import { ViewProductDetails } from 'app/core/models/view-product-details.model';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ViewSale } from 'app/core/models/view-sale.model';
@Component({
  selector: 'thng-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  @Input() itemDetails: ViewProductDetails;
  selectOption: SelectOption;
  itemSale: ViewSale;
  productDetails: ProductDetails;
  viewProductDetails: ProductDetails[] = [];
  constructor() {}

  ngOnInit(): void {
    this.productDetails = this.sortAndSetInitial();
    this.selectOption = this.productDetails?.selectOption;
    this.itemSale = this.createItemSale();
  }

  private sortAndSetInitial(): ProductDetails {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const sortedOptions = this.itemDetails.productDetails
      .slice()
      .map(s => s?.selectOption?.option)
      .sort(collator.compare);

    this.viewProductDetails = sortedOptions.map(option => {
      return {
        price: this.itemDetails.productDetails.find(p => p.selectOption.option.toLocaleLowerCase() === option)?.price,
        selectOption: option
      } as ProductDetails;
    });
    return this.viewProductDetails[0];
  }

  private createItemSale(): ViewSale {
    let viewSale = {
      isOnSale: this.itemDetails?.isOnSale,
      price: this.productDetails?.price
    } as ViewSale;
    if (this.itemDetails?.isOnSale) {
      viewSale.sales = this.itemDetails.sales;
    }
    return viewSale;
  }

  onUpdateSelectOption(): void {}

  onAddToCart(): void {}
}
