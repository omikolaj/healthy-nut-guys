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

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductDetailCustomSackComponent,
    CustomSackSelectorComponent,
    CustomSackNutritionLabelComponent
  ],
  imports: [CommonModule, SharedModule, ProductListRoutingModule, NgxsModule.forFeature([ShopState])]
})
export class ProductListModule {}
