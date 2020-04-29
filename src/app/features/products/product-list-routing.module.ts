import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { ProductListResolverService } from './product-list-resolver.service';
import { ProductDetailResolverService } from './products/product-detail/product-detail-resolver.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { ProductDetailCustomSackComponent } from './products/product-detail-custom-sack/product-detail-custom-sack.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: [ProductListResolverService],
    data: { title: 'thng.menu.shop' }
  },
  {
    path: 'custom-sack',
    component: ProductDetailCustomSackComponent
  },
  {
    path: ':id',
    resolve: { itemDetails: ProductDetailResolverService },
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule {}
