import { select } from '@ngrx/store';
import { SelectOption } from 'app/core/models/select-option.model';
import { MixCategoryType } from './../../../../core/models/mix-category-type.enum';
import { MixCategory } from 'app/core/models/mix-category.model';
import { shopItems, itemDetails } from './../../product-list.data';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';
import { ActivatedRoute } from '@angular/router';
import { FeaturesFacadeService } from 'app/features/features-facade.service';
import * as uuid from 'uuid';
import { ViewCustomProductDetails } from 'app/core/models/view-custom-product-details.model';
import { MixIngredientNode } from 'app/core/models/ingredient.model';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CustomSelectOption } from 'app/core/models/custom-select-option.model';
import { ViewSale } from 'app/core/models/view-sale.model';
import { CartItem } from 'app/core/models/cart-item.model';

@Component({
  selector: 'thng-product-detail-custom-sack',
  templateUrl: './product-detail-custom-sack.component.html',
  styleUrls: ['./product-detail-custom-sack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailCustomSackComponent implements OnInit {
  @Input() itemDetails: ViewCustomProductDetails;
  mixIngredients: MixIngredientNode[] = [];
  @Output() addItemToCartClicked: EventEmitter<CartItem> = new EventEmitter();
  customSackForm: FormGroup;
  selectOption: CustomSelectOption;
  itemSale: ViewSale;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectOption = this.itemDetails.selectOptions[0];
    this.mixIngredients = this.createMixIngredientNodes();
    this.itemSale = this.createItemSale();
    this.initCustomSackForm();
  }

  onAddToCart(): void {
    // do not add to cart if there is nothing inside the mix on hand
    if (this.customSackForm.controls['mixOnHand'].value < 1) {
      return;
    }
    const cartItem: CartItem = {
      productId: this.itemDetails.id,
      imageSrc: this.itemDetails.imageSrc,
      title: this.itemDetails.name,
      selectOption: this.selectOption,
      itemPrice: this.selectOption.price,
      isCustomProduct: true
    };
    this.addItemToCartClicked.emit(cartItem);
  }

  onUpdateSelectOption(selectOption: CustomSelectOption): void {
    this.selectOption = selectOption;
    this.itemSale = this.createItemSale();
  }

  private createItemSale(): ViewSale {
    return {
      isOnSale: this.itemDetails.isOnSale,
      price: this.selectOption.price,
      sales: this.itemDetails.sales
    } as ViewSale;
  }

  private initCustomSackForm(): void {
    this.customSackForm = this.fb.group({
      mixOnHand: this.fb.control(0),
      totalWeight: this.fb.control(this.selectOption?.option),
      ingredients: this.fb.array(this.initIngredients())
    });
  }

  private initIngredients(): FormGroup[] {
    let ingredients: FormGroup[] = [];
    this.itemDetails.mixCategories.map(c => {
      ingredients = [
        ...ingredients,
        ...c.ingredients.map(i => {
          return this.fb.group({
            id: this.fb.control(i.id),
            name: this.fb.control(i.name),
            quantity: this.fb.control(0)
          });
        })
      ];
    });

    return ingredients;
  }

  private createMixIngredientNodes(): MixIngredientNode[] {
    return this.itemDetails.mixCategories
      .map(mix => {
        return {
          id: mix.id,
          name: mix.name,
          inStock: mix.inStock,
          order: mix.order,
          children: mix.ingredients.map(i => {
            return {
              id: i.id,
              name: i.name,
              inStock: i.inStock
            };
          })
        } as MixIngredientNode;
      })
      .sort((a, b) => (a.order < b.order ? -1 : 0));
  }
}
