import { NotificationService } from 'app/core/core.module';
import { ViewProductDetails } from 'app/core/models/view-product-details.model';
import { ProductComponentService } from './../../../../core/products/product-component.service';
import { MixCategory } from 'app/core/models/mix-category.model';
import { Category } from 'app/core/models/category.model';
import { ProductFacadeService } from './../../product-facade.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, tap, switchMap, flatMap, scan, withLatestFrom } from 'rxjs/operators';
import { CustomProduct } from 'app/core/models/custom-product.model';
import { Product } from 'app/core/models/product.model';
import { ViewCustomProductDetails } from 'app/core/models/view-custom-product-details.model';
import { ViewDetails } from 'app/core/models/view-product.model';
import { Ingredient } from 'app/core/models/ingredient.model';
import { ProductDetails } from 'app/core/models/product-details.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartItem } from 'app/core/models/cart-item.model';
import * as uuid from 'uuid';

@Component({
  selector: 'thng-product-detail-container',
  templateUrl: './product-detail-container.component.html',
  styleUrls: ['./product-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailContainerComponent implements OnInit {
  productDetails$: Observable<ViewProductDetails | ViewCustomProductDetails>;
  productForm: FormGroup;
  constructor(private route: ActivatedRoute, private facade: ProductFacadeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // get latest from regular products and custom prodcuts
    this.productDetails$ = combineLatest([this.facade.products$, this.facade.customProducts$]).pipe(
      map(([products, customProducts]: [Product[], CustomProduct[]]) => {
        // from both product types find the one that matches the id from params
        return [...products, ...customProducts].find(p => p['id'] === this.route.snapshot.params['id']);
      }),
      // filter any undefines
      filter(p => p !== undefined),
      // get the view for the given product type
      map(product => this.getViewDetail(product)),
      // materialize the type before passing it off to the template
      map(viewDetails => (viewDetails.isCustomProduct ? (viewDetails as ViewCustomProductDetails) : (viewDetails as ViewProductDetails)))
    );
    this.initForms();
  }

  onAddItemToCartClicked(cartItem: CartItem): void {
    if (this.facade.cartItems.some(c => c.productId === cartItem.productId) === false) {
      cartItem.id = uuid();
      cartItem.quantity = 1;
      this.facade.addCartItem(cartItem);
    } else {
      const existingCartItems = this.facade.cartItems.filter(c => c.productId === cartItem.productId);
      const existingCartItem = existingCartItems.find(c => c.selectOption.option === cartItem.selectOption.option);
      if (existingCartItem) {
        this.facade.incrementCartItemQuantity(existingCartItem);
      } else {
        cartItem.id = uuid();
        cartItem.quantity = 1;
        this.facade.addCartItem(cartItem);
      }
    }
  }

  private initForms(): void {
    this.initProductForm();
  }

  private initProductForm(): void {
    this.productForm = this.fb.group({
      selectedWeight: this.fb.control(''),
      selectOptionId: this.fb.control(''),
      productId: this.fb.control('')
    });
  }

  // Check if user clicked on custom product (custom sack etc.)
  private isCustomProduct(object: any): object is CustomProduct {
    return 'type' in object;
  }

  // Get the view details object. This is used to render the view for details. Switching between custom products and regular
  private getViewDetail(product: Product | CustomProduct): ViewProductDetails | ViewCustomProductDetails {
    const viewDetails = this.createProductDetailsView(product);
    let viewDetailsProduct;
    if (this.isCustomProduct(product)) {
      viewDetailsProduct = {
        ...viewDetails,
        mixCategories: product.mixCategories,
        isCustomProduct: true,
        selectOptions: product.selectOptions
      } as ViewCustomProductDetails;
    } else {
      viewDetailsProduct = {
        ...viewDetails,
        labelSrc: product.productDetails[0]?.labelSrc,
        productDetails: product.productDetails,
        isCustomProduct: false
      } as ViewProductDetails;
    }
    return viewDetailsProduct;
  }

  private createProductDetailsView(product: Product | CustomProduct): ViewDetails {
    let viewDetails = {
      isCustomProduct: true,
      id: product.id,
      description: product.description,
      isInStock: product.isInStock,
      isOnSale: product.isOnSale,
      subtitle: product.subtitle,
      imageSrc: product.imageSrc,
      name: product.name
    } as ViewDetails;
    if (product.isOnSale) {
      viewDetails.sales = product.sales;
    }
    return viewDetails;
  }
}
