import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { ProductListResolverService } from './product-list-resolver.service';
import { ProductDetailResolverService } from './products/product-detail/product-detail-resolver.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { ProductDetailCustomSackComponent } from './products/product-detail-custom-sack/product-detail-custom-sack.component';
import { ProductDetailContainerComponent } from './products/product-detail-container/product-detail-container.component';
import { runResolver } from './product-list.data';

const routes: Routes = [
  {
    path: '',
    // always run the resolver but we filter the execution inside ProductListResolverService
    runGuardsAndResolvers: 'always',
    resolve: [ProductListResolverService],
    children: [
      {
        path: '',
        component: ProductListComponent,
        data: { title: 'thng.menu.shop' }
      },
      {
        path: ':id',
        component: ProductDetailContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule {}
