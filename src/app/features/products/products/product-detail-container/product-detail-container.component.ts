import { MixCategory } from 'app/core/models/mix-category.model';
import { Category } from 'app/core/models/category.model';
import { ViewProductDetails } from './../../../../core/models/view-product-details.model';
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

@Component({
  selector: 'thng-product-detail-container',
  templateUrl: './product-detail-container.component.html',
  styleUrls: ['./product-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailContainerComponent implements OnInit {
  productDetails$: Observable<ViewProductDetails | ViewCustomProductDetails>;
  constructor(private route: ActivatedRoute, private facade: ProductFacadeService) {}

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
        isCustomProduct: true
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
    return {
      isCustomProduct: true,
      id: product.id,
      description: product.description,
      isInStock: product.isInStock,
      isOnSale: product.isOnSale,
      price: product.price,
      salePrice: product.salePrice,
      subtitle: product.subtitle,
      imageSrc: product.imageSrc,
      name: product.name
    } as ViewDetails;
  }
}
