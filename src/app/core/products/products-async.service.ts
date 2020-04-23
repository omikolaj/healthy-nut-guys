import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopItem } from '../models/shop-item.model';
import { ItemDetails } from '../models/item-details.model';

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
    return this.http.get<ShopItem[]>('products', this.headers);
  }

  fetchItemDetails(id: string): Observable<ItemDetails> {
    return this.http.get<ItemDetails>(`products/${id}`, this.headers);
  }
}
