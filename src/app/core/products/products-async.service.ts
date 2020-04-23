import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShopItem } from '../models/shop-item.model';
import { ItemDetails } from '../models/item-details.model';
import { delay } from 'rxjs/operators';
import {
  features,
  itemDetails
} from 'app/features/feature-list/feature-list.data';

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

  fetchShopItems(): Observable<ShopItem[]> {
    // this.http.get<ShopItem[]>('products', this.headers)
    return of(features).pipe(delay(500));
  }

  fetchItemDetails(id: string): Observable<ItemDetails> {
    // this.http.get<ItemDetails>(`products/${id}`, this.headers);
    return of(itemDetails.find(f => f.id === id)).pipe(delay(500));
  }
}
