import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CartItemsState } from 'app/shared/store/state/cart-items.state';
import { ShopItemsState } from 'app/shared/store/state/shop-items.state';
import { ProductListComponent } from './products/product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailCustomSackComponent } from './products/product-detail-custom-sack/product-detail-custom-sack.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomSackSelectorComponent } from './products/custom-sack-selector/custom-sack-selector.component';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductDetailCustomSackComponent, CustomSackSelectorComponent],
  imports: [CommonModule, SharedModule, ProductListRoutingModule, NgxsModule.forFeature([ShopItemsState, CartItemsState])]
})
export class ProductListModule {}
