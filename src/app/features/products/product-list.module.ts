import { ProductState } from './../../shared/store/state/products.state';
import { ShopState } from './../../shared/store/state/shop.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { ProductListComponent } from './products/product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailCustomSackComponent } from './products/product-detail-custom-sack/product-detail-custom-sack.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomSackSelectorComponent } from './products/custom-sack-selector/custom-sack-selector.component';
import { CustomSackNutritionLabelComponent } from './products/custom-sack-nutrition-label/custom-sack-nutrition-label.component';
import { ProductDetailContainerComponent } from './products/product-detail-container/product-detail-container.component';
import { ViewPriceComponent } from './products/view-price/view-price.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductDetailCustomSackComponent,
    CustomSackSelectorComponent,
    CustomSackNutritionLabelComponent,
    ProductDetailContainerComponent,
    ViewPriceComponent
  ],
  imports: [CommonModule, SharedModule, ProductListRoutingModule, NgxsModule.forFeature([ProductState])]
})
export class ProductListModule {}
