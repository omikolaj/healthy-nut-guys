import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShopItem } from '../models/shop-item.model';
import { ItemDetails } from '../models/item-details.model';
import { delay } from 'rxjs/operators';
import { itemDetails, shopItems } from 'app/features/products/product-list.data';
import { Product } from '../models/product.model';
import { CustomProduct } from '../models/custom-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsAsyncService {
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('shop/products', this.headers);
  }

  fetchCustomProducts(): Observable<CustomProduct[]> {
    return this.http.get<CustomProduct[]>('shop/custom-products', this.headers);
  }

  fetchItemDetails(id: string): Observable<ItemDetails> {
    // this.http.get<ItemDetails>(`products/${id}`, this.headers);
    return of(itemDetails.find(f => f.id === id)).pipe(delay(500));
  }
}
