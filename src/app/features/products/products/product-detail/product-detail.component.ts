import { ProductDetails } from 'app/core/models/product-details.model';
import { SelectOption } from 'app/core/models/select-option.model';
import { ProductComponentService } from './../../../../core/products/product-component.service';
import { ViewProductDetails } from 'app/core/models/view-product-details.model';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ViewSale } from 'app/core/models/view-sale.model';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CartItem } from 'app/core/models/cart-item.model';
@Component({
  selector: 'thng-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  @Input() itemDetails: ViewProductDetails;
  @Input() productForm: FormGroup;
  selectOption: SelectOption;
  itemSale: ViewSale;
  productDetails: ProductDetails;
  viewProductDetails: ProductDetails[] = [];
  @Output() addItemToCartClicked: EventEmitter<CartItem> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.productDetails = this.sortAndSetInitial();
    this.selectOption = this.productDetails?.selectOption;
    this.itemSale = this.createItemSale();
    this.setDefaultSelectOption();
  }

  private setDefaultSelectOption(): void {
    this.productForm.controls['selectedWeight'].patchValue(this.selectOption.option);
    this.productForm.controls['selectOptionId'].patchValue(this.selectOption.id);
    this.productForm.controls['productId'].patchValue(this.productDetails.id);
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
        selectOption: this.itemDetails.productDetails.find(p => p.selectOption.option === option).selectOption,
        id: this.itemDetails.productDetails.find(p => p.selectOption.option.toLocaleLowerCase() === option).id,
        productId: this.itemDetails.productDetails.find(p => p.selectOption.option.toLocaleLowerCase() === option).productId
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

  onWeightSelectionChange(event: MatSelectChange): void {
    this.productDetails = this.itemDetails.productDetails.find(p => p.selectOption.option === event.value);
    this.selectOption = this.productDetails?.selectOption;
    this.productForm.controls['selectOptionId'].patchValue(this.selectOption.id);
    let viewItemSale = {
      ...this.itemSale,
      price: this.productDetails.price
    } as ViewSale;
    if (this.itemSale.isOnSale) {
      viewItemSale.sales = [...this.itemSale.sales];
    }
    this.itemSale = viewItemSale;
  }

  onUpdateSelectOption(): void {}

  onAddToCart(): void {
    const cartItem: CartItem = {
      productId: this.productForm.value['productId'],
      imageSrc: this.itemDetails.imageSrc,
      title: this.itemDetails.name,
      selectOption: this.productDetails.selectOption,
      itemPrice: this.productDetails.price,
      isCustomProduct: false
    };

    this.addItemToCartClicked.emit(cartItem);
  }
}
