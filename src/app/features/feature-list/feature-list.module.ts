import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { FeatureDetailComponent } from './feature-list/feature-detail/feature-detail.component';

@NgModule({
  declarations: [FeatureListComponent, FeatureDetailComponent],
  imports: [CommonModule, SharedModule, FeatureListRoutingModule]
})
export class FeatureListModule {}
