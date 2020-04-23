import { Injectable } from '@angular/core';
import { ProductsAsyncService } from 'app/core/products/products-async.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturesFacadeService {
  constructor(private productsService: ProductsAsyncService) {}
}
