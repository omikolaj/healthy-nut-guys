import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureDetailComponent } from './feature-list/feature-detail/feature-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureListComponent,
    data: { title: 'thng.menu.shop' }
  },
  {
    path: ':id',
    component: FeatureDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureListRoutingModule {}
