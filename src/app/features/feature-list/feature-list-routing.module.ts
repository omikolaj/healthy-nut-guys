import { ItemDetailResolverService } from './feature-list/feature-detail/item-detail-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureDetailComponent } from './feature-list/feature-detail/feature-detail.component';
import { FeatureListResolverService } from './feature-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: FeatureListComponent,
    resolve: [FeatureListResolverService],
    data: { title: 'thng.menu.shop' }
  },
  {
    path: ':id',
    resolve: { itemDetails: ItemDetailResolverService },
    component: FeatureDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureListRoutingModule {}
