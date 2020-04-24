import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { FeatureDetailComponent } from './feature-list/feature-detail/feature-detail.component';
import { NgxsModule } from '@ngxs/store';
import { CartItemsState } from 'app/shared/store/state/cart-items.state';
import { ShopItemsState } from 'app/shared/store/state/shop-items.state';

@NgModule({
  declarations: [FeatureListComponent, FeatureDetailComponent],
  imports: [CommonModule, SharedModule, FeatureListRoutingModule, NgxsModule.forFeature([ShopItemsState, CartItemsState])]
})
export class FeatureListModule {}
